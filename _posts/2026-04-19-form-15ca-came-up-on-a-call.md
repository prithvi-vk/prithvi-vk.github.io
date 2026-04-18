---
layout: post
title: "Form 15CA Came Up on a Call This Week"
date: 2026-04-19
description: "A well-reputed senior CA mentioned Form 15CA in passing on a call this week. I'd never heard of it. A few days later, there's a working agent that files it end to end — and a broader pattern forming across Indian tax compliance."
keywords: "Form 15CA automation, foreign remittance India, Section 195, Form 15CB, CA firm automation, Income Tax portal automation, chartered accountant India, tax compliance agent"
---

Earlier this week I was on a call with a well-reputed senior CA. At some point the topic drifted to Form 15CA — which, until that moment, I'd never heard of.

Here's the gist: every time one of their clients wants to pay a foreign vendor — SaaS subscriptions, consultants, freight, royalty, commission, anything chargeable to tax under Section 195 — a form has to be filed with the Income Tax department *before* the wire can leave. The bank won't process the remittance without the acknowledgement number from that form. Above a certain annual threshold per recipient, a second form, Form 15CB, joins in.

Their firm handles a steady stream of these every year across the client base. A careful filing takes 15 to 20 minutes on the portal, and the work sits almost entirely with juniors.

That stayed with me, so I opened the portal.

## What the form actually looks like

Four sections. 44 fields. Eight to twelve dropdowns, several of them cascading. A date picker that refuses to accept typed input. A 15-minute session timer that silently logs the user out mid-form. An "in-progress drafts" tab that shows a count of saved drafts but will not open any of them — a reproducible portal bug that means when a junior's session dies, they refile from field one.

This is not advisory work. It is paying Indian CA salaries to fight an Angular SPA.

## What I've put together

An agent that opens the portal, walks the form in order, handles every cascading dropdown and date picker, pulls the preview PDF, and parks at e-Verify.

In test runs, end to end: under three minutes per filing. The human signs off at the end.

A working proof of concept, tested against the real portal.

## The bigger picture

This sits alongside the other CA work I've been automating. I spent much of the past week on GSTR-3B, and the flow is now automated end to end. That puts the entire monthly GST filing process at about 95% done. I wrote about the earlier piece, GSTR-1, [here](https://prithvi-vk.github.io/blog/automating-gstr1-filing-ca-firm-kerala/).

The pattern that keeps showing up: CA firms carry a lot of this kind of work inside otherwise high-value client relationships. Not all of it has to stay manual.
