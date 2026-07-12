---
layout: post
title: "The System That Files GST Returns for a CA Firm — And Why I'm Open-Sourcing It"
date: 2026-07-12
tag: GST HUNTER
category: AUTOMATION
cat_label: "AUTOMATION / TAX"
featured: true
hero_excerpt: "I've spent four months building a system that runs a CA firm's entire monthly GST cycle on the live portal — GSTR-1, IMS, 2B, 3B, challan, filing — and pauses only twice, for a human. It works. So here's the plan: a controlled pilot with ten CA firms, and then, by the end of next month, the whole thing goes 100% open source."
description: "GST Hunter is an end-to-end system that runs the monthly GST cycle for a CA firm on the live GST portal — no GSP, no API, just the real portal, driven properly. Four months of building and iterating later, it's ready: a controlled pilot for ten CA firms, and a full open-source release by the end of August."
keywords: "GST automation India open source, GST filing software CA firm, GSTR-1 GSTR-3B automation, IMS GSTR-2B reconciliation tool, open source GST filing system, chartered accountant AI automation India, GST portal automation Playwright, CA firm compliance software pilot"
---

Four months ago I wrote a script that filed one GSTR-1 for one client of one CA firm in Calicut. It worked, which was gratifying, and it was also completely useless, which was instructive. A CA firm does not have one client. It has dozens, each with their own quirks, and a calendar that comes back around on the 11th, the 14th and the 20th of every single month for the rest of time.

The gap between "I automated a filing" and "I automated the filing of returns" is the entire job. It took four months. It's done.

The system is called **GST Hunter**. It runs a CA firm's complete monthly GST cycle — GSTR-1, then IMS and GSTR-2B, then GSTR-3B, then the challan, then the filing — directly on the live GST portal. No GSP. No API. No middleman reselling you access to a government service you already have access to. It logs in like a person, works like a machine, and stops in exactly two places to ask a human for permission.

And now the part I've been sitting on for a few weeks:

**By the end of next month, I'm open-sourcing all of it.** The engine, the dashboard, the tax logic, the portal choreography, the four months of scar tissue. All of it, in public, free.

Before that, a controlled pilot with **ten CA firms**. More on both at the bottom. First, let me show you the thing, because "I built a GST tool" is a sentence that has been used to describe some truly indefensible software, and I'd like to earn the benefit of the doubt.

## What the Monthly Cycle Actually Is

For the GST-curious, and for the CAs who have to live it: every GST-registered business in India runs the same three-act play every month, on the clock.

**Act one — GSTR-1, due the 11th.** You declare every sale you made. Invoice by invoice, party by party, with HSN codes and document series and credit notes. This is a _declaration_. It's what you tell the government.

**Act two — IMS and GSTR-2B, from the 14th.** Your suppliers have declared _their_ sales, and the ones they made to you are now sitting in your Invoice Management System waiting to be accepted, rejected, or held. Only what you accept becomes input tax credit. Get this wrong and you're either claiming credit you're not owed, or throwing away credit you are.

**Act three — GSTR-3B, due the 20th.** The summary return. Liability from act one, credit from act two, reverse charge on top, offsets applied, and whatever's left is _cash_ — a challan, a bank payment, a filing with an OTP. This is a _payment_. This is where the money actually moves.

Three acts. Three deadlines. Every month. Multiply by the client roster.

The work is not intellectually hard. That's precisely the problem. It's a large volume of exacting, unforgiving, deadline-bound clicking, performed by people who spent years qualifying for something considerably more interesting, and a single fat-fingered figure in act three turns into a departmental notice in act four.

## The Shape of the Thing

GST Hunter has two halves that never speak to each other directly.

**The engine** does the portal work. It logs in as the client — and yes, that includes the captcha, which it solves by asking for the audio version and running it through a local speech model, because the GST portal's captcha is one of the great ongoing arguments against human civilisation. It reads the client's sales register, builds the return, uploads it, fills the online tables the offline JSON refuses to accept, generates the summary, pulls the draft PDF off the portal, computes the tax, creates the challan, and files with EVC.

