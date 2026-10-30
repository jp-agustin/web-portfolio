---
title: How my AI-assisted development changed in a year
summary: From Cursor plus long guides to skills, agents, and caring about tokens. What changed, and what I'd do differently for a team.
pillar: AI
type: article
date: 2026-10-30
---

Earlier this year I set up AI-assisted development for a frontend team. Looking back, it worked, but most of it was built around one assumption: that the models weren't quite good enough yet. That was mostly true at the time. It isn't anymore, and the way I work now looks very different.

This is what changed, for engineers working with AI day to day and for leads deciding how a team should use it.

## Then: guardrails for a model I didn't fully trust

At Ailytics, our setup was simple:

- **Cursor** as the main tool, with **Figma MCP** so the AI could read designs directly instead of guessing from screenshots
- **AI-assisted code review** built into our GitHub flow
- **Long guides** covering conventions, patterns, and do's and don'ts, written to make up for what the model might get wrong
- **Manual workflows.** I wanted to stay involved in every step.

Each piece made sense when the models needed hand-holding.

## What didn't hold up

**The guides were too long.** Much of what I wrote down, current models already do well without being told. Long guides cost context and dilute the instructions that actually matter.

**I wasn't thinking about tokens.** Every guide, every file the AI reads, and every verbose response costs something: money, speed, and room in the context window. I barely considered it then.

**The workflows stayed manual.** That was partly on purpose. I wanted to be in the loop. But it also meant the AI did single steps while I did the stitching.

## What changed

Two things.

**The models got much better.** Most of what I used to spell out, they now get right on their own.

**Skills and agents arrived.** Skills package instructions so they load only when relevant, instead of sitting in one big guide. Agents can run a flow end to end: plan, build, review, test.

## Now: how I work

**Skills over big guides.** I keep project instructions short and lean on skills for specific jobs. For UI and UX on my own projects, I use design skills like *taste* and *impeccable*.

**Token optimization is a habit now.** I use tools that cut what goes in and out of the model: *RTK* to trim command output, and skills like *ponytail* and *caveman* to keep code and responses minimal.

**More time on planning.** I put more effort into the planning phase, so the AI understands the task properly from the start instead of correcting course halfway.

**The AI reviews and tests its own work first.** I let it review and test what it generates, over several rounds. Then I do the final review and testing myself. The AI does the first passes, and the last pass is still mine.

**Exploring agent setups.** Right now I'm experimenting with *Hermes agents* with *OmniRoute* and *Superpowers* skills.

## If I set this up for a team again

- **Start with agents and end-to-end flows,** not single-step assists. Less manual stitching.
- **Keep instructions short.** Write down only what the model gets wrong without them.
- **Make token cost visible early.** It's much easier to build the habit than to fix it later.
- **Put effort into planning,** for the AI and for the people.
- **Let the AI review and test first,** but keep a human on the final review.

## Still figuring out

Agents and sub-agents. How to split work between them, how much to trust a chain of agents, and where a human needs to step in are questions I'm still working through. I'll write about it once I have better answers.
