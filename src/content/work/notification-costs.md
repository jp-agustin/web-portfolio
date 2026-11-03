---
title: Cutting notification costs across Southeast Asia
outcome: More reliable delivery, and fewer, clearer messages for customers
figure: "60%+"
figureLabel: lower notification costs
company: Ninja Van
year: 2023–2025
role: Engineering Manager / Tech Lead
team: My team of 5–7 engineers, with product, business, and external partners
stack: [Go, Java, Kafka]
duration: Ongoing, across my time leading the team
featured: true
order: 1
---

## Context

Ninja Van is a logistics company operating across Southeast Asia. My team, Platforms and Shared Services, owned the chat and notification systems that other teams used to reach shippers, consignees, and drivers. These systems processed hundreds of millions of events a day across SMS, social messaging apps (Messenger, Telegram, Viber, LINE, WhatsApp), voice, email, and push. Most of the services were in Go; the older SMS and email workers were in Java.

## Problem

Notification costs were high, and the causes were both technical and business-related.

On the technical side, some existing logic wasn't ideal. Retries ran on flows that didn't need them, and there were few guardrails to stop unnecessary sends. Routing didn't always prefer the cheaper channel. A message could go out by SMS even when the user was subscribed on a messaging app.

On the product side, there were redundant messages, and no shared standard for things like SMS content length, which directly affects cost.

On the provider side, prices varied a lot by country, especially for SMS, and kept changing. Most countries had their own providers, and each one was wired into the code separately, so a switch meant a code change and a deploy.

## Approach

There was no single fix. Over my time leading the team, we worked four levers. The first two did most of the saving.

- **Smarter routing and fallbacks.** For non-critical flows, the default became the messaging app the user was subscribed to, with SMS only as the fallback for users who weren't. SMS was by far the most expensive channel, so this was the biggest saving, and it made the experience more consistent too.
- **Easy provider switching.** We reviewed providers regularly, and prices kept moving. I made routing a data update instead of a code change: which provider each country uses, and even what percentage of traffic goes to each. When a review found a cheaper option, we could move to it quickly instead of treating it as a project.
- **Conditional retries and guardrails.** Retries used to run broadly, and the extra sends added up to real cost. Retries became conditional: only flows identified as critical retry. We also added checks against unnecessary sends.
- **Content and usage standards.** Shared rules with product teams on SMS length, which events deserve a message, and removing redundant ones.

## Decisions and trade-offs

**Not everything moved off SMS.** For OTPs, users choose: a flow asks whether they want them by SMS or a messaging app. We kept that choice instead of pushing everyone to the cheaper channel, because over the years we saw people miss OTPs sent to an app they'd forgotten they were subscribed to. SMS means people always know where to look, and that's worth the cost for messages they can't afford to miss.

**Regional deals over local preferences.** Most countries used their own providers, but some providers covered several countries. Sometimes a country team preferred its local provider, while a multi-country one came out cheaper overall: bundled with other services and priced on our combined volume across countries. We talked it through with each team, with the numbers, and made the switch.

**Reliability was tested before price.** Before adding a provider as an option, we tested it to measure its real delivery rate. Only providers that held up became an option, so switching for price didn't mean giving up delivery.

**The Java workers stayed.** The older SMS and email workers were in Java, while the rest were in Go. They worked, and migrating them wasn't worth it next to the cost work, so we built around them instead of rewriting them.

## My role

I initiated most of the levers and drove the decisions. On the business side, I started the discussions with our CTO, product and business teams, and external partners to agree on standards and provider changes. I also stayed hands-on: I built the provider switching, the provider integrations, and the guardrails for SMS retries, and the team built the rest.

## Outcome

- Notification costs down by more than 60%, tracked through provider invoices, cost per country broken down by channel, and our audit logs
- Better reliability, because routing could favor providers that delivered well
- More consistent, concise messages, with fewer redundant ones

## What I'd do differently

Build a business-facing dashboard earlier. We had a dashboard in Mattermost and audit logs in the database, which worked for engineers. Product and business teams needed a view they could read on their own. Until then, we interpreted the numbers for them in each discussion, which slowed decisions down.