**The dashboard** is the only channel to the CA team. Not WhatsApp. Not a Telegram group. Not a spreadsheet someone forgot to update. One screen, where the work shows up, gets approved, and gets filed.

Between them: a database, and two gates that no amount of clever engineering is allowed to remove.

**Gate one: a CA approves the draft.** The engine will prepare a return all the way to the edge of the cliff and then stop dead. A human reads the summary, looks at the figures, and says yes. Nothing gets filed on a machine's say-so.

**Gate two: the EVC OTP.** The portal sends a one-time code to the authorised signatory. That's a legal signature. It belongs to a person, it stays with a person, and the machine waits for it.

Everything in between — and it's a _lot_ of in between — happens on its own.

## The Board

This is what the firm sees when they open it on the 11th, or the 14th, or the 20th, which are the only three days they need to care about.

![The Board — a per-client, per-return status grid for the month's GST cycle, with a "Needs you now" lane of cards at the top showing which returns are waiting on a human](/assets/img/gst-hunter-board.png)

The top lane is called **"Needs you now,"** and it is the entire design philosophy of the product compressed into one row of cards. Not "here is everything happening." Not a wall of green ticks congratulating you on work that a computer did. Just: _of the twenty-four returns in flight this month, these four are waiting on you, and here's exactly what each one wants._

One is ready for approval. One is staged to file and needs the OTP. One needs a judgement call the system refuses to guess at. One the CA parked on hold with a note. Everything else is on track, and the board says so and then shuts up about it.

Below that, the full grid: every client, every return, every status. A return that's blocked says it's blocked, and says why. This matters more than it sounds like it should, because the single most dangerous thing a compliance tool can do is report a job as done when it isn't. A false all-clear is worse than a loud, ugly failure. The board is built to be loud and ugly when it needs to be.

## Every Client, Every Return

![The Clients screen — a card per client showing GSTR-1, IMS + 2B and GSTR-3B status side by side, with search and an "Add client" action](/assets/img/gst-hunter-clients.png)

Three chips per client, one per act. Filed, filed, needs your input. Filed, filed, waiting on payment. At a glance, across the whole roster, the question every CA asks fifty times a month — _where are we?_ — answered without opening a single spreadsheet.

## The Knowledge Base — Where the Firm Teaches the Machine

This is the screen I'm proudest of, and it's the one that separates this from a macro that clicks buttons.

![The Knowledge & Context screen — proposed rules awaiting CA confirmation at the top, then firm-wide rules, then per-client knowledge and context items](/assets/img/gst-hunter-knowledge.png)

Every CA firm runs on institutional knowledge that has never been written down. This client's landlord isn't registered, so rent goes through reverse charge. That client's cess credit is stuck and must never be offset. This one's exports go under a LUT with zero tax. That one's marketplace sales need splitting by TCS before you can even start drafting. None of that is in the GST Act. All of it lives in a senior partner's head, and gets re-explained to a junior every March.

In GST Hunter, it's **data**. The CA types the quirk in once, in plain English, and the system applies it — that month, and every month after, forever.

And it works in the other direction too. When the system spots a pattern in the CA's notes, it **proposes** a rule and asks for confirmation. It does not apply it. It sits there, politely, at the top of the screen, with a Confirm button and a Dismiss button, and it changes precisely nothing until a qualified human clicks one of them.

That's the pattern throughout: the machine can propose, prepare, compute, and stage. It cannot decide.

## Every Action, Logged

![The History & Audit screen — a timestamped log of every action, figure and approval, filterable by client and period](/assets/img/gst-hunter-history-audit.png)

Every draft built. Every figure computed. Every OTP generated. Every approval, with a name and a timestamp against it. When the department asks a question about a return eighteen months from now — and occasionally they do — the answer isn't archaeology through a WhatsApp thread. It's a row in a table.

For a CA firm, this isn't a nice-to-have feature. It's professional liability insurance with a search box.

## The Tax Maths Is Not AI. On Purpose.

I want to be very direct about this, because it's the question every CA asks in the first five minutes and they are completely right to ask it.

**No language model computes a single rupee of tax in this system.**

The figures are produced by deterministic code, to the paise, and then checked against a reconciliation gate that refuses to let a return proceed if the numbers don't tie out. It's boring, auditable arithmetic — the kind you can read, test, and prove.

The AI does the parts that are genuinely fuzzy: reading a sales register that arrives in whatever shape the client's accountant felt like that morning, making sense of a Shopify export or a stack of commission invoices, understanding a CA's typed note well enough to turn it into a structured rule. Interpretation, in other words. Not arithmetic.

An LLM that hallucinates a plausible-looking summary is an inconvenience. An LLM that hallucinates a plausible-looking tax liability is a notice, a penalty, and a very bad phone call. The line between those two things is the most important architectural decision in the entire build, and it is drawn in permanent ink.

## Four Months of the Portal Fighting Back

The honest version of this project is not a straight line. It's a long list of small, absurd discoveries, each one costing an afternoon. A representative sample:

**The quarter dropdown that defaults to now.** The Returns dashboard makes you pick a financial year, then a quarter, then a month — and the quarter box helpfully pre-fills with the _current_ quarter. Skip it and your return uploads cleanly, successfully, and into entirely the wrong period. That one hurt.

**The JSON that accepts one table and rejects another.** The offline upload format happily takes your B2B invoices and your document series, then flatly refuses the HSN summary and tells you to download a newer offline tool. There is no newer offline tool. HSN has to be typed into an online form, through an autocomplete that only responds to human-paced keystrokes. So now the system types like a human.

**The status column that always says "Error."** Upload History has a permanent column header called "Error Report." Naively check the page for the word "error" and every single upload looks like a failure. You have to read the actual status cell.

**"Proceed To File" is a substring of "Error in Proceed To File."** Check for success before you check for failure and every broken return looks like a triumph. I found this the way everyone finds this.

**The OTP has a ten-minute fuse.** Not two minutes, not forever. Miss it and you're back for a fresh one, and the portal will occasionally fail to generate the first one for no reason it's willing to share.

None of this is in any documentation. There is no documentation. Every one of these lines cost real time, and every one of them is now a permanent, tested behaviour in the codebase — which is precisely the argument for the next section.

## Where It Actually Stands

Let me be exact about what's proven and what isn't, because a blog post that oversells is a blog post you can't trust the rest of.

| | |
| --- | --- |
| **The full cycle, coded** | GSTR-1 → IMS → 2B → GSTR-3B → challan → EVC filing |
| **Live-portal filing** | Proven — real returns, real ARNs, on the real portal |
| **Tax computation** | Deterministic, paise-exact, reconciliation-gated, unit-tested |
| **The dashboard** | Complete and in production — every screen above is live software, not a mockup |
| **Human gates** | Two, permanent: CA approval, and the EVC OTP |
| **Client knowledge** | 90+ rules captured, per-client and firm-wide, applied automatically |
| **Audit trail** | Every action, figure and approval, timestamped |
| **The always-on server** | **Not yet deployed.** The code is written, tested and verified — the box just isn't racked yet. |

That last line is the one I want to be scrupulous about. Today the engine runs on demand rather than on a cron on a server in Mumbai, and moving it there is the next step, not a hypothetical one. Everything it will do on that server, it already does — tested and verified, end to end. What's missing is a machine, not a capability.

I could have quietly not mentioned that. But the entire pitch of this thing is that it tells you the truth about what it has and hasn't done, and a tool like that doesn't get to be built by someone who rounds up in his own blog posts.

## The Headline: This Is All Going Open Source

**By the end of August, GST Hunter goes 100% open source.** The whole repository. The engine, the portal choreography, the deterministic tax logic, the dashboard, the schema, the tests, and every last one of those absurd portal gotchas encoded as working code.

Free. Public. Yours.

I've thought about this a lot and I keep landing in the same place. Here's the reasoning.

**Compliance infrastructure shouldn't be a moat.** Filing a GSTR-3B correctly is not a competitive advantage. It's a floor. Every CA firm in India is doing the same dance against the same hostile portal, and every one of them is separately rediscovering that the quarter dropdown defaults to the current quarter. That is a stupendous, nationwide waste of human hours, and it is fixed by publishing the code once.

**The knowledge is the point, and it compounds.** Four months of portal reverse-engineering is genuinely valuable and genuinely perishable — the portal changes, and a closed system rots the moment I get bored of it. In the open, when GSTN changes a selector, whoever hits it first fixes it for everyone. That's not charity. That's the only architecture that survives.

**Trust requires the source.** I'm asking CA firms to let software drive their clients' filings, with real money and real liability on the line. "Trust me, the tax maths is deterministic" is a claim. A repository you can read, audit, and hand to your own developer is a _fact_. If I want firms to believe there's no language model quietly inventing a liability figure, the honest move is to let them look.

**And frankly, the thing that's hard to copy isn't the code.** It's the four months. It's knowing which of the portal's eleven lies to believe. Publishing the code doesn't give that away — it gives away the _outcome_ of it, which is the entire point of publishing anything.

So: end of August. I'll post the repository link here and on LinkedIn when it's up.

## Before That: A Pilot. Ten Firms.

Open-sourcing something that files real returns for real money is a serious act, and I'm not going to do it off the back of one firm's happy experience, however good that experience has been.

So before the code goes public, I'm running a **controlled pilot with ten CA firms.**

Here's the honest deal, stated plainly:

**What you get.** The full system, running your monthly GST cycle end to end — GSTR-1, IMS and 2B, GSTR-3B, challan, filing. The dashboard you've seen above. Your firm's knowledge captured as rules. A complete audit trail. And me, personally, in the trenches with you for your first cycles, because the first cycle is where the surprises live.

**What I get.** Your edge cases. Every firm has clients that break assumptions — an exporter, a marketplace seller, a fully exempt trust, a landlord who never registered, a client whose "sales register" is a photograph of a notebook. Ten firms is enough variety to make the open-source release genuinely robust instead of narrowly tuned to one practice in Calicut.

**What it costs.** Founding-partner terms, and we'll talk about it like adults. I'm optimising for the right ten firms, not the highest ten bids.

**What I need from you.** A real roster, a real cycle, and a real willingness to tell me when something is wrong. I want the firms who'll send me an annoyed message at 9pm on the 19th, not the ones who'll politely say it's fine.

The gates stay where they are, by the way. Your CA approves every draft. Your signatory holds every OTP. The system does the clicking; your firm does the deciding. That's not a limitation I'm working around — it's the design, and it isn't moving.

## If You Run a CA Firm

I've written this same closing paragraph three times now across three posts, and every time it's been a little less theoretical than the last.

The GST portal is not going to improve. The captcha is not going to get kinder. The state machine will keep getting stuck in ways its own helpdesk cannot explain. The 20th will keep arriving, and it will keep arriving on a Sunday roughly a quarter of the time.

But nobody at your firm has to keep clicking through it. That part is solved. It has been running against real returns, on real deadlines, with real money moving, and by the end of next month you'll be able to read every line of how.

If you want one of the ten pilot slots — or you just want to poke holes in the architecture, which is a perfectly good reason to get in touch — [let's talk](/contact). No pitch. Just a conversation.

---

**I build AI systems that do the real, unglamorous compliance work CA firms do by hand today.** GST Hunter is going open source at the end of August; ten pilot firms get it running first, with me in the trenches.

[Book a free discovery call](/contact)
