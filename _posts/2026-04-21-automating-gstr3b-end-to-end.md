---
layout: post
title: "The Return That Moves Real Money: Automating GSTR-3B End-to-End"
date: 2026-04-21
tag: GSTR-3B
category: AUTOMATION
cat_label: "AUTOMATION / TAX"
featured: true
hero_excerpt: "If GSTR-1 is the loud, frantic front-of-house, then GSTR-3B is the quiet one, the return that actually moves real money."
description: "GSTR-1 is a declaration. GSTR-3B is a payment. Here's how I built an AI agent that handles the whole GSTR-2B → GSTR-3B → challan → EVC filing flow end-to-end for a CA firm, and what it took to push real money through India's GST portal without a human touching the browser."
keywords: "GSTR-3B automation India, GSTR-2B IMS reconciliation, GST portal automation CA firm, automated GST filing EVC, reverse charge mechanism RCM rent, challan generation GST portal, CA firm AI agent India, chartered accountant compliance automation"
---

If GSTR-1 is the loud, frantic front-of-house — invoices, tight monthly deadlines, a credit note here, a netting-off dance there — then GSTR-3B is the quiet room in the back where the real money actually moves.

Every month, on a deadline the government likes to nudge around a few days in either direction, every GST-registered business in India has to file a summary return that says, in effect: _here is what we owed the government, here is the input credit we're claiming against it, here is the cash we're putting in, please acknowledge it, please don't come knocking._ It is the return that triggers actual payments out of actual bank accounts. Get the numbers wrong and you're in a world of notice, interest, and audit. Get them right and nobody ever thinks about you again. The ideal outcome of a GSTR-3B filing is _silence._

For the CA firm I've been working with, the cycle is a familiar grind: a handful of clients, each with their own GSTIN, each with their own policy quirks, all with a common deadline that shifts a day or two every cycle. Over a few days this month, I built an agent that took several of those filings end-to-end on its own. Real money left the clients' bank accounts. Real ARNs landed on the portal. Real filed PDFs got emailed back to the firm's team with a thank-you note.

This is how that came together, what broke in the middle, and what I'm taking home from the trenches.

## What Actually Is GSTR-3B

For the GST-curious: GSTR-3B is the summary return that every registered business files monthly. It pulls outward-supply numbers from GSTR-1 (which I've written about [before](/blog/automating-gstr1-filing-ca-firm-kerala/)), layers in input tax credit from GSTR-2B (which we'll get to in a minute), adjusts for reverse-charge liabilities, computes a net tax payable, and triggers a payment flow that moves cash from the client's bank into the government's electronic ledger.

In other words: GSTR-1 is a _declaration._ GSTR-3B is a _payment._

That distinction matters, because filing GSTR-3B wrong doesn't just cost you a late fee — it can lock up money, screw up your input credit trail for months to come, and in extreme cases, invite a tax officer to your office with a notebook and a lot of questions.

It also means the approval gates are different. For GSTR-1, the CA reviews a summary, types 👍, and the agent files. For GSTR-3B, there are _two_ approval gates — one before the filing even gets staged, and one at the very end — and I'll walk through both.

## The Shape of the Thing

Before the agent can file GSTR-3B, it has to do four things in sequence. I'll describe them in plain English; the technical dirt is further down.

**First, IMS.** The Invoice Management System is a dashboard that every GSTR-2B flows through first. When a supplier files their GSTR-1, the invoices they've raised on you show up in your IMS as "No Action," waiting for you to accept them, reject them, or keep them pending. Only accepted (or deemed-accepted) invoices feed into your 2B, and only the 2B's input credit can be claimed in your 3B. If the IMS isn't clean, the 3B is wrong.

**Second, the 2B itself.** Once IMS is actioned, you click Compute GSTR-2B, wait a minute, and the portal crystallises your input tax credit for the month — split across imports, reverse charge, B2B purchases, and ineligible ITC. This is the number that flows into Table 4 of your 3B.

**Third, the 3B itself.** Six tables, some auto-filled from GSTR-1 and GSTR-2B, some that need manual entry — the most interesting of which is Table 3.1(d) for inward supplies liable to reverse charge. More on that in a bit.

**Fourth, the payment.** The portal calculates a net tax payable after ITC offset, generates a challan, and sends you out to your bank's net-banking portal to actually move the money. Only after the payment shows up in the Electronic Cash Ledger can you click "Proceed to File" and submit the return via EVC.

Each of those four steps has its own failure modes, its own approval gate, and its own way of telling you the work is done when it very much isn't.

## The IMS Reconciliation Gate

Here's the thing about accepting invoices in IMS: **you can't just accept everything.** Your supplier raised an invoice on you, the invoice is in your 2B, and the input credit is yours to claim — _but only if the invoice is real._

