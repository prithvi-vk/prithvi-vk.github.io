---
layout: page
title: Blog
subtitle: Notes on AI automation, agentic workflows, and building systems that work.
permalink: /blog/
---

<ul class="post-list">
  {% for post in site.posts %}
  <li class="post-item">
    <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
    <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 160 }}</p>
  </li>
  {% endfor %}
</ul>
