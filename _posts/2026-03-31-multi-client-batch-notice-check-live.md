---
layout: post
title: "Every Morning at 8 AM, an AI Agent Checks 13 Income Tax Portals — So the CA Doesn't Have To"
date: 2026-03-31
description: "I set up a daily AI agent for a CA firm that logs into India's Income Tax e-Filing portal for each of their 13 clients every morning, checks for new notices, downloads PDFs, and sends a summary via WhatsApp and Telegram — before the team even gets to their desks."
keywords: "daily income tax portal monitoring, automated CA firm compliance, scheduled AI agent India, income tax notice alert system, e-proceedings daily check automation, chartered accountant automation daily"
---

A CA I work with has 13 clients with active proceedings on India's Income Tax e-Filing portal. First Appeals, Penalty Proceedings, Arrear Demands, Hearing Notices — the kind of things where missing a deadline means real consequences.

Before I got involved, someone on the team would spend their morning logging into each client's portal account, navigating to e-Proceedings, checking if anything new had come in, and reporting back. Thirteen logins. Every day. Most days, there's nothing new. But you can't skip a day, because the one time you do is the time a hearing notice drops with a seven-day deadline.

So I built an AI agent that does the entire thing. Every morning. Automatically.

## How It Works

Every day at 8 AM, a scheduled job kicks off the agent. No one needs to trigger it. No one needs to be awake. Here's what happens:

**The agent reads the client directory** — a table with 13 entries, each with a client name, PAN, and portal credentials.

**For each client, it:**

1. Opens the Income Tax e-Filing portal and logs in with their PAN and password
2. Handles the portal's quirks — security popups, authentication errors, session timeouts — automatically
3. Navigates to Pending Actions → e-Proceedings
4. Checks the "For your Action" tab for the most recent proceeding
5. Compares it against the client's Notice Log — a running record of every notice already seen and processed
6. If nothing new — moves to the next client
7. If there's a new notice — downloads the PDF, reads it, extracts the key details (what type of notice, which section of the IT Act, what's required, by when), saves it to the client's file, and sends a WhatsApp message to the CA with the PDF attached and a plain-English summary

After all 13 clients are done, the agent sends a Telegram summary — either an all-clear confirmation or a list of new notices that need attention.

The whole run takes minutes. The CA gets a message on their phone before they've finished their morning coffee. Either "all clear, nothing new across any client" or "Client X has a new hearing notice for AY 2016-17, response due in 7 days — PDF attached."

## The Client Mix

This isn't a one-size-fits-all portfolio. The firm's clients include:

- **Individuals** — salaried professionals, retirees, and business owners with active appeal proceedings
- **Firms and LLPs** — a construction services firm with arrear demands and a real estate LLP with advance tax reminders
- **Trusts** — a healthcare trust with multiple open proceedings across assessment years
- **Cooperatives** — a rubber marketing society, a cooperative bank, and a workers' welfare body
- **Local authorities** — a market authority with legacy demand notices going back to 2009

Each one has a different history on the portal. Some have one proceeding. Some have ten. The agent handles all of them the same way — log in, check, compare, report.

## What the CA Actually Receives

On a quiet day (most days), the CA gets a single Telegram message:

> All clear — no new notices found across 13 clients.

With a per-client breakdown confirming each one was checked.

On a day when something comes in, they get a WhatsApp message like:

> New notice on [Client Name]'s portal — Hearing Notice u/s 250 from NFAC for AY 2016-17. Written submissions due by [date]. PDF attached.

The PDF is already downloaded, named properly, and filed in the client's folder. The Notice Log is updated. The CA just needs to read the summary and decide on next steps.

## Why This Matters More Than It Sounds

The obvious value is time saved. Two hours of an article clerk's morning, recovered. Every single day.

But the real value is something less visible: **nothing falls through the cracks.**

A CA firm's reputation lives and dies on responsiveness. Miss a hearing date, and the appeal gets decided ex-parte. Miss a demand notice, and recovery proceedings begin. Miss a penalty deadline, and the window to contest closes.

The portal doesn't send reliable email alerts. There's no API. There's no webhook. The only way to know is to check. And now that checking happens automatically, every single morning, with a timestamped record of every run.

**The agent doesn't take leave. It doesn't forget a client. It doesn't get distracted by a phone call halfway through the list.** It checks all 13, compares against history, and reports — same way, every day.

## The Numbers

| What | Value |
|------|-------|
| Clients monitored daily | 13 |
| Portal logins per day | 13 |
| Time to complete full check | Minutes |
| Manual effort required | Zero |
| Delivery channels | WhatsApp + Telegram |
| Notice history maintained | Per-client, cumulative |
| Missed checks since deployment | 0 |

## What This Looks Like Over Time

After a week, the firm has a complete log of every check run — dates, results, notices found. After a month, they have a compliance timeline for every client. After a quarter, they can tell any client exactly when each notice was received, when it was reviewed, and what action was taken.

This isn't just monitoring. It's building an audit trail that the firm never had before.

---

**This system is running in production for a CA firm today.** If your firm is still checking portals manually, that's a choice — and it's costing you hours every day, plus the risk of the one notice you miss.

<a href="/contact" class="btn">Book a free discovery call</a>
