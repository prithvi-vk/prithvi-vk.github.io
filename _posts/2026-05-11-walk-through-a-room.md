---
layout: post
title: "Turning a Room Into a Website You Can Walk Through"
date: 2026-05-11
description: "Saw a reel one morning, tried it before lunch, posting by evening: your phone can turn a room into something you walk around inside on a webpage — it's called Gaussian splatting. Here's what it is, what a good one looks like, and how anyone can make one in about ten minutes."
keywords: "Gaussian splatting, 3D room scan, scan a room with phone, Scaniverse, Luma AI, SuperSplat, photogrammetry, interactive 3D walkthrough, 3D virtual tour real estate, Gaussian splat tutorial India"
---

Saw a reel one morning. Tried the thing it showed before lunch. It's evening and I'm writing this. That's the whole backstory.

The thing: your phone can turn a room into something you _walk around inside_ — on a webpage, with your mouse. It's called **Gaussian splatting**. I tried it on my own room; that one's staying private (you really don't need a 3D tour of my laundry pile), but here's what it is, what a good one looks like, and how you — or I, for you — can make one.

## What even _is_ "Gaussian splatting"?

Until recently there were two ways to make 3D on a computer. **Polygons** — the LEGO-brick approach, triangles and textures, what games and films use. Looks great; takes an artist weeks. And **photogrammetry** — you feed a computer a couple hundred photos and get a soft, melty mesh back. Faster, less pretty.

Gaussian splatting — a 2023 research idea now living inside free phone apps — is a third way. Your scene is made of **millions of tiny, fuzzy, coloured blobs floating in 3D space** — "splats." Squint and they blur together into something that looks photoreal _from every angle_. It runs at 60fps in a browser, and the files are small enough to email.

It isn't magic — it's maths fed by photos — so the photos have to be decent. But "decent" is now a ten-minute job, not a film shoot.

## Why would anyone want this?

"Come see the space" is expensive; "here are 12 photos" is flat. A splat is the in-between: a real place, captured once, that anyone can wander through from their couch. Estate agents, Airbnb hosts, wedding venues, restaurants, showrooms, museums — anywhere "show, don't tell" beats a photo gallery. So you can do this yourself — or, if you'd rather not, I can set it up for you and hand you a link to drop on any website.

## The recipe (genuinely ~10 minutes)

1. **Grab a free app** — Scaniverse (iOS/Android, by Niantic, no account, processes on the phone itself) or Luma AI (cloud-based).
2. **New scan → "Splat" mode → room-size preset.**
3. **Walk the room slowly, painting every surface.** The app draws a glowing wireframe over everything it's "seen." Do three loops — knee height, eye level, high looking down — and get the corners and behind the furniture. Smooth, continuous motion; no stop-and-snap. _(A lived-in, well-lit room scans better than a staged-empty one.)_

   ![A phone screen mid-scan — a shimmering white wireframe overlaid on a wooden wardrobe and a black cabinet](/assets/img/splat-scan-wireframe-1.png)
   _Mid-scan. That shimmering wireframe is the app keeping track of what it's captured. Keep moving until the whole room is painted in._

   ![Another mid-scan view — wireframe overlaid on a brick wall with a round mirror](/assets/img/splat-scan-wireframe-2.png)
   _More of the same — slow, overlapping passes, every angle._

4. **Tap Done.** It processes for a minute or two:

   ![A processing screen showing the room as a colourful, abstract sculptural blob, with an "Uploading" progress ring](/assets/img/splat-processing.png)
   _Briefly, your room looks like abstract art. That's just the processing step — totally normal._

5. **Tidy it up** (free, in your browser) with SuperSplat — crop away the stray bits, done. Fun fact: SuperSplat is open source — [github.com/playcanvas/supersplat](https://github.com/playcanvas/supersplat).
6. **Share or embed** the link.

No rig, no render farm, no degree.

## So how did mine turn out?

I shot my room in about two minutes, in so-so light, and got back something recognisably _a room_ — just a soft, dim, first-try one — so I'm keeping that one to myself. But it taught me the single thing worth knowing here: **a great splat is almost entirely about the capture.** Light, patience, coverage. A real camera helps; technique helps more.

## What "good" actually looks like

Here's the _exact same technology_ in skilled hands — "2508 Paramount House," captured by cameroncone, who built it specifically as a real-estate proof-of-concept. Real camera, careful lighting, hours of patience:

![A bright modern open-plan kitchen and living room rendered as a Gaussian splat — marble waterfall island, designer bar stools, warm pendant lights, cream sofas, plants, art on the walls](/assets/img/splat-paramount-house.png)

👉 **[Walk through a few of these yourself →](/walkthrough/)** — drag to look around, WASD to move. (Opens an interactive demo page; it's a little heavy, so it gets its own room.)

That gap — between a two-minute phone scan and that house — _is the whole story._ The tech is democratised; the craft is catching up fast.

## Want one?

Got a space worth showing off — a room, a studio, a shop, a property, a venue? Two options: **DIY it** with the recipe above (genuinely a lunch-break job), or **have me do it** — I'll capture it properly, tidy it up, and hand you an embeddable link that works on any website.

3D used to be something you watched in a cinema. Now it's something you can make on the bus home. Go scan something — maybe close the blinds first.
