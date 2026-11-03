---
title: Moving a drone inspection AI from the cloud to on-prem GPUs
outcome: In production for real inspections, with more defects caught and no recurring cloud inference costs
figure: "48 MP"
figureLabel: drone frames, detected at full resolution
company: A drone inspection company I'd worked for before (freelance)
year: 2025
role: Software Engineer & Tech Consultant (freelance)
team: Solo on the AI platform; coordinated with the client's app team for integration
stack: [Python, CUDA, YOLO, SAHI, Docker]
duration: Aug – Dec 2025, part-time
featured: true
order: 3
---

## Context

The client is a drone inspection company I'd worked for before. It runs inspections across industries like construction and maritime, and its platform detects different things in drone imagery depending on the industry and the inspection.

I built the original detection pipeline while working there, on Azure Custom Vision. Years later they brought me back as a freelancer to move it on-premise.

## Problem

When I first built it, ready-made AI models weren't easy to come by, so a managed service like Azure Custom Vision made sense. It came with limits that grew over time:

- **Accuracy.** Images had to be downscaled to meet Azure Custom Vision's requirements. Drone photos are high resolution, and downscaling threw away the small details inspections depend on.
- **Control and cost.** Each industry and inspection type needs its own classes, so models had to be retrained often. Azure Custom Vision could only run one training at a time, gave no control over the model architecture, and limited how much could run in parallel. It was also costly.

## Why on-premise

The client already had hardware powerful enough for AI workloads. Moving on-premise made more sense than working around Azure's limits: the hardware was already paid for, it removed recurring inference costs, and it gave full control over models, image resolution, and how often to retrain. It also kept client data on-premise, which helped with security compliance.

I chose YOLO because it was readily available, well supported, and straightforward to fine-tune for each inspection type.

## What I built

I worked alone on the AI platform:

- **On-premise training and inference platform**, replacing Azure Custom Vision.
- **Tiled image processing pipeline.** To use the full resolution of drone images, both training and inference run on the full image *and* on split tiles, then merge the results.
- **Bulk inference.** Images are processed in parallel, and results go back to the main app by callback after every set number of images, instead of one image at a time.
- **A new model structure.** Instead of one model per classification, each team in the client's app gets its own model per classification, with shared base models for common defects.
- **Handover documentation**, plus coordination with the client's app team, who integrated the main app with the new platform. I gave them guidance and suggestions throughout.

## Hard parts

**Small and large objects in the same images.** Tiling helps with small defects but can cut large objects apart. For training, I added logic to decide when to split and how large the tiles should be, based on the training data. For inference, every image runs both whole and tiled, so neither large nor small objects get missed. I wrote up the details in [Finding tiny defects in 48-megapixel drone images](/writing/tiled-yolo-high-res).

**Using the GPU well.** I built a small benchmark harness: each run defined in YAML, with a monitor sampling GPU, memory, and CPU usage. It showed that FP16 trained about 25% faster with no loss in accuracy. A medium model did as well as a large one on this data, so production runs on the medium model: accurate enough, and faster.

## Outcome

- In production, and used in real inspections
- Faster training, and bulk inference in parallel
- More defects caught, even with smaller training datasets, based on side-by-side runs against the Azure models
- No more recurring cloud inference costs
- Client data stays on-premise, supporting security compliance

## What I'd do differently

Add production monitoring from the start. With more time, I would have built in visibility into model performance, GPU usage, and pipeline health, so the client's team could spot problems without digging in.
