---
layout: post
title: "Two Hundred Logins Nobody Should Be Doing"
date: 2026-06-22
tag: AIS
category: AUTOMATION
cat_label: "AUTOMATION / TAX"
featured: true
hero_excerpt: "Before your client tells you what they earned, the government already has a receipt. Checking that receipt for two hundred clients is exactly the dull, high-stakes errand nobody should be doing by hand — so we built an agent, pointed it at the whole roster, and let it run."
description: "The Annual Information Statement is the taxman's running ledger of everything you earned. Here's an agentic workflow I built and deployed for a CA firm that logged into the income tax portal, pulled the AIS for all two hundred clients, unlocked the PDFs, read the numbers, and posted every summary back to the team over Telegram — autonomously, start to finish, and now on a schedule that runs the whole roster every month."
keywords: "AIS automation India, Annual Information Statement download automation, income tax portal automation CA firm, AIS TIS bulk download, compliance portal AIS agent, chartered accountant AI workflow India, AIS reconciliation TDS SFT, automated income tax portal login, Telegram CA workflow automation"
---

There's a particular flavour of dread that comes with filing an income tax return for someone else's money, and it goes like this: you prepare the return off what the client tells you, you file it, and three weeks later the department sends a gentle note pointing out that the client also had a fixed deposit they forgot to mention, a dividend they didn't think counted, and a property sale they were _absolutely sure_ was tax-free. None of which made it into the return.

The thing is, the department knew all along. It knew before you did. It knew before the client did, half the time.

That knowledge lives in a document called the Annual Information Statement — the AIS — and it is, functionally, the taxman's receipt for your entire financial year.

For the CA firm I've been working with, checking the AIS for every client is one of those jobs that is simultaneously non-negotiable and soul-crushing. So I built an agent to do it, pointed it at the firm's entire roster of two hundred clients, and let it run. It logged into the portal as each one, pulled their AIS, read it, and reported back — two hundred times, on its own, until the list was done. And it's no longer a one-time thing: it now runs itself every month on a schedule. This is what that looked like, why it matters more than it sounds like it should, and what the income tax portal did to make it interesting.

## What Actually Is the AIS

For the tax-curious: the Annual Information Statement is a consolidated record that the income tax department assembles about every taxpayer, pulled from everyone who ever reported a transaction against your PAN. Your bank reports the interest it paid you. Your mutual fund reports the units you bought and sold. The registrar reports the property you transferred. Whoever deducted TDS reports it. Dividends, securities trades, foreign remittances, big-ticket card spends — it all flows into one statement, sorted into tidy parts.

In plain terms: a tax return is what _you_ tell the government. The AIS is what the government has already been told about you, by everyone else.

That asymmetry is the whole game. The return a CA files has to reconcile with the AIS, because the department's computers are going to do that reconciliation automatically the moment the return lands. Any gap — income in the AIS that isn't in the return — is a flag. Flags become notices. Notices become the client calling you on a Sunday.

So before you file anything, you check the AIS. You pull it, you read it, you make sure the return you're about to submit actually squares with what the department already knows. Skip that step and you're filing blind.

## The Boring, Important Errand

Here's the catch that makes this a perfect automation target: checking one AIS is trivial. Checking two hundred of them is a job.

The firm's master list runs to roughly two hundred clients. Each one has a PAN, a password for the income tax portal, and — because the government is nothing if not committed to friction — a _second_ password for the PDF the portal hands you, because the AIS comes out of the portal encrypted.

So the by-hand version of this errand is: log into the portal as client number one. Click through the dialogs. Open the Compliance Portal, which helpfully launches in a new tab. Download the AIS. Open it, type in the PDF password. Read the numbers. Note anything that looks off. Log out. Log in as client number two. Repeat. Two hundred times.

It is not hard work. It is not skilled work. It is exactly the kind of work that quietly eats the first week of every filing season, performed by people who trained for years to do something considerably more interesting than typing passwords into a government website four hundred times.

That's the job I handed to the agent — and then walked away from while it did the whole list.

## The Shape of the Thing

The agent worked through the roster one client at a time, and for each one it ran the same loop. In plain English:

**First, it logged in.** It read the client's PAN and portal password off the master sheet and drove the income tax e-filing portal's login — including the assorted "are you sure" dialogs and the occasional "you're already logged in elsewhere, log in here" detour the portal likes to throw.

**Second, it opened the AIS.** The AIS sits behind the Compliance Portal, which the income tax site insists on opening in a brand-new browser tab. The agent waited for the tab, switched to it, and found the download button for the right financial year.

**Third, it downloaded and unlocked.** The portal hands over a password-protected PDF. The agent took the second password from the master sheet — the PDF one — and unlocked the file, saving a clean copy to a dated run folder.

**Fourth, it read.** This is the part that turns a download into a check. The agent parsed the unlocked PDF and pulled out the sections that matter: TDS and TCS, the big financial transactions (interest, dividends, mutual funds, property), tax already paid, and any refund or demand on record. If a section was empty, it said so. If it wasn't, it summarised what was there.

**Fifth, it reported — over Telegram.** This is the firm's nerve centre. The whole operation talks to the CA team through a single Telegram group: a short note when the run kicks off, then, for each client, the AIS PDF plus a tight, readable summary — name, PAN, the financial year, and the highlights — dropped straight into the group so a CA can glance at it on their phone and immediately know whether this client needs a closer look. No dashboard to check, no inbox to dig through. The work comes to them.

**Then it logged out, and moved to the next one.** Roughly three minutes per client, start to finish, two hundred times down the list, until the Telegram group held the whole roster.

