---
layout: default
title: Home
description: "Prithvi VK — AI Automation Consultant. I design and deploy agentic workflows that turn complex multi-step processes into one-click operations for businesses."
---

<div class="hero">
  <p class="hero-label">AI Automation Consultant</p>
  <h1>Turning complex workflows into competitive advantages with AI.</h1>
  <p>I design agentic systems that compress hours of multi-step processes into minutes — giving your team the leverage to focus on high-value decisions while AI handles the execution.</p>
  <a href="/contact" class="btn">Book a free discovery call</a>
  <a href="/blog" class="btn btn-outline">Read the blog</a>
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
