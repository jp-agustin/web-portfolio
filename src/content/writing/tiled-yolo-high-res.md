---
title: Finding tiny defects in 48-megapixel drone images with YOLO and SAHI
summary: Downscaling hides small defects, and tiling cuts big ones in half. Running both, with a few slicing rules, catches each.
pillar: Engineering
type: article
date: 2026-10-30
---

On this project, drone inspection photos ran from about 20 to 48 megapixels, up to 8064 × 6048 pixels. The defects that matter, like a hairline crack or an early patch of corrosion, can be a few dozen pixels across.

Object detection models don't see 48 megapixels. YOLO trains and runs at something like 640 or 1024 pixels on the long side. Feed it a full 48 MP photo and it gets downscaled 8 to 13 times, and a 40-pixel crack becomes 3 to 5 pixels. That's barely there.

This post covers how I dealt with that while moving a drone inspection platform from a cloud vision service to on-prem GPUs ([case study](/work/on-prem-vision-ai)). The stack was Ultralytics YOLO for detection and <a href="https://github.com/obss/sahi" target="_blank" rel="noopener noreferrer">SAHI</a> (Slicing Aided Hyper Inference) for tiling.

## Tiling fixes small objects and breaks big ones

The obvious fix is to cut the image into tiles, run the model on each one, and map the detections back. At 1024 × 1024 tiles, that 40-pixel crack stays 40 pixels. SAHI handles the slicing, overlap, and coordinate mapping.

Tiling creates the opposite problem, though. A large object, like a whole damaged roof section, gets split across several tiles. Each tile sees only a fragment, and you get partial boxes or nothing at all.

So the approach is **to do both**: tiles for small objects, the full image for large ones, then merge. The same idea applies in training and in inference.

## Training: deciding when to slice

You can't just slice every training image. If a labeled object is bigger than a tile, slicing it teaches the model to recognize fragments. And a dataset of only tiles loses the context that full images give.

I pre-sliced training data with one rule: compare the largest object in each image, by its longer side, to the tile size.

| Largest object vs tile size | What goes into the dataset |
|---|---|
| Under 40% | Tiles only |
| 40% to 75% | Both tiles and the full image |
| 75% or more | Full image only |

That usually gave a dataset of roughly 30–50% full images and 50–70% tiles. Fine-tuning runs leaned toward more full images, to avoid overfitting on small project datasets.

A few other details mattered:

- **Cap empty tiles.** Most tiles from a big inspection photo contain nothing. I kept every labeled tile and randomly sampled empty ones up to a 1:1 ratio, so the model still learns what background looks like without drowning in it.
- **Use the same tile geometry for training and inference.** I kept one shared default (1024 px tiles, 0.2 overlap) so the model always sees objects at the scale it was trained on. For jobs with mostly tiny defects, 512 px tiles work better.
- **Use more overlap for very small objects** (0.2 up to 0.4), so a defect sitting on a tile boundary fully appears in at least one tile.

## Inference: run both, then merge

At inference time, the rule is simpler:

1. **Slice** if the image is larger than the training resolution, or if small objects are expected.
2. **Always run the full image too**, so large objects aren't missed.
3. **Merge**: combine both sets of detections and run non-maximum suppression (NMS) per class, so the same object found by a tile and by the full image is kept once.

Here's a simplified version of the flow using SAHI's public API:

```python
from sahi import AutoDetectionModel
from sahi.predict import get_prediction, get_sliced_prediction

TILE = 1024
OVERLAP = 0.2

model = AutoDetectionModel.from_pretrained(
    model_type="ultralytics",
    model_path="yolo-medium-finetuned.pt",
    confidence_threshold=0.05,  # fine-tuned models often score low; filter later
    device="cuda:0",
)

def detect(image_path, width, height, small_objects=False):
    preds = []
    if small_objects or width > TILE or height > TILE:
        sliced = get_sliced_prediction(
            image_path, model,
            slice_height=TILE, slice_width=TILE,
            overlap_height_ratio=OVERLAP, overlap_width_ratio=OVERLAP,
        )
        preds += sliced.object_prediction_list
    # Full image always runs, so large objects aren't split across tiles
    preds += get_prediction(image_path, model).object_prediction_list
    return nms_per_class(preds, iou=0.5)
```

`nms_per_class` is a standard greedy NMS: group by class, sort by score, and drop any box that overlaps a higher-scoring one by more than the IoU threshold.

One lesson from production: **the confidence threshold needs care.** Typical default thresholds drop low-scoring detections, but fine-tuned models on small datasets often score real defects at 0.1 to 0.3. A low threshold in the detector, with filtering done after merging, kept those detections instead of losing them silently.

## Tuning for the GPU

The hardware was an ASUS Ascent GX10, built on NVIDIA's GB10 Grace Blackwell Superchip. Before settling on settings, I built a small benchmark harness. Each run is defined in YAML (model size, image size, batch, FP16, workers, learning rate), and a monitor samples GPU utilization, GPU memory, CPU, and RAM every half second, writing the results to CSV. That made it cheap to compare a dozen configurations on the real hardware.

Some results from short two-epoch runs with YOLO on the tiled dataset:

| Comparison | Training time | mAP50 after 2 epochs |
|---|---|---|
| FP16 vs FP32 (1024 px) | ~25% faster with FP16 | about the same (0.74 vs 0.70) |
| 640 px vs 1024 px input | ~2.3x faster at 640 | 640 was higher here (0.81 vs 0.74) |
| YOLO medium vs large | medium ~21% faster | medium was higher (0.74 vs 0.69) |
| 4 vs 12 dataloader workers | no difference | n/a (speed test) |

What I took from it:

- **FP16 is a free speed-up.** It was faster with no loss in accuracy.
- **Bigger isn't automatically better.** The medium model trained faster and scored as well or better than the large one on this data. On tiles, objects are already large relative to the input, so a smaller input size held up well in these short runs. Production still trains at 1024, matching the tile size so tiles are never downscaled.
- **Measure before tuning.** More dataloader workers did nothing, which showed the bottleneck was the GPU, not data loading.
- **Short runs are for comparing, not final numbers.** Two epochs is enough to rank settings, not to judge a model. With more epochs, the same setup kept climbing (mAP50 0.87 after 5).

## In production

This now runs in production on real inspections. In side-by-side runs against the previous cloud models, it caught more defects. Production uses the medium model at 1024 px: accurate enough, and faster.

## Takeaways

- **Decide slicing from the data, not globally.** Object size relative to tile size is the deciding factor.
- **Run the full image as well as tiles.** It's cheap insurance for large objects.
- **Keep training and inference tile geometry the same.**
- **Watch the confidence threshold** with fine-tuned models.
- **Build the benchmark harness first.** Comparing settings on the real hardware beats guessing.
