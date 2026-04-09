---
layout: post
title: "How I Taught a Robot to File GST Returns at 2 AM (And Why a Kerala CA Firm Loves Me Now)"
date: 2026-04-09
description: "An AI agent that logs into the GST portal, enters every table, generates the summary, downloads the PDF, ships it to WhatsApp for CA approval, and then files the return via OTP — all without a human touching the browser. Here's how it went down."
keywords: "GSTR-1 automation India, GST portal automation, CA firm AI agent Kerala, automated GST return filing, GSTR-1 EVC filing automation, chartered accountant tax automation India, GST portal Playwright"
---

There's a particular flavor of human suffering reserved for whoever has to file GSTR-1 for a beauty parlour at the end of every month.

Picture it: 1,009 service bills. Four credit notes. One rent invoice. Two HSN codes. Thirteen tables on the GST portal. A captcha that rotates every time you blink at it. A session that times out the second you make a cup of chai. And at the end of it all, an OTP from a phone you don't have on hand because the signatory is in another room.

Multiply that by six clients. Welcome to the last week of every month at a Chartered Accountant's office in Kerala.

Last week, I built an AI agent that does the entire thing — login to portal, fill every table, reconcile credit notes, generate the summary, share it with the CA on WhatsApp, wait for human approval, and then file the return via EVC. **Two clients are already filed in production. ARNs in hand. Confirmation messages dispatched. CA reacted with a heart emoji.** The other four are queued up.

This is the story of how that came together — and why I'm not going to tell you exactly how I did the trickiest parts, even if you offer to pay me to teach you. (Politely. With a smile. But firmly.)

## The Stakes

GST returns aren't optional. Miss the 11th of the month for GSTR-1 and you eat a late fee, your customers can't claim ITC on your invoices, and your client starts asking whether they should be paying you at all.

For the firm I'm working with, the monthly GSTR-1 cycle is a grind:

- A beauty parlour with ~1,000 invoices a month, four credit notes, and a separate B2B rent invoice on the same GSTIN
- An insurance surveyor with 152 B2B invoices going to five different insurance companies
- A coaching institute with hostel income, transport, study material, YouTube ad revenue (export of services!), and reverse-charge rent
- A newspaper publisher with mixed exempt and ad income
- And two more clients with the kind of "we'll figure out the data later" status that keeps CAs awake at night

Each of these has to be entered, reviewed, approved, and filed. And the GST portal is — how do I put this charitably — *not designed for humans, let alone bots.*

## The Portal Problem (A Love Letter, Sort Of)

If you've never used the GST portal, here's what you need to know: it's a series of nested AngularJS forms wrapped in 2017-era CSS, served through a session management layer that politely shows you the door if you alt-tab for too long, and gated by an audio captcha that exists for reasons no one can fully explain.

There is no API. There is no webhook. There is no "GSTR-1 SDK." There is only the browser, the mouse, and your dwindling will to live.

Here's what filing a single GSTR-1 manually looks like:

1. Open the portal
2. Enter username, password
3. Solve a captcha
4. Click login
5. Navigate to Returns Dashboard
6. Pick the financial year, quarter, month
7. Click "Prepare Online" on the GSTR-1 tile
8. Fill Table 4A (B2B invoices) — one record at a time, or upload via JSON
9. Fill Table 7 (B2C consolidated)
10. Fill Table 12 (HSN summary) — but watch out, there are *two tabs*, one for B2B HSN codes and one for B2C, and putting an HSN under the wrong tab triggers a validation warning at summary time
11. Fill Table 13 (Documents Issued) — invoice serials, credit note serials, cancellations
12. Click "Generate Summary," wait, refresh
13. Click "Proceed to File / Summary"
14. Download the PDF
15. Send it to the CA for approval
16. Wait
17. Wait some more
18. CA approves
19. Click "File Statement"
20. Tick the declaration
21. Pick the authorised signatory
22. Click "File With EVC"
23. Get an OTP on a phone that may or may not be in your hand
24. Type the OTP
25. Click Verify
26. Pray to whichever deity handles GST compliance
27. Done. ARN issued. Filing logged.

Now do that 6 times. In one week. While also doing actual accounting work.

## What I Built

An AI agent — running on Claude with a Playwright-driven browser — that does steps 1 through 26 on its own. The CA's only job is to read the summary PDF that lands in their WhatsApp group, type 👍, and supply the OTP when it's time to file.

Here's the surface-level architecture, because I love a good architecture diagram described in prose:

### Layer 1 — Browser Control

A long-running browser session that the agent drives via Playwright. It clicks, types, navigates, downloads files, takes screenshots when it needs to verify what it's seeing, and reads the page's accessibility tree (much faster than parsing HTML) to figure out where things are.

### Layer 2 — Login + The Captcha Situation

Logging in is the first wall every automation hits. The portal demands a 6-digit captcha from an audio file — yes, *audio*, presumably for accessibility, very accidentally for automation.

