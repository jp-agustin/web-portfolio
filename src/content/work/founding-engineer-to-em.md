---
title: From founding engineer to Engineering Manager
outcome: 3 engineers mentored to senior, and a company-wide frontend standards initiative
figure: "1,000+"
figureLabel: warehouses using tools we built
company: Ninja Van
year: 2020–2025
role: Software Engineer → Senior Software Engineer → Engineering Manager / Tech Lead
team: Grew from one of two engineers on a new team to leading 5–7 engineers across Singapore and India
stack: [React, Node.js, Go, Flutter, Electron]
featured: true
order: 2
---

## Starting out: two engineers and no process (2020–2021)

I joined Ninja Van in December 2020 as one of two full-time engineers on a new internal tools team. There was no real process yet. The CTO decided what we should build, and we built it.

After observing for a week or two, I proposed some changes so we could align better: early sprints and prioritization practices that gave the team clearer focus and steadier delivery.

From there we built platforms used by regional offices and 1,000+ warehouses across Southeast Asia, including KPI management and claims systems, owning each one end to end from UX design to full-stack implementation and stakeholder alignment.

## Senior engineer: taking on what others wouldn't (2021–2022)

As a senior engineer, I took over systems beyond our team's own:

- **Printer management.** I took over the system that runs the printers in every warehouse. It was a legacy Electron app, separate from everything else, and it meant learning printer command languages. Almost nobody wanted to touch it. I worked with the IT and operations teams on its upgrades, and kept leading it solo for years, including as EM.
- **The sockets service.** It was a legacy service owned by the infra team and used across our services, and reliability had become an issue. I took it over and led its upgrade and rewrite: a cleaner code structure, updated libraries, better auth handling, and Kafka support. Messages went out reliably again, with fewer incidents.

Along the way, I led and mentored 3–5 engineers and interns through reviews and coaching.

**Reviving tech sharing.** When I joined, a few frontend engineers shared what they'd learned from time to time, but only when someone thought of it, and eventually it stopped. I liked the idea, so I took it over and opened it up to the whole tech team. It started with frontend talks and grew to cover every domain, even IT.

It turned out plenty of people wanted to share. They just needed a platform and someone to organize it and help shape their topics. It became a quarterly staple for as long as I was there, with 50+ talks from contributors in five countries: the IT team on infosec, product designers on their design workflows, and even our CTO on his drone-building hobby.

## Engineering Manager (2023–2025)

As the team grew, I was already leading, mentoring, and coaching much of it. In 2023, my senior EM promoted me to Engineering Manager and handed over his other team: chat and notifications. The job added the parts of management that don't show up in code: hiring (technical and behavioural interviews), 1:1s, coaching, and performance reviews.

I led 5–7 engineers across Singapore and India in a hybrid-remote setup, owning the chat and notification systems (see the [cost](/work/notification-costs) and [throughput](/work/chat-notifications-rearchitecture) case studies).

**Mentoring.** Three engineers I mentored grew from junior to senior roles. What worked was consistent coaching: understanding each person's strengths and weaknesses and finding where they could make the biggest impact, then giving them room to lead. One implemented our Kafka changes and presented them to the whole tech team. One switched to frontend from scratch. One, still a junior at the time, led part of the Frontend Standardization initiative: the bootstrap and templates.

**Staying hands-on.** I still wrote code every sprint. I took the work that was important but wouldn't add much to the team's learning, like integrating new providers, so the team could spend their time on what helped them grow.

## Frontend Standardization (2022–2025)

Our tech team had an engineering excellence program, but it focused almost entirely on backend services. Frontend never had the same attention, and as more teams collaborated across each other's frontends, the gaps showed.

I started and led a company-wide initiative to standardize how we work on the frontend, so teams could work across each other's projects more easily. Senior frontend engineers from across the tech team volunteered to lead most of the parts:

- **Monitoring**, so frontend issues were visible the way backend ones already were
- **A shared design system**
- **Standards and guidelines** for security, coding, and more
- **Bootstrap and templates**, so new frontend projects started from the same base. A junior engineer on my team led this one.

The senior engineers weren't on my team, and they led this alongside their own teams' priorities, so time and capacity were always the constraint.

It stuck. Teams adopted the base standards, and new projects started from the bootstrap. The design system grew into its own team, with a dedicated product designer and engineers, and our products started using it, especially the client-facing ones.

## What I learned

- **Moving from coding to leading was the hardest part.** I was used to being hands-on, and over time I realized the team needed me more for unblocking, planning, and coaching than for writing code.
- **Know each person's strengths and weaknesses.** Putting people where they make the biggest impact is where a team's efficiency comes from.
- **There's no fixed process, only guidelines.** What works is adapting them to how your team works best.
