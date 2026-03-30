---
layout: default
title: Home
description: "Prithvi VK — AI Automation Consultant specializing in agentic workflows, browser automation, and compliance automation for CA firms and SMBs in India."
---

<div class="hero">
  <p class="hero-label">AI Automation Consultant</p>
  <h1>I build AI agents that eliminate your team's most repetitive work.</h1>
  <p>From government portal monitoring to WhatsApp delivery — I design and deploy agentic workflows that run autonomously, so your people can focus on work that actually needs a human brain.</p>
  <a href="/contact" class="btn">Book a free discovery call</a>
  <a href="/blog" class="btn btn-outline">Read the blog</a>
</div>

<div class="section">
  <div class="featured-banner">
    <p class="featured-label">Building in Public</p>
    <h3><a href="/blog/building-in-public-ca-automation-series/">I'm building a full AI compliance system for a CA firm — and documenting every step here.</a></h3>
    <p class="featured-desc">Portal monitoring, notice retrieval, deadline tracking, client communication — all automated. Follow the series as I ship each component.</p>
  </div>
</div>

<div class="section">
  <h2 class="section-title">Latest Posts</h2>
  <ul class="post-list">
    {% for post in site.posts limit:6 %}
    <li class="post-item">
      <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 160 }}</p>
    </li>
    {% endfor %}
  </ul>
</div>
