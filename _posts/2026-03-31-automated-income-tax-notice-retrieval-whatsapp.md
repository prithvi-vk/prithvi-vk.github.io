---
layout: post
title: "I Built an AI Agent That Checks the Income Tax Portal and Sends Notices via WhatsApp — Here's Exactly How"
date: 2026-03-31
description: "A step-by-step breakdown of how I automated India's Income Tax e-Filing portal — from login to e-Proceedings to PDF download to WhatsApp delivery — using Claude Code and Playwright. No scripts, no selectors, no maintenance."
keywords: "income tax portal automation India, CA firm automation, e-filing notice automation, WhatsApp automation for chartered accountants, NFAC notice alert system, AI tax compliance automation, income tax e-proceedings automation"
---

A CA asked me to check a client's Income Tax portal for new notices and send them a summary on WhatsApp. Routine stuff — the kind of task a junior does 40 times a day across different client PANs.

I did it once. Then I automated the entire thing.

**Time to build: one sitting. Time to run: under 2 minutes per client. Manual effort: zero.**

## The Problem Every CA Firm Knows Too Well

India's Income Tax e-Filing portal has no API. No webhooks. No notification system that actually works. The only way to know if a client has received a new notice — a hearing notice, a demand, a penalty proceeding — is to:

1. Log in with the client's PAN and password
2. Navigate to Pending Actions → e-Proceedings
3. Check both "For your Action" and "For your Information" tabs
4. Open each notice, read it, download the PDF
5. Figure out what it means and what the deadline is
6. Message the right person about it

Now multiply that by 50 clients. Every single day.

That's not professional work. That's portal babysitting. And it's exactly the kind of task AI agents were built to eliminate.

## What I Built: The Full Workflow

Here's what the AI agent does, end to end, without a single line of hardcoded script:

### Step 1: Portal Login
The agent navigates to `incometax.gov.in`, enters the client's PAN (AFDPJ4364G), clicks Continue, confirms the secure access message, enters the password, and logs in. It handles the loading spinner, the Angular routing, and the session timer — all through semantic page understanding.

### Step 2: Navigate to e-Proceedings
From the dashboard, it opens the hamburger menu, clicks Pending Actions → e-Proceedings. The portal uses Angular Material overlays and nested menus — the AI handles these without any CSS selectors or XPaths.

### Step 3: Scan for Notices
The agent checks the "For your Action" tab (3 active proceedings found) and identifies the most critical one: a **First Appeal Proceeding** for AY 2016-17 with a recent Hearing Notice u/s 250.

### Step 4: Download the Notice PDF
It clicks into View Notices/Orders, identifies the most recent notice (dated 21 November 2025 from NFAC), opens the detailed view, and downloads the PDF — a 4-page Hearing Notice under section 250 of the Income-tax Act, 1961.

### Step 5: Read and Extract Key Details
The agent reads the full PDF and pulls out every material fact:

- **Notice type:** Hearing Notice u/s 250
- **Issuing authority:** National Faceless Appeal Centre (NFAC), Delhi
- **Assessment Year:** 2016-17
- **Appeal No:** NFAC/2015-16/10164958
- **Original order:** u/s 147, DIN ITBA/AST/S/147/2021-22/1041220865(1), dated 22/03/2022
- **What's required:** Ground-wise written submissions with supporting documentary evidence
- **Due date:** 28 November 2025

### Step 6: Compose and Send via WhatsApp
The agent opens WhatsApp Web, searches for the recipient, attaches the PDF with a clean filename, and sends a structured message:

> *"Hi Prithvi, sharing a notice received on Joseph Jose Elamthuruthiyil's (PAN: AFDPJ4364G) IT portal. It's a Hearing Notice u/s 250 from NFAC dated 21st November 2025 for AY 2016-17 — they are required to submit ground-wise written submissions and supporting documents in connection with the First Appeal against the assessment order u/s 147 passed by National Faceless Assessment Centre vide DIN No. ITBA/AST/S/147/2021-22/1041220865(1) on 22/03/2022. The response due date was 28th Nov 2025. Please let me know how you'd like to proceed."*

That message, with the PDF attached, delivered at 11:25 PM. Double blue ticks.

## The Stack

| Component | Role |
|-----------|------|
| **Claude Code (Opus)** | AI brain — orchestrates the entire workflow from natural language |
| **Playwright MCP** | Browser automation — handles the portal's Angular UI, spinners, modals, auth flows |
| **WhatsApp Web** | Delivery channel — sends PDF + summary to the right person |

No Selenium. No Puppeteer scripts. No brittle CSS selectors that break when the portal updates. The AI reads each page's accessibility tree and acts on what it *understands*, not what it was hardcoded to find.

## Why This Changes Everything for Tax Professionals

This isn't a demo. This ran against a real client's portal, downloaded a real NFAC notice, and delivered it to a real WhatsApp chat.

The implications for CA firms:

- **Morning digest:** Run the agent across all clients at 8 AM. Get a WhatsApp summary of every new notice before your first coffee.
- **Zero missed deadlines:** Every notice comes with its due date extracted and highlighted.
- **Audit-ready:** Every retrieval is logged — what was found, when it was checked, where it was delivered.
- **Junior staff freed up:** Your articled clerks can do actual tax work instead of clicking through portals.

## This Is Post #1 — More Coming

I'm now building a full-scale automation suite for a CA firm client. The engagement is confidential, but I'm building in public — every system, every workflow, every lesson learned gets documented here.

**Bookmark this page.** Upcoming posts will cover:
- Multi-client batch monitoring with parallel agent execution
- Automated notice classification and urgency scoring
- Deadline sync to Google Calendar and task management tools
- Response draft generation with client-specific data prefill
- The business model: packaging this as a service for CA firms

---

**Running a CA firm? Spending hours on portal checks?** Let's talk about getting that time back.

<a href="/contact" class="btn">Book a free discovery call</a>