## Built to Run Unattended

The run went through all two hundred on its own. I started it and walked away; it logged in, downloaded, unlocked, read, and reported its way down the entire list without a human babysitting the browser.

A few things made that possible without it turning into a runaway:

**It surfaces, it doesn't hide.** The worst outcome for a tool like this is a false all-clear — a client quietly skipped while the report implies the whole roster was covered. So the rule is the opposite: if the agent can't finish a client for any reason, that client gets flagged by name in the final summary rather than silently dropped. A done that isn't actually done is worse than a clearly marked exception.

**It paces itself.** Two hundred logins in a row is a different animal from two. The agent logs out cleanly between clients and caps the time it'll spend on any single one, so a slow or stuck session can't stall the whole run. Everything it does lands in a dated folder — every unlocked PDF, every summary, and a single log recording exactly what happened to all two hundred.

## And Now It Runs Itself

The best part isn't that it ran once. It's that it never needs me to start it again.

The whole thing is now on a schedule: it wakes up on the **5th of every month at 10am** and runs the entire roster on its own, no prompt, no kickoff, no one watching. The first the CA team hears of it is their Telegram group filling up with that month's AIS summaries, one client at a time, the way it did the first run — except now it just happens, every month, like clockwork.

That's the shape of the thing I find most satisfying. A job that used to be a week of someone's attention at the start of every cycle is now a calendar event the firm doesn't even have to remember. The 5th rolls around, the work does itself, the summaries land.

## The Quiet Superpower: Diffing Against Last Time

Here's the bit I'm fondest of, because it's the one that turns a download tool into something that actually thinks.

The AIS isn't static. It updates through the year as more reporters file. The interest figure in June isn't the interest figure in September. A dividend that wasn't there last quarter shows up this quarter. A correction gets posted. For a CA, what matters isn't just _what's in the AIS today_ — it's _what changed since I last looked._

Because the agent saves every run into a dated folder, it can compare this run against the last one for the same client. New TDS entry that wasn't there a month ago? Flagged in the Telegram summary. A transaction amount that moved? Flagged. The message doesn't just say "here's the AIS" — when there's history to compare against, it says "here's what's _different_ from last time," which is the line a busy CA actually reads.

That's the difference between a tool that fetches and a tool that watches.

## The Receipts

Here's what the run actually produced:

| Metric | Value |
| --- | --- |
| Clients on the roster | ~200 |
| Roster processed autonomously, start to finish | The full list |
| AIS pulled, unlocked, parsed, and reported | Per client, in one continuous run |
| Human keystrokes during the run | Zero |
| Time per client, end to end | ~3 minutes |
| Where every summary landed | The CA team's Telegram group |
| Anything the agent couldn't finish | Flagged by name in the final summary |
| Going forward | Runs itself on the 5th of every month at 10am |

Every client the agent touched left a paper trail: an unlocked AIS PDF in a dated folder, a written summary, a line in the run log, and a message in the Telegram group. If a question comes up about a client in October, the firm doesn't have to log back into the portal and re-pull anything — the snapshot is right there on disk, next to last month's, next to the diff between them.

And the firm's experience of the whole thing? Their phones lit up, one clean summary at a time, until the roster was done.

## Why This Matters

The time saved is the headline, and it's real. A week of senior-accountant attention spent typing passwords into a government website, recovered. Multiply by a filing season and it's not a rounding error.

But the bigger thing is the same thing it always is with this work: **the firm now has a record.** Every client's AIS is captured, dated, and summarised before a single return gets filed. The reconciliation that used to live in someone's head — _did I check whether this client's dividend is in their return?_ — now lives in a folder, timestamped, with a diff against last month attached, and a copy sitting in the Telegram group everyone can scroll back through.

That's not just faster. It's the difference between a firm that finds the missing fixed-deposit interest _before_ filing and a firm that finds out about it from a departmental notice three weeks later. One of those is a quiet afternoon. The other is a Sunday phone call and an awkward conversation about why the return has to be revised.

The AIS exists so the department can catch what you missed. This just lets the firm catch it first — across the entire roster, in a single unattended run.

## A Note on the One-Off

This one wasn't built to be a product. It's a single, sharp tool for a specific firm with a specific roster and a specific master sheet — the kind of thing that takes a couple of days to build and then quietly runs two hundred logins you never have to think about again. That's most of what this work actually is: not grand platforms, but well-aimed little machines that do one dull, important thing flawlessly so a human never has to do it again.

The income tax portal is not going to get friendlier. It's going to keep handing out encrypted PDFs with separate passwords and keep launching the AIS in a new tab for reasons known only to itself. But the firm doesn't have to click its way through two hundred of those anymore. A machine does it now, on the 5th of every month, and the results show up on Telegram while everyone gets on with their day.

## If You Run a CA Firm

If you're running a tax practice and your team still spends the front of every season logging into the portal one PAN at a time, there's a better way, and it's not theoretical — it's already pulled real statements for a real roster of two hundred, autonomously, with the summaries landing on the team's phones.

The errands are different at every firm. The AIS check, the notice sweep, the GST cycle, the reconciliation nobody enjoys — they're all the same shape underneath: dull, repetitive, high-stakes, and screaming to be handed to a machine that doesn't get bored on keystroke number four hundred.

If you want to compare notes or get something like this running for your own firm, [let's talk](/contact). No pitch. Just a conversation.

---

**I build AI systems that handle the real, unglamorous compliance work CA firms do by hand today.** If your team is still doing the season-opening scramble one login at a time — or you just want to see it run — let's connect.

[Book a free discovery call](/contact)
