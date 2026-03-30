---
layout: default
title: Home
---

<div class="hero">
  <p class="hero-label">AI Automation Consultant</p>
  <h1>I build agentic workflows that run your business on autopilot.</h1>
  <p>I help small and medium businesses automate repetitive work using Claude Code, AI agents, and intelligent workflow orchestration — so you can focus on what matters.</p>
  <a href="/contact" class="btn">Work with me</a>
  <a href="/blog" class="btn btn-outline">Read the blog</a>
</div>

<div class="section">
  <h2 class="section-title">Latest Posts</h2>
  <ul class="post-list">
    {% for post in site.posts limit:3 %}
    <li class="post-item">
      <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 140 }}</p>
    </li>
    {% endfor %}
  </ul>
</div>
