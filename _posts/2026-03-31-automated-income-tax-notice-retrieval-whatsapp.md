---
layout: post
title: "I Built an AI Agent That Checks the Income Tax Portal and Sends Notices via WhatsApp — Here's Exactly How"
date: 2026-03-31
description: "A step-by-step breakdown of how I automated India's Income Tax e-Filing portal — from login to e-Proceedings to PDF download to WhatsApp delivery — using Claude Code and Playwright. No scripts, no selectors, no maintenance."
keywords: "income tax portal automation India, CA firm automation, e-filing notice automation, WhatsApp automation for chartered accountants, NFAC notice alert system, AI tax compliance automation, income tax e-proceedings automation"
---

A CA asked me to check a client's Income Tax portal for new notices and send them a summary on WhatsApp. Routine stuff — the kind of task that happens 40 times a day across different client PANs in any busy firm.

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

## What I Built: The Full Workflow

Here's what the AI agent does, end to end, without a single line of hardcoded script:

### Step 1: Portal Login
The agent navigates to `incometax.gov.in`, enters the client's PAN, clicks Continue, confirms the secure access message, enters the password, and logs in. It handles the loading spinner, the Angular routing, and the session timer — all through semantic page understanding.

### Step 2: Navigate to e-Proceedings
From the dashboard, it opens the hamburger menu, clicks Pending Actions → e-Proceedings. The portal uses Angular Material overlays and nested menus — the AI handles these without any CSS selectors or XPaths.

### Step 3: Scan for Notices
The agent checks the "For your Action" tab and identifies active proceedings — in this case, a First Appeal Proceeding with a recent Hearing Notice u/s 250.

### Step 4: Download the Notice PDF
It clicks into View Notices/Orders, identifies the most recent notice from NFAC, opens the detailed view, and downloads the PDF.

### Step 5: Read and Extract Key Details
The agent reads the full PDF and pulls out the material facts:

- **Notice type** (e.g., Hearing Notice, Demand, Penalty)
- **Issuing authority** (e.g., NFAC, AO, CPC)
- **Assessment Year**
- **What's required** (written submissions, documents, payment, etc.)
- **Response due date**

No client-specific details are hardcoded — the agent reads whatever the notice contains and structures it into a clean summary.

### Step 6: Compose and Send via WhatsApp
The agent opens WhatsApp Web, searches for the recipient, attaches the PDF with a clean filename, and sends a structured message summarizing the notice — type, section, assessment year, what's required, and the deadline. Ready for the CA to act on immediately.

## The Stack

| Component | Role |
|-----------|------|
| **Claude Code (Opus)** | AI brain — orchestrates the entire workflow from natural language |
| **Playwright MCP** | Browser automation — handles the portal's Angular UI, spinners, modals, auth flows |
| **WhatsApp Web** | Delivery channel — sends PDF + summary to the right person |

No Selenium. No Puppeteer scripts. No brittle CSS selectors that break when the portal updates. The AI reads each page's accessibility tree and acts on what it *understands*, not what it was hardcoded to find.

## Why This Matters

This ran against a live portal, downloaded an actual NFAC notice, and delivered it to a real WhatsApp chat. Not a mockup.

The implications:

- **Morning digest:** Run the agent across all clients at 8 AM. Get a WhatsApp summary of every new notice before your first meeting.
- **Zero missed deadlines:** Every notice comes with its due date extracted and highlighted.
- **Audit-ready:** Every retrieval is logged — what was found, when it was checked, where it was delivered.
- **Team leverage:** Your team focuses on responding to notices, not finding them.

---

**Interested in what this could look like for your firm?** Let's talk.

<a href="/contact" class="btn">Book a free discovery call</a>