In practice, suppliers make mistakes. A hotel books a wedding party under the wrong GSTIN. A mutual fund's ops team pushes a reversal invoice a month late. A rent receipt gets issued to the wrong tenant. These invoices end up in your IMS, and if you accept them without verifying, you've just claimed input credit against invoices that have nothing to do with you — which the GST department will absolutely notice, and which your CA will absolutely not appreciate.

So there's a reconciliation step. Before the agent accepts anything in IMS, it drafts an email to the client's accounts team:

> _Here are the invoices in your IMS for the current return period. Please confirm which of these you actually received, which are duplicates, and which should be kept pending._

The accounts team writes back — sometimes with a clear "yes, all good," sometimes with a PDF attachment of their purchase register to cross-verify. The agent parses the reply, cross-checks each IMS line against the register, accepts matches, leaves unmatched invoices in Pending, and sends a reply in the same thread confirming what was done and what wasn't.

This is **approval gate number one**. No invoice gets accepted in IMS without the client's accounts team signing off. That's not a technical requirement — the portal will happily let you bulk-accept everything with a single checkbox — but it's a compliance hygiene thing, and the CA team insisted on it. The agent respects it.

A small but real edge case worth flagging: supplier names in the IMS portal occasionally render with inconsistent whitespace — extra spaces between words, formatting that doesn't quite match what you'd get from the same supplier's GSTIN search. If you're matching names with regex anywhere in your pipeline, build the matcher to be whitespace-tolerant from day one. I learned that one the hard way.

## The RCM on Rent Problem

One of the things that makes GSTR-3B genuinely more interesting than GSTR-1 is reverse charge mechanism (RCM) on unregistered purchases — specifically, rent paid to landlords who aren't GST-registered.

Here's how it works. If a business rents a commercial property from a landlord who's registered under GST, the landlord raises a tax invoice, charges GST, pays that GST to the government, and the tenant claims input credit through the normal 2B route. Clean.

But if the landlord _isn't_ registered — which is common for family-owned buildings with small co-ownership structures — no GST gets charged on the rent. That doesn't mean no GST is owed. Under the reverse charge mechanism, the _tenant_ has to calculate the GST themselves, pay it to the government in cash, and then claim input credit for the same amount. It's a self-invoicing dance.

Concretely, one of the firm's clients rents from a group of family co-owners who aren't GST-registered. Every month, for each of those co-owners, the client has to:

