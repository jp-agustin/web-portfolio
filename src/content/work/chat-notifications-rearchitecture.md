---
title: Tripling notification throughput at peak, without a rewrite
outcome: No more peak backlogs, even as volumes kept growing for years after
figure: "3×"
figureLabel: Kafka throughput at peak
company: Ninja Van
year: 2023
role: Engineering Manager / Tech Lead
team: My chat and notifications team of 7 engineers
stack: [Go, Kafka, Kubernetes, KEDA]
featured: true
order: 4
---

## Context

My team owned Ninja Van's notification platform, which processes hundreds of millions of events a day across Southeast Asia.

It has two layers:

- **A central notifications service** takes requests from other services across the company. It decides routing: which channel and template to use based on the event, and who the recipients are.
- **A microservice per channel** (SMS, chat/social messaging apps, email, and others) handles templating, channel-specific logic, and the providers behind it.

## Problem

Ninja Van handles millions of orders a day, and each order generates notifications for customers, shippers, drivers, and internal teams like finance. During peak periods, that volume created bottlenecks in the pipeline. When it backed up, it took time to recover, and messages were delayed, including time-sensitive ones like OTPs.

During a peak in 2023, an alert from our monitoring flagged it: consumer lag on every topic we consumed, worst on order creation.

## Why not a rewrite

The service was critical and it worked. A rewrite would have put a core system at risk to fix problems that were concentrated in a few places. Keeping the changes inside our own services also meant no other team had to change anything.

## What we changed

Kafka consumer tuning did most of the work.

- **Kafka consumer tuning.** Partitioning, batching, and consumer concurrency. To get there, we first refactored the code onto a Kafka package that gave more granular control over the configs.
- **Cleaning up the hot path.** We removed blocking calls and duplicated calls that had built up over years of work by different teams, and refactored the blocks that were slowing the pipeline down.
- **Better horizontal scaling** with KEDA, so consumers scale with event load instead of fixed capacity.

## My role

I initiated the work and led the design and reviews. I left the implementation to the team on purpose, because it was a good chance for them to grow. One of them implemented the Kafka changes and presented them to the whole tech team ([more on mentoring](/work/founding-engineer-to-em)).

## Outcome

- 3× Kafka event processing throughput during peak volumes
- No more backlogs or delayed messages at peak
- It held: volumes kept growing for years after, and the pipeline handled them without problems

## What I'd do differently

We did more cleanup after this: fewer internal topics, and removing duplicated logic and retries. Looking back, I'd fold some of that into the first pass, while the team already had the context.
