---
layout: post
title: "13 Clients, 13 Logins, Zero New Notices — How an AI Agent Ran a Full Compliance Check in One Sitting"
date: 2026-03-31
description: "A real-world session log of an AI agent checking India's Income Tax e-Filing portal across 13 clients — logging in, scanning e-Proceedings, comparing against historical records, and delivering a summary via WhatsApp and Telegram. No scripts, no selectors, no human intervention."
keywords: "multi-client IT portal automation, batch notice checking India, CA firm compliance automation, income tax e-proceedings batch check, AI agent tax compliance, automated notice monitoring chartered accountant"
---

Today I ran a full compliance check across every client in a CA firm's portfolio. Thirteen clients. Thirteen separate logins to India's Income Tax e-Filing portal. Every single one checked for new notices, compared against what's already on file, and summarized — all without me touching the keyboard after hitting go.

**The result: zero new notices. The value: knowing that with certainty, in minutes instead of hours.**

## What Actually Happened

Here's the session, in plain English.

The AI agent picked up the client directory — a simple table with 13 rows, each containing a client name, PAN, and login credentials. Then it started working through the list, one by one:

**For each client, the agent:**

1. Navigated to the Income Tax e-Filing portal login page
2. Entered the PAN, clicked Continue, confirmed the secure access message, entered the password
3. Handled session popups ("Are you sure you want to Logout?") and authentication errors ("Request is not authenticated") — retrying automatically where needed
4. Reached the dashboard, noted the client's official name
5. Navigated to Pending Actions → e-Proceedings
6. Scanned the "For your Action" tab for the most recent proceeding
7. Read the client's existing Notice Log to check if this proceeding was already on file
8. If already logged — moved to the next client. If new — would download, summarize, log, and notify.

Thirteen times. No intervention. No babysitting.

## The Client Portfolio

The firm's clients ranged from individuals to trusts, LLPs, cooperatives, and a local authority. Each has a different history on the portal — some with one proceeding, some with ten. The agent handled all of them:

- **Individuals** like Malapravanal Cicily, Joseph, Malini Sashidharan, Tharappel, Alex Thomas, and Joseph Jose Elamthuruthiyil
- **Firms** like Epsilon Engineering Services and Kolakkattil Realtors LLP
- **Trusts** like Health Care Foundation
- **Cooperatives** like Mazdoor Bharathi, Kozhikode District Co-op Rubber Marketing Society, and Chemanchery Service Cooperative Bank
- **Local authorities** like Urban Wholesale Market Authority

Each has different proceeding types on the portal — First Appeal Proceedings, Issue Letters, DAK Letters, Penalty Proceedings, Hearing Notices u/s 250, Arrear Demands. The agent doesn't care about the variety. It reads whatever the portal shows and compares it to what's already been recorded.

## What Made This Session Interesting

**The "Request is not authenticated" error.** The IT portal throws this intermittently — it's not a wrong password, it's a session issue. The agent knows to simply click Continue again. It happened twice during this run (Tharappel and Epsilon Engineering). Both times, the retry worked immediately.

**The security logout popup.** Every time you navigate away from a logged-in session back to the login page, the portal shows a modal asking "Are you sure you want to Logout?" The agent clicks YES, waits for the redirect, then proceeds with the next login. Thirteen logouts, zero issues.

**Old "New" notices on Kolakkattil Realtors.** The portal showed two proceedings tagged as "New" — Adjustment u/s 143(1)(a) for AY 2017-18 and 2018-19. Sounds alarming, right? The agent clicked into them and found they were from 2019, with response deadlines that lapsed years ago. They were "New" only because nobody had ever viewed them on the portal. Not actionable. Not worth alerting the CA about. The agent made this judgment call correctly.

## The Deliverables

After completing all 13 checks, the agent produced three outputs:

**A summary table** showing every client, their most recent proceeding, the date, and whether it was new — all visible in the terminal.

**A Telegram message** to the firm's bot channel (SC IT Notice Bot), confirming the all-clear with a per-client breakdown. This was the first run using a newly added Step 10 in the workflow — Telegram notifications weren't working before this session because the step had never actually been written into the automation script, despite being referenced in documentation. We caught and fixed that today.

**A WhatsApp message** to a specific number, with a detailed summary of the most recent notice on file for each client — sorted by date, most recent first. Not just "no new notices," but a full status snapshot: what each client's last notice was, when it was issued, and what it said.

## The Numbers

| Metric | Value |
|--------|-------|
| Clients checked | 13 |
| Portal logins | 13 |
| Auth errors handled | 2 |
| Logout popups handled | 13 |
| New notices found | 0 |
| Notices already on file | 13 |
| Telegram summary sent | Yes |
| WhatsApp summary sent | Yes |

## Why "Zero New Notices" Is Still a Win

A manual check across 13 clients would take a junior staff member the better part of a morning. Log in, navigate, check, log out, repeat. And at the end of it, the answer is the same — nothing new. Except now, two hours of the day are gone.

The AI agent did the same thing in minutes. And the firm has a timestamped record that every client was checked, along with a complete summary of what's currently on file.

**The real value of automation isn't in the exceptions. It's in the routine.** The notices will come eventually — a new hearing date, a fresh demand, an appeal update. When they do, the agent will catch them, download the PDF, summarize it, log it, and deliver it before the CA's morning coffee. But on the days when nothing happens, the agent's value is giving the firm certainty. Checked. Confirmed. Nothing pending. Move on.

## What's Next

This session validated multi-client batch execution — the biggest item remaining in Phase 1 of the build. The system now handles:

- [x] Single-client notice retrieval
- [x] Multi-client batch execution
- [x] Error handling and retry logic
- [x] Telegram notification delivery
- [x] WhatsApp summary delivery
- [x] Historical comparison (new vs. already logged)

Next up: scheduling this to run automatically every morning, and building the urgency scoring layer so that when a notice does arrive, the firm knows immediately whether it's "FYI" or "drop everything."

---

**Running a CA firm and spending hours on portal checks?** This system exists. It works. And it can be configured for your client portfolio.

<a href="/contact" class="btn">Book a free discovery call</a>