1. Generate a self-invoice for the rent
2. Calculate the applicable GST
3. Enter each invoice manually in Table 3.1(d) of GSTR-3B
4. Enter a matching input credit in Table 4(A)(3) for the same amount
5. Pay the GST in cash (it can't be offset against other ITC)
6. Claim the self-ITC back against other outward liabilities in the same return

And the bills for these come through as .docx attachments on a separate email thread each month, with one landlord per attachment, because the client's team prepares them by hand in a Word template. The agent opens those attachments, reads the figures out of the structured text, and fills the 3B tables accordingly.

_This_ is the kind of thing that nobody builds an API for. This is the kind of thing that every CA firm in India deals with manually, every month, for every client who happens to have a landlord who never bothered to register. This is exactly the kind of work the agent was built to do.

## The Filing Flow

Once IMS is clean, 2B is computed, and 3B's tables are filled, the agent moves into the filing flow itself. The choreography goes like this:

1. **Save GSTR-3B** on the summary page. The portal acknowledges: "GSTR3B details saved successfully."
2. **Preview draft PDF** — the agent downloads this, shares it to the CA's WhatsApp group, and waits for approval. This is **approval gate number two.**
3. **Proceed to Payment.** The portal computes the optimum ITC utilization automatically, shows "Additional Cash Required" per tax head, and — if cash is needed — prompts the user to create a challan.
4. **Create Challan / Generate Challan.** The agent picks E-Payment or Net Banking, selects the client's preferred bank, and hits Generate. The portal spits out a CPIN (Challan Portal Identification Number) and a PDF.
5. **Email the challan** to the client's accounts team: "Please pay the attached challan at your earliest convenience."
6. _Wait._ This is the part the agent can't control. The client — or their ops team — has to actually log into their bank and push the payment through. Sometimes this takes minutes. Sometimes it takes days. The agent polls the portal's Challan History periodically to see when the status flips from `INITIATED` to `PAID`.
7. **Once paid**, the agent logs back in, navigates to the 3B, clicks Make Payment / Post Credit to Ledger, confirms the offset, clicks Proceed to File, ticks the declaration checkbox, selects the authorised signatory from a dropdown, and clicks File GSTR-3B with EVC.
8. **OTP.** The portal sends a six-character alphanumeric OTP to the signatory's registered email and mobile. The signatory forwards it to the firm's team, who pass it to the agent; the agent fills it in and clicks Verify.
9. **ARN issued.** The portal returns a dialog saying the return has been successfully filed, with an acknowledgement reference number. The agent screenshots this, navigates to Return Dashboard, clicks Download on the filed tile, renames the PDF to something sensible, and composes a confirmation email back to the client's team with the filed PDF attached.

Several steps. Most of them automated. Three human touchpoints: approving the draft PDF, paying the challan, and supplying the OTP.

## The Adversarial Portal

Here is where I have to be honest with you: the GST portal is _actively hostile_ to automation, and in my experience of this cycle, the portal's backend is a state machine that occasionally gets stuck in a way that no amount of clever code can reason your way out of.

Several separate times over the course of one filing session, the portal returned a `System Error: Unable to load` response — the kind of full-page error with a frowny face and a "please retry" message — when the agent tried to load the Return Dashboard for one particular GSTIN. The same GSTIN that had filed successfully for the previous eleven months. The same GSTIN whose Save GSTR-3B had gone through cleanly a couple of days earlier.

The portal's own advisory, printed at the top of the page in bold red, said: _"Please wait before proceeding as the ITC Reversal and Re-claimed and RCM Liability/ITC Statement for the previous return period are still in progress. Unable to process entries in Credit Reversal and Re-claimed and RCM Liability/ITC Statement, kindly raise ticket with appropriate screenshot to resolve your issue promptly."_

Translation: _we know something is stuck on our end, we don't know when we'll fix it, please open a helpdesk ticket and wait._

With the deadline a few hours away.

Here's what turned out to work: **full logout, wait a few seconds, log back in from scratch — two or three times if needed.** I don't have a clean explanation for _why_ it works. It could be any number of things — stuck session state, the portal catching up with itself, the fact that on a filing cutoff every GSTIN in the country is hammering the same endpoints at once and the backend is simply sweating. What I do know is this: on the second or third re-login cycle, the Return Dashboard loaded cleanly, the saved 3B data reappeared in the tiles with the correct numbers, and the flow proceeded normally. That pattern — _when the portal gets stuck, try logging out and back in a few times before you try anything clever_ — went straight into the SOP for next cycle.

Similarly: **the OTP has a validity window, and it's not infinite.** Once the portal issues the OTP, you have about ten minutes to enter and verify it before it expires. Miss the window and you get `RT-3BAS1043: OTP is either expired or incorrect`, and you're back to clicking File-with-EVC for a fresh one. We got burned by this on one attempt where the handoff from the client to the firm's team took a beat longer than expected. The next OTP verified cleanly. Lesson: coordinate the OTP handoff _before_ clicking File with EVC, not after.

And there's the charming "OTP could not be generated please try again" that sometimes appears on the very first File-with-EVC click, even though everything was fine one second earlier. The fix is to dismiss the error and click File-with-EVC again. It usually works on the second try. I have no idea why. The portal, bless its heart, does not explain.

## A Filing, Walked Through

The most instructive filing of the cycle happened to be the one that went sideways. It's worth walking through because it's where the abstract flow hits the portal's reality.

Early on the filing felt normal. The challan had been paid hours earlier, the cash ledger reflected the payment, the IMS was clean, the 2B had been computed, and the 3B's numbers matched the draft the CA had approved that morning. All that was left was the actual file-with-EVC click.

Then the portal refused to load the Return Dashboard. And refused again. And again. Each attempt landed on the same System Error page, the same helpdesk-ticket advisory, the same stuck statement from the previous return period. The deadline kept closing in.

There were a few options. Raise a GSTN helpdesk ticket and wait indefinitely — not acceptable with a compliance cutoff bearing down. Manually rebuild the return from scratch and risk losing the reconciliation we'd already done. Or try the oldest move in the sysadmin's book.

A few full logout-login cycles later, the Return Dashboard loaded. The saved 3B tiles populated with the right numbers. The offset went through. The OTP cleared. The ARN appeared. The filed PDF landed in the confirmation email's attachment bar.

One filing, a few hours of intermittent panic, zero late fees. And one new line in the knowledge vault for next cycle.

## The Receipts

Here's what happened over the filing window:

| Metric | Value |
| --- | --- |
| Filings attempted | All of the eligible ones |
| Filings completed on time | All of them |
| Late filings | Zero |
| Portal System Errors encountered | Several |
| Full logout-login cycles used as a debugging tool | Several |
| OTPs that expired before verification | One (lesson learned) |
| Manual keystrokes from the CA team across the cycle | Minimal — approvals and OTPs only |
| Confirmation emails dispatched back to client teams | One per filing |

Every filed return has a corresponding filed PDF on disk, a corresponding email in Sent Mail, and a corresponding entry in the firm's tracking sheet. Every one of them is linked to the specific invoices that fed into it. Every RCM entry has the source .docx attachment archived.

If the tax department comes knocking next year — and they might, because they occasionally do — the audit trail is right there.

## The Three Things Nobody Tells You About GSTR-3B Automation

A few lessons, sharpened on this cycle's work:

**1. A "saved" return is not a "submitted" return, and a "submitted" return is not a "filed" return.** These are three distinct states in the GST portal's state machine. A saved return can be edited. A submitted return has committed its liability to the Electronic Liability Register but hasn't yet offset the cash. A filed return is final and has an ARN. The portal uses all three words loosely, and if you're writing automation against it, you need to be rigorous about which state you're actually in, because the wrong assumption will send you down a completely wrong branch of the flow.

**2. The offset is irreversible. Treat it like a commit.** When you click "Make payment / Post credit to ledger" and confirm, the portal moves cash from the Electronic Cash Ledger to the Liability Ledger and does not let you take it back. It is, in software terms, a commit. Everything up to that point is a staging area. If the numbers in your staging area are wrong, you have _one chance_ to catch it — on the Preview draft PDF, before you click Proceed to Payment. After that, you're committed. The agent's design respects this: the second human approval gate is the preview PDF, _not_ the filing itself, and the CA approves the numbers _before_ the offset happens.

**3. Logout is a valid debugging strategy.** If this blog post has a single operational takeaway, it is this: when the GST portal starts misbehaving — refusing to load, returning System Errors, showing stuck numbers, throwing helpdesk-ticket advisories at you — _log out, count to ten, log back in._ Do it twice if you have to. Do it three times if you're on a deadline. Most of the time, something unwinds and the flow picks up where it should. Before you file a ticket, before you call the helpdesk, before you accept that you're going to miss the cutoff: try logging out.

## Why This Matters

The hours-saved number is what gets people's attention, and it's real — a GSTR-3B filing that used to burn an hour or two of senior accountant time, per client, now takes a fraction of that in human attention, distributed across two approval moments and an OTP handoff. Multiply that by a client roster and a year's worth of filings and you get real money in time recovered.

But the bigger thing is that **every filing now has a written audit trail.** Every IMS decision is logged with a rationale. Every invoice accepted or kept pending has a corresponding email from the client's team confirming it. Every RCM entry links back to the specific source attachment. Every challan has a CPIN and a paid-status timestamp. Every filed return has an ARN and a filed PDF.

For a CA firm, this isn't just operational efficiency — it's professional liability insurance. When the tax department asks a question about a filing some months from now, the firm doesn't have to reconstruct the story from WhatsApp screenshots and half-remembered conversations. It's all right there, timestamped and linked.

And for the _people_ at the firm: they get to stop spending the last week of every month on clicking. They can go back to doing the advisory work they trained for, talking to clients about business strategy and tax planning and succession and the stuff that actually moves the needle. The clicking isn't a skill — it's a tax on their time that nobody's ever bothered to pay down until now.

## What's Next

A couple of things on the horizon:

**GSTR-9.** The big annual return. Pulls from every monthly 3B and every monthly 1 a business filed during the year, reconciles discrepancies, and has to be filed by every GST-registered business above a certain turnover threshold. It's once a year, it's painful, it's high-stakes, and it's a _great_ automation target. The pipeline is already wired up with everything GSTR-9 would need to consume.

**Deploying this for other CA firms.** The pipeline I've built isn't hard-coded to one firm. The logic — IMS reconciliation, 3B preparation, RCM handling, challan generation, filing via EVC, the whole dance — is the same across any practice. The variable parts are credentials, email routing, and per-client policy flags — all of which are data, not code. Over the coming months I'm actively open to rolling this out at another five to ten CA firms across India. If you run one, or know someone who does, I'd love to talk.

## If You Run a CA Firm

I've said this before and I'll say it again: if you're running a tax practice in India and you or your team are still doing this stuff by hand, there's a better way, and it's real, and it's already filing returns for real clients.

The GST portal is not going to get better. Its UI is not going to improve. Its session management is not going to become kinder. Its captcha is going to stay eight kinds of annoying, its state machine is going to keep getting stuck in ways its own helpdesk can't explain, and its OTPs are going to keep being the small, finicky gauntlet they are.

But you don't have to sit and click your way through it anymore.

If you want to compare notes, talk shop, or get a system like this running for your own firm, [let's talk](/contact). No pitch. Just a conversation.

---

**I'm building AI systems that file real returns for real CA firms in production today.** If your firm is still doing the end-of-cycle scramble by hand — or if you just want to see a demo — let's connect.

[Book a free discovery call](/contact)
