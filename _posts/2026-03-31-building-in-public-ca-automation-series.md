---
layout: post
title: "Building in Public: An AI-Powered Compliance System for a CA Firm — Series Introduction"
date: 2026-03-31
description: "I'm building a full AI automation system for an Indian CA firm — portal monitoring, notice retrieval, deadline tracking, and client communication. Everything gets documented here. This is the series index."
keywords: "build in public AI automation, CA firm compliance system, tax automation India series, AI agent development log, compliance automation build log, chartered accountant technology"
---

This post is a bookmark. A table of contents. A promise.

**I'm building an end-to-end AI compliance automation system for a Chartered Accountant firm in India, and I'm documenting every step publicly on this blog.**

The client is confidential. The systems are not.

## Why This Series Exists

Most "AI automation" content is either:
- Vaporware demos that never touch production
- Enterprise case studies so abstracted they're useless
- Tutorial content that stops at "Hello World"

This series is none of that. I'm shipping real systems for a real client, solving real problems — and writing about exactly what I built, what broke, what I learned, and what I'd do differently.

If you're a CA firm thinking about automation, you'll see exactly what's possible. If you're a builder in this space, you'll get an honest technical playbook.

## The Starting Point

Yesterday, I built and demonstrated the core proof-of-concept:

**An AI agent that logs into India's Income Tax e-Filing portal, navigates to e-Proceedings, identifies new notices, downloads the PDF, extracts key details, and sends a structured summary with the document attached via WhatsApp.**

It worked. First try. Against a real client portal with a real NFAC Hearing Notice u/s 250.

Read the full technical breakdown: [I Built an AI Agent That Checks the Income Tax Portal and Sends Notices via WhatsApp](/blog/automated-income-tax-notice-retrieval-whatsapp/)

Read the strategic context: [The CA Firm Automation Playbook](/blog/ai-compliance-automation-ca-firms-india/)

## The Roadmap

Here's what I'm building, roughly in order. Each item becomes a blog post (or several) as I ship it:

### Phase 1: Foundation (Current)
- [x] Single-client Income Tax portal notice retrieval
- [x] PDF download and intelligent summarization
- [x] WhatsApp delivery with structured message
- [ ] Multi-client batch execution
- [ ] Error handling and retry logic
- [ ] Execution logging and audit trail

### Phase 2: Intelligence
- [ ] Notice classification engine (hearing, demand, penalty, intimation)
- [ ] Urgency scoring algorithm (days to deadline x financial impact)
- [ ] Historical notice tracking — what's new vs. what was already seen
- [ ] Pattern detection — clients that frequently receive similar notices

### Phase 3: Workflow Integration
- [ ] Google Calendar deadline sync
- [ ] Automated task creation in practice management tools
- [ ] Email delivery alongside WhatsApp
- [ ] Team assignment rules — route to the right person automatically

### Phase 4: Multi-Portal Expansion
- [ ] GST Portal monitoring
- [ ] MCA/ROC compliance tracking
- [ ] TDS/TRACES default monitoring
- [ ] Consolidated compliance dashboard

### Phase 5: Response Automation
- [ ] Standard response template generation
- [ ] Auto-population with client-specific data
- [ ] Document assembly for appeal submissions
- [ ] Partner review workflow with approval routing

## How to Follow Along

**Bookmark this page.** I'll update the roadmap checklist above as each component ships, with links to the detailed posts.

New posts will appear on the [blog page](/blog) and will always link back here for context.

If you want to get notified when new posts drop, the simplest way is to check this page periodically — or reach out and I'll add you to a mailing list if there's enough interest.

## Who This Is For

**CA firm founders and partners** who know their team spends too much time on portal monitoring and want to see what automation actually looks like — not a sales pitch, but the real thing.

**Developers and AI builders** interested in practical agentic workflow design — browser automation, document processing, multi-system orchestration.

**Anyone in Indian tax/compliance tech** who wants to understand where AI agents fit in the current landscape.

## The Offer

I'm taking on a limited number of CA firms as automation clients. The system I'm building is designed to be replicated — each firm gets a customized instance tuned to their client portfolio, team structure, and workflow preferences.

If you've read this far, you're probably the right kind of client: someone who values their team's time, understands that portal checking is not professional work, and wants a concrete solution — not a vague "AI transformation" promise.

<a href="/contact" class="btn">Book a free discovery call</a>

---

*Last updated: March 31, 2026. Check back regularly — this page evolves as the build progresses.*
