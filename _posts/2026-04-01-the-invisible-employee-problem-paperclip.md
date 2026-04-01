---
layout: post
title: "The Invisible Employee Problem — Why I Built a Visual AI Org Chart for a CA Firm Using Paperclip"
date: 2026-04-01
description: "As an AI consultant, the hardest part of selling agentic AI isn't building it — it's showing it. I set up Paperclip to give AI agents a visible presence: org charts, run histories, and real-time Telegram updates. Here's how."
keywords: "paperclip ai orchestration, agentic ai visualization, ai agent org chart, ai consulting challenges, paperclip setup guide, ai agents for CA firms, autonomous ai workers, ai compliance automation"
---

Here's a problem nobody talks about in AI consulting: your best work is invisible.

I can build an AI agent that logs into 13 income tax portal accounts every morning, checks for new notices, downloads PDFs, summarizes them, and sends WhatsApp messages to the CA team — all before anyone gets to their desk. I've done it. It works.

But when I sit across the table from a client and say "I built you an AI employee," they look at me and ask: *where is it?*

There's no desk. No Slack avatar. No row in the HR system. The agent runs, does its job, and disappears. The only proof it exists is that the work got done. And when you're trying to justify a consulting engagement, "trust me, it's working in the background" is a tough sell.

This is the invisible employee problem.

## The Gap Between Building and Showing

I've been automating compliance workflows for a CA firm — the kind of work where AI agents handle portal logins, notice checking, document downloads, and team notifications across multiple clients. The technical side is solved. The agents work reliably.

But every time I demo this to a stakeholder who isn't technical, I hit the same wall. They want to *see* the employee. They want an org chart. They want to click somewhere and see what this agent did today, how long it took, whether it succeeded or failed. They want the same visibility they'd get from a human team member filing a daily report.

So I went looking for something that could give AI agents a *presence* — not just a cron job and a log file, but an actual organizational identity.

## Enter Paperclip

[Paperclip](https://github.com/paperclipai/paperclip) is an open-source AI agent orchestration platform. The creators describe it as: *"If OpenAI is an employee, Paperclip is the company."*

That framing clicked immediately. Paperclip doesn't run AI models — it's a **control plane** that manages when agents wake up, what they work on, and what they spend. Think of it as a task tracker where the workers happen to be AI agents, complete with:

- An **org chart** with roles and reporting lines
- A **task queue** with statuses (backlog, in progress, done, blocked)
- **Run histories** showing exactly what each agent did, when, and how long it took
- **Cost tracking** per agent, per run
- **Governance** — agents can't hire other agents without board approval

This is exactly what was missing. Not more AI capability — more AI *visibility*.

## What I Set Up Today

I stood up a Paperclip instance for the CA firm with two agents:

![Paperclip Org Chart — CEO and IT Notice Checker agents in a reporting hierarchy](/assets/img/paperclip-org-closeup.png)

**The Company:** A Paperclip "company" container that houses all agents, tasks, costs, and goals for the firm's operations.

**CEO Agent:** The top-level agent that oversees all operations and can delegate tasks to specialist agents below it.

**IT Notice Checker Agent:** Reports to the CEO. Runs on a 24-hour heartbeat cycle. Uses Claude as its AI runtime with browser automation to interact with the Income Tax e-Filing portal, WhatsApp Web, and Telegram.

Every run is logged in the dashboard. You can see what the agent did, what tools it called, how long it took, and whether it succeeded. This is the kind of visibility that makes a non-technical stakeholder nod and say "okay, I get it."

## The Technical Setup

For those who want the details, here's how the pieces fit together.

**Paperclip runs locally** as a TypeScript monorepo with an embedded PostgreSQL database. One `pnpm dev` command and you have a full orchestration platform at `localhost:3100`. No cloud dependencies for local development.

**Agents are configured with adapters** that define how Paperclip invokes their AI runtime. For the IT Notice Checker, I used the `claude_local` adapter — Paperclip's dedicated Claude Code integration that handles workspace resolution, session management, and permission configuration:

```
Adapter: claude_local
Working Directory: ~/Documents/Tax
Browser: Enabled (Playwright)
Timeout: 900 seconds
Permissions: Autonomous execution
Heartbeat: 24-hour interval, wake on demand
```

**The heartbeat system** is how agents wake up. Every 24 hours, the IT Notice Checker activates, reads the client directory, and cycles through all accounts. But the real power is the **on-demand wake API** — any external system can trigger the agent immediately.

**I wired a Telegram bot** to the wake API. A simple long-polling Node.js server listens for `/check_notices` in a Telegram group and calls Paperclip's wakeup endpoint. The agent spins up, does its work, and posts progress updates back to the same group.

The notification flow during a run:
1. **Session start** — "IT Notice Check — Starting..."
2. **Client list loaded** — "Checkpoint: 13 clients to check"
3. **Per-client progress** — "[3/13] Client Name — No new notices" (or details if a notice was found)
4. **Blockers** — "[7/13] Client Name — BLOCKED: OTP required"
5. **WhatsApp confirmation** — "CA team has been notified"
6. **Session summary** — Full results with counts and duration

All of this is visible in both the Telegram group and the Paperclip dashboard. Two views of the same work — one for the team that operates via messaging, one for the stakeholder who wants a proper management interface.

## The Execution Loop

Every Paperclip agent follows a protocol when it wakes up:

1. **Identify itself** — calls the API to confirm its identity and configuration
2. **Check for assigned tasks** — looks for work in its queue
3. **Claim a task atomically** — prevents two agents from double-working the same item
4. **Do the actual work** — in this case, portal logins, notice checking, PDF downloads, WhatsApp/Telegram notifications
5. **Report results** — updates task status, logs token costs
6. **Delegate if needed** — can create subtasks for other agents

The atomic task checkout is a nice detail — it's a single database write, so if two agents try to claim the same task, only one succeeds. The other gets a 409 and moves on. No coordination overhead, no double-work.

## What This Changes for Client Conversations

Before Paperclip, my demo was: "Here's a Telegram message the agent sent. Trust me, it checked all 13 accounts."

Now I can pull up a dashboard and show:
- **The org chart** — here are your AI employees, here's who reports to whom
- **The run history** — here's every time the agent woke up, what it did, how long it took
- **The live transcript** — here's the agent's actual thought process and tool calls during a run
- **Cost tracking** — here's what each agent costs to operate per month

This is the difference between "I built you a script" and "I built you a department." Same underlying technology. Completely different perception.

## What's Next

The CA firm's Paperclip instance starts with one specialist agent. But the architecture is designed to grow. New agents — for GST compliance, audit preparation, client onboarding — can be hired through Paperclip's approval flow. Each one gets the same visibility: org chart presence, run histories, cost tracking, and Telegram integration.

The invisible employee problem isn't solved by building better AI. It's solved by giving AI the same organizational infrastructure we give humans — a role, a place in the hierarchy, and a paper trail of their work.

Paperclip is that infrastructure.

---

*If you're working on AI automation for professional services and want to talk about orchestration, visibility, or any of the technical details here — [let's connect](mailto:prithvi@meetily.ai).*