I cracked it. It works reliably across logins. **I am not going to walk you through how.** Not because it's some moral high ground thing, but because it's one of the two or three specific moves that make this whole project work in production rather than be a toy demo, and some things are worth keeping in the kitchen.

What I *will* tell you: there's no OCR involved, no third-party captcha-solving service, no human in the loop. The agent handles it itself, in a few seconds, every time.

### Layer 3 — Data Entry

Once logged in, the agent reads the client's input data (Tally exports, Excel files, sometimes structured WhatsApp messages from the CA team) and figures out which tables on the portal need to be filled.

For high-volume tables — say, 152 B2B invoices to insurance companies — it generates a JSON file in the GST portal's specific schema and uploads it via the "Prepare Offline" path. The portal processes it asynchronously, and the agent waits, refreshes, and confirms the records show "Processed" status with no errors.

For low-volume tables — HSN summaries, documents issued, B2C consolidated — it uses the online entry forms directly, navigating each tile, filling each field, and saving each record.

There's a particularly fun edge case here: the GST portal does **not** let you enter credit notes for B2C Others in Table 9B. You can only enter credit notes there for B2C Large or Exports. So for a beauty parlour with four credit notes against retail customers, you have to *net them off in the Table 7 taxable value.* Manually. And then the portal auto-calculates CGST/SGST on the netted figure, which differs by a couple of rupees from what Tally produces at the invoice level, because rounding across 1,000 invoices does what rounding does. The agent knows about this and handles it gracefully.

### Layer 4 — Summary Generation + Human Approval

Once everything is entered, the agent clicks "Generate Summary," waits for the portal to crunch the numbers, downloads the consolidated summary PDF, and hands it off to the CA via WhatsApp Web — also driven by Playwright, also running headlessly, also handling the 47 ways WhatsApp's UI can subtly change between sessions.

The PDF lands in the firm's WhatsApp group with a crisp, non-verbose message: client name, what was done, the figures that matter, the words *"not filed"* in bold, and a tag for the senior CA asking for approval.

This is the **approval gate**. The agent does not file anything until a human says yes. That's not a technical limitation — it's a deliberate design choice. Filing a GST return is a legal act. The CA's name is on the line. The agent's job ends at "ready to file" and resumes only when explicitly told to proceed.

### Layer 5 — Filing

