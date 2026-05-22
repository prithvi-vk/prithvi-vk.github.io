---
layout: post
title: "An Engineer Got Laid Off by Atlassian — and Gave a Masterclass on the Way Out"
date: 2026-05-22
description: "A systems engineer was laid off by Atlassian after 8 years — and answered with a 38-minute video explaining every system he built. I turned it into a structured written breakdown: load balancers, an Envoy control plane, ~2,000 proxies across 13 AWS regions, and the engineering lessons underneath."
keywords: "Vasilios Syrakis, I was laid off by Atlassian, Atlassian infrastructure, Envoy proxy, xDS control plane, Sovereign Envoy control plane, platform engineering, Open Service Broker, AWS load balancing, Atlassian systems architecture, software engineering layoffs"
---

A couple of weeks ago, a systems engineer named Vasilios Syrakis posted a video titled _"I was laid off by Atlassian."_ Eight years at the company, ended in a 10% workforce cut. You brace for a vent. It isn't one.

It's 38 minutes of him calmly walking through the systems he built — no internal code, no data, no customers, just architecture. How Atlassian swapped expensive enterprise load balancers for open-source proxies. How he built the control plane that reconfigures around **2,000 of them across 13 AWS regions, live, with no restarts** — and open-sourced it. How those servers get baked, how authentication got centralised at the edge, and the part most engineers skip entirely: how you keep all of it maintainable for eight years without it quietly rotting.

It's a quiet masterclass, and it's earned its million-plus views. Honest, specific, generous engineering knowledge — given away for free, with full goodwill toward the company that just let him go — is rare enough to be worth studying properly.

Which was the one snag. It's a _38-minute video_. Brilliant to watch once; painful to skim, reference, or come back to.

So I fixed that. I pulled the full transcript, cross-checked it against the open-source repos and public docs, and rebuilt the whole thing as a structured written breakdown — every system explained in depth, architecture diagrams, an API reference table, a glossary, and the request path traced end to end. Colour-coded, skimmable, and linked all the way back to him.

![The published breakdown — a Notion page titled "Inside Atlassian's Edge," with a dark-blue gradient cover and colour-coded callout sections](/assets/img/atlassian-edge-breakdown.png)
_The breakdown — five core systems, mapped out and cross-referenced._

👉 **[Read the breakdown &rarr;](https://invented-balaur-5aa.notion.site/Inside-Atlassian-s-Edge-The-Systems-Vasilios-Syrakis-Built-367e12d1b0d58023a446ea528dee7bf7)**

It's pitched at engineers, but it's laid out so anyone curious about how a large software company actually runs under the hood can follow the thread — five core systems, and then the human ones: diplomacy, mentoring, and the "churn smell" that warns you a codebase is about to turn.

All the credit here is his. [Watch the original video](https://www.youtube.com/watch?v=55pTFVoclvE) and [follow his channel](https://www.youtube.com/@vsyrakis) — the breakdown just makes it easier to study, and to keep.
