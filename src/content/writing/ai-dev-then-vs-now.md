---
title: How my AI-assisted development changed in a few months
summary: From Cursor plus long guides to skills, agents, and caring about tokens, in under a year. What changed, and how I adapted.
pillar: AI
type: article
date: 2026-11-03
---

In January, I helped set up AI-assisted development for a frontend team. It worked, but most of it was built around one assumption: that the models weren't quite good enough yet. That was true in January. Within a few months it wasn't, and the way I work now looks very different.

This is what changed, and how I adapted.

## Then: guardrails for a model I didn't fully trust

Our setup was simple:

- **Cursor** as the main tool, with MCP connections so the AI could read the sources directly: **Figma** for designs, **Confluence** for documentation, and **Linear** for requirements
- **AI-assisted code review** built into our GitHub flow
- **Long guides** covering conventions, patterns, and do's and don'ts, written to make up for what the model might get wrong
- **Manual workflows.** I wanted to stay involved in every step.

It paid off. The team got through more tickets, shipped features faster, and made fewer mistakes, because the AI pulled exact values from the designs, docs, and tickets instead of guessing them. Each piece made sense when the models needed hand-holding.

## What didn't hold up

**The guides were too long.** Much of what I wrote down, current models already do well without being told. Long guides cost context and dilute the instructions that actually matter.

**I wasn't thinking about tokens.** Every guide, every file the AI reads, and every verbose response costs something: money, speed, and room in the context window. I barely considered it then.

**The workflows stayed manual.** That was partly on purpose. I wanted to be in the loop. But it also meant the AI did single steps while I did the stitching.

## What changed

Two things.

**The models got much better.** Most of what I used to spell out, they now get right on their own.

**Skills and agents arrived.** Skills package instructions so they load only when relevant, instead of sitting in one big guide. Agents can run a flow end to end: plan, build, review, test.

## Now: how I work

**Skills over big guides.** I keep project instructions short and lean on skills for specific jobs, like design skills for UI and UX work.

**Token optimization is a habit now.** I use tools that cut what goes in and out of the model: some trim command output, others keep code and responses minimal.

**More time on planning.** I put more effort into the planning phase, so the AI understands the task properly from the start instead of correcting course halfway.

**The AI reviews and tests its own work first.** I let it review and test what it generates, over several rounds. Then I do the final review and testing myself. The AI does the first passes, and the last pass is still mine.

## Still figuring out

Agents and sub-agents. I'm experimenting with different agent setups right now. How to split work between them, how much to trust a chain of agents, and where a human needs to step in are questions I'm still working through. I'll write about it once I have better answers.

This is part one. Part two will go through the actual flows, skills, and configs.
