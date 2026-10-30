---
title: Tripling notification throughput at peak, without a rewrite
outcome: 3x Kafka throughput at peak, 50% less log noise
company: Ninja Van
year: 2023–2025
role: Engineering Manager / Tech Lead
team: 7 engineers
stack: [Go, Kafka, Kubernetes, KEDA]
duration: Started during a peak period, when monitoring showed the bottleneck
featured: true
order: 3
---

## Context

My team owned Ninja Van's notification platform, which processes hundreds of millions of events a day across Southeast Asia.

It has two layers:

- **A central notifications service** takes requests from other services across the company. It decides routing: which channel and template to use based on the event, and who the recipients are.
- **A microservice per channel** (SMS, chat/social messaging apps, email, and others) handles templating, channel-specific logic, and the providers behind it.

## Problem

Ninja Van handles millions of orders a day, and each order generates notifications for customers, shippers, drivers, and internal teams like finance. During peak periods, that volume created bottlenecks in the pipeline. When it backed up, it took time to recover, and messages were delayed, including time-sensitive ones like OTPs.

We spotted it through our monitoring during a peak.

## Options considered

1. **Full rewrite.**
2. **Targeted changes to the existing system.**

## Decision

Targeted changes. The service was critical and it worked. A rewrite would have put a core system at risk to fix problems that were concentrated in a few places. Keeping the changes inside our own services also meant no other team had to change anything.

## What we changed

- **Kafka consumer tuning:** partitioning, batching, and consumer concurrency
- **Removing blocking calls** from the hot path
- **Refactoring specific blocks** that were slowing the pipeline down
- **Better horizontal scaling** with KEDA, so consumers scale with event load instead of fixed capacity
- **Standardized logging** across our services, cutting log noise in half so real issues stood out

I initiated the work and led the design and reviews. The team of seven implemented it.

## Outcome

- 3x Kafka event processing throughput during peak volumes
- 50% less log noise
- Cleaner, more maintainable code in the parts we touched

## What's next / what I'd do differently

We planned further changes after this: fewer internal topics, and removing duplicated logic and retries. Looking back, I'd push to fold some of that cleanup into the first pass, while the team already had the context.
