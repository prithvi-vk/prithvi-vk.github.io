---
layout: post
title: "How This Site Got Its Brutalist Glow-Up"
date: 2026-06-11
tag: REDESIGN
category: BUILD
cat_label: "BUILD / DESIGN"
hero_excerpt: "I wanted a terminal-themed brutalist look: a spinning wireframe globe, a yellow that means business, and one cache bug that nearly won."
description: "I wanted a terminal-themed brutalist look: a spinning wireframe globe, a yellow that means business, and one cache bug that nearly won. Here's how I redesigned prithvi.world, and what fought back."
keywords: "brutalist web design, terminal UI design, monospace website, JetBrains Mono, canvas wireframe globe, Jekyll redesign, cache busting, responsive web design, building in public, non-technical builder, AI-assisted web design"
---

The old prithvi.world was fine. That was the problem. Tidy, blue-linked, forgettable, the dark portfolio everyone already has. Now, I'm not a developer. I'm just someone who likes making things and holds strong, possibly unreasonable opinions about fonts. So I designed something with a pulse instead, a brutalist, terminal-flavoured look, and set out to see how far I could push it in a single day.

## A look with opinions

The whole thing is monospace now (JetBrains Mono), set on a near-black canvas with one loud, decisive yellow. The rules are strict and I grew to love them: no rounded corners, no gradients, nothing soft. Red gets exactly one job, telling you something is live or hovered, and it is not allowed to do anything else. It's a design with opinions, which beats a design with none.

## A globe that does not need to be there

The homepage is a wireframe Earth with little satellites orbiting it, and each satellite is one of these posts. Hover one and it decodes the transmission into a readout panel. There's no 3D library under the hood, just some trigonometry and a 2D canvas redrawing itself sixty times a second. It has absolutely no business being on a personal blog, which is precisely why it stayed.

## The bug that nearly won

I shipped it, opened the live site, and every button was green. Bright, confident, completely wrong green. The browser had quietly cached the old stylesheet under the same filename and refused to give it up, so: new page, old paint. The fix was boring (stamp a version onto the asset URLs) and the lesson was ancient: caching is the hard problem hiding behind every easy one.

## The part everyone forgets

On desktop it looked sharp. On a phone it looked like a ransom note. The menu ran off the edge of the screen, the headline hid behind the globe, and the booking calendar cheerfully tried to be 320 pixels wide inside a 280 pixel box. One responsive pass later it stacks, it breathes, and the globe politely steps aside for the words.

## I designed it. I did not code it.

Here's the honest bit, and I won't pretend otherwise: I don't write code. I designed the whole thing, then described it out loud while an AI wrote the layouts, the globe, and the CSS. I played director, reviewing, steering, and occasionally saying "no, the other yellow." Turns out you don't need to be technical to build the thing you can clearly picture. You just need taste, an opinion, and a little stubbornness.

If you're reading this on the new site, it worked. If the buttons look green, refresh.