When the CA approves, the agent re-logs into the portal (because of course the session has expired, it's been an hour), navigates back to the summary, clicks "File Statement," ticks the declaration, picks the authorised signatory from a dropdown, and clicks "File With EVC."

The portal sends an OTP to the signatory's registered mobile and email. The agent pauses, asks the operator for the OTP via the chat interface, fills it in, clicks Verify, and waits for the magic words: *"GSTR-1 has been successfully filed. Acknowledgment Reference Number is …"*

Then it screenshots the confirmation, downloads the *filed* version of the PDF (which is on a different button than the pre-filing version, because of course it is), and sends one final WhatsApp message: client name, "FILED," ARN, filed via EVC.

CA reacts with ❤️. Agent stands down. On to the next client.

## The Receipts

Here's what's actually in production right now:

| Metric | Value |
|---|---|
| Clients in scope | 6 |
| Clients filed | 2 |
| Manual hours per filing (before) | ~2 hours per client |
| Agent time per filing (after) | ~10–15 minutes, mostly waiting on the portal |
| Late filings since deployment | 0 |
| ARNs issued | 2 (kept private) |
| WhatsApp messages the CA had to type to approve a filing | 1 (literally one 👍) |

The two filings that have gone through include one with **152 B2B invoices uploaded as a JSON batch** and another with a mixed B2B + B2C return where the agent had to update Table 7, Table 12 on the B2C HSN tab, and recalculate the totals after the CA team sent updated Tally figures mid-flight. The agent handled the data update, regenerated the summary, downloaded the new PDF, and re-shared it to the WhatsApp group for re-approval. None of that required a human touching the browser.

## The Three Things Nobody Tells You About GST Automation

A few hard-won lessons, for the GST automation curious:

**1. The portal lies about its state.** A "saved" record is not always a "processed" record. A "processed" record on the screen is not always reflected in the summary until you click Generate Summary again. A summary that says "Ready to File" can revert to "Not Filed" silently if you edit any underlying record. Your agent has to know the difference between what the portal *says* is happening and what is *actually* happening.

**2. Sessions die. Server work doesn't.** GST portal sessions time out after about 15 minutes of inactivity. But if you've kicked off a JSON upload or a summary generation, *the server keeps working* even after your session is gone. The right move is to log back in 5 minutes later and check status, not to assume your work is lost. This single insight saves a lot of debugging.

**3. HSN codes are a minefield.** The portal's HSN search dropdown is the only valid way to add an HSN — you can't type one manually. And the codes the SOPs and tutorials list are not always the codes the portal accepts. *(For example: "998625" for insurance surveyor services does not exist in the portal's database. The actual code is "997162" — Insurance claims adjustment services.)* If you're building anything in this space, treat the HSN dropdown as the source of truth and not whatever Excel sheet your input data came from.

## The Stuff I'm Keeping To Myself

I've laid out the architecture, the flow, the lessons. But there are three or four moves in this system that I'm deliberately not detailing:

- **How the captcha gets solved** — mentioned, not detailed
- **How the agent handles re-authentication mid-flight without losing in-progress state**
- **How the JSON upload schema for bulk B2B was reverse-engineered** (the official documentation is, charitably, vague)
- **How the WhatsApp approval gate is wired to the filing trigger**

These are the parts that took the longest to figure out and that, frankly, are what makes the system actually work in production instead of being a toy demo. **I'm not writing those bits up on the internet, and — to be very direct — I'm also not teaching anybody how I did them, paid or otherwise.** Some sauce stays in the kitchen. This one stays with me.

## Why This Matters

The obvious win here is hours saved. A CA firm that spends four to six hours a month per client on GSTR-1 data entry, summary review, and filing logistics gets that time back. For six clients, that's somewhere between 24 and 36 hours a month — almost a full work-week — recovered.

But the deeper win is something I keep coming back to in this kind of work: **the agent doesn't get tired, doesn't forget, doesn't take leave the day before a deadline.** It runs the same sequence every time. It logs every action. It waits patiently for the portal to do its thing, retries when it needs to, and never loses track of which client it's working on.

For a firm that lives or dies on responsiveness and accuracy, that's the real product. The time savings are nice. The "I-don't-have-to-think-about-this-anymore" feeling is the actual product.

## What's Next

Four more GSTR-1 filings to go this month — including the coaching institute, which is going to be the most interesting filing of the lot because it touches almost every table in GSTR-1 (exports, exempt, advances, RCM, the works). The whole pipeline is now wired up to a **cron job** that runs on its own schedule, picks up clients in order, and works through the queue. The remaining four will be done soon, without anybody opening a browser tab.

In parallel, the **income tax notice checker** that's already been running daily for 13 client accounts is about to scale up *significantly*. The next push adds **another 209 clients** to the daily monitoring loop — going from 13 logins a day to 222. The agent doesn't care. It runs the same sequence either way, and 222 portal logins is still going to come in well under the time it would take a human to do *one*.

Then GSTR-3B, which is the *summary* return that pulls from GSTR-1 and is a whole separate dance with payment offsets, ITC utilization, and challan creation if there's a cash shortfall. After that: GSTR-9 annual returns. TDS. MCA filings. The whole compliance suite. Each of these is the same shape — a portal, a form, a deadline, a human who'd rather be doing literally anything else. Each of them can be automated. Each of them *should* be automated.

There's a long, long way to go. But this — *filing real returns for real clients, end-to-end, with zero human clicks between approval and ARN* — is a huge milestone. I'll keep posts like this coming whenever I feel like writing one. No schedule, no series, no content calendar. Just the work, and the occasional dispatch from the trenches.

If you run a CA firm in India and you're still doing this stuff by hand, that is — and I say this with love — a choice. It's costing you hours every week, it's costing you the energy your team could be putting into actual advisory work, and it's costing you the one filing you'll inevitably miss the month one of your seniors is on leave.

There's a better way. I've been building it.

## The Market Has Spoken

Here's the thing. I didn't build this on a hunch.

Over the last few weeks, I've automated income tax notice retrieval for 13 client accounts at the same firm. I've automated GSTR-1 filing for 6 clients (2 done, 4 in flight). The conversations I've had with the partners — and with other CA firms who've heard about it through the grapevine — have made one thing very clear: **the demand is real, the pain is real, and the opportunity is real.**

This isn't a "would be nice if someone built this" market. This is a "we will pay you good money to make this go away" market. CAs in India spend an enormous fraction of their working hours on what is, fundamentally, a glorified data-entry-and-clicking job. Every minute of that is a minute they're not spending on actual advisory work — the kind of work that builds practices and grows revenue.

I've now seen, firsthand, that this can be automated end-to-end. Real returns, real ARNs, real CAs reacting with hearts on WhatsApp. The market opportunity is proven. The product-market fit is loud.

**If you're a CA firm partner, a tax practice owner, a fintech operator, or a like-minded builder thinking about this space — I'd genuinely love to talk.** Not to sell you something. To compare notes, swap war stories, and figure out what the next thing should be. There's a lot more here than just GSTR-1, and I suspect the most interesting conversations will be the ones I haven't had yet.

---

**This system is filing real GST returns for real clients in production today.** If your firm wants to stop spending the last week of every month on data entry and OTP juggling — or if you just want to talk shop — let's connect.

<a href="/contact" class="btn">Book a free discovery call</a>
