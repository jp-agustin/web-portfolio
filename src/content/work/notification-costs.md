---
title: Cutting notification costs across Southeast Asia
outcome: 60%+ lower notification costs, with better reliability
company: Ninja Van
year: 2023–2025
role: Engineering Manager / Tech Lead
team: My team of 5–7 engineers, with product, business, and external partners
stack: [Go, Kafka]
duration: Ongoing, across my time leading the team
featured: true
order: 1
---

## Context

Ninja Van is a logistics company operating across Southeast Asia. My team, Platforms and Shared Services, owned the chat and notification systems that other teams used to reach shippers, consignees, and drivers. These systems processed hundreds of millions of events a day across SMS, social messaging apps (Messenger, Telegram, Viber, LINE, WhatsApp), voice, email, and push.

## Problem

Notification costs were high, and the causes were both technical and business-related.

On the technical side, some existing logic wasn't ideal. Retries ran on flows that didn't need them, and there were few guardrails to stop unnecessary sends. Routing didn't always prefer the cheaper channel. A message could go out by SMS even when the user was subscribed on a messaging app.

On the product side, there were redundant messages, and no shared standard for things like SMS content length, which directly affects cost.

On the provider side, prices varied a lot by country, especially for SMS. Switching providers wasn't easy.

## Approach

There was no single fix. Over my time leading the team, we worked several levers in parallel:

- **Smarter routing and fallbacks.** Send through social messaging apps first when the user is subscribed, and fall back to SMS only when needed.
- **Guardrails and retry clean-up.** Remove retries from flows that didn't need them, and add checks against unnecessary sends.
- **Easy provider switching.** Logic to move traffic between providers per country based on cost and reliability, mainly for SMS.
- **Content and usage standards.** Shared rules with product teams on SMS length, which events deserve a message, and removing redundant ones.

## My role

I initiated the work and drove the decisions. On the business side, I started the discussions with our CTO, product and business teams, and external partners, to agree on standards and provider changes. On the technical side, I initiated the refactors and new features that made the optimizations possible, and my team built them.

## Outcome

- Notification costs down by more than 60%
- Better reliability, because routing could favor providers that delivered well
- Better customer experience: messages became more consistent and concise, with fewer redundant ones

## What I'd do differently

Build a proper dashboard earlier. We needed one place where both technical and non-technical teams could track cost, delivery, and usage data. Without it, a lot of time went into pulling numbers together for each discussion.
