---
layout: default
title: "Field Notes"
permalink: /blog/
description: "Field notes from Prithvi VK. Ideas, findings, client-system stories and the technical breakdowns behind every website, automation and tax bot I ship."
---

<div class="wrap">
  {% assign posts = site.posts %}
  {% assign latest = posts | first %}
  {% assign featured_post = posts | where: "featured", true | first %}
  {% unless featured_post %}{% assign featured_post = latest %}{% endunless %}
  {% assign fidx = 0 %}
  {% for p in posts %}{% if p.url == featured_post.url %}{% assign fidx = forloop.index %}{% endif %}{% endfor %}

  <div class="masthead">
    <div class="mh-left">
      <div class="kicker">// THE BLOG · TRANSMISSION ARCHIVE</div>
      <h1>Field<br>Notes</h1>
      <p class="tagline">Ideas, findings and client-system war stories. The breakdowns behind every site, system and tax bot I ship. Written as I build, mistakes included.</p>
    </div>
    <div class="mh-right">
      <div class="big">{{ posts | size | prepend: '0' | slice: -2, 2 }} ENTRIES</div>
      <div>INDEX_2026</div>
      <div><b>LAST SYNC</b> {{ latest.date | date: "%Y.%m.%d" }}</div>
      <div>12.97°N · 77.59°E</div>
    </div>
  </div>

  <div class="feat-label">FEATURED TRANSMISSION</div>
  <a class="featured" id="featured" href="{{ featured_post.url | relative_url }}" data-cat="{{ featured_post.category }}">
    {% if featured_post.cover %}<img class="cover-img" src="{{ featured_post.cover | relative_url }}" alt="{{ featured_post.title | escape }}">{% else %}<div class="cover-img"></div>{% endif %}
    <div class="feat-meta">
      <div class="feat-tagrow"><span class="sat">SAT-{{ fidx | prepend: '0' | slice: -2, 2 }}</span><span class="pill">{{ featured_post.cat_label | default: featured_post.category }}</span><span>{{ featured_post.date | date: "%Y.%m.%d" }}</span><span>· {{ featured_post.content | number_of_words | divided_by: 200 | plus: 1 }} MIN</span></div>
      <h2>{{ featured_post.title }}</h2>
      <p class="exc">{{ featured_post.hero_excerpt | default: featured_post.description | default: featured_post.excerpt | strip_html | truncate: 180 }}</p>
      <div class="read"><span class="read-link">[ OPEN TRANSMISSION → ]</span></div>
    </div>
  </a>

  <div class="arch-label">ALL TRANSMISSIONS</div>
  <div class="list" id="list">
    {% for post in posts %}
    <a class="row" href="{{ post.url | relative_url }}" data-cat="{{ post.category }}">
      <div class="num">{{ forloop.index | prepend: '0' | slice: -2, 2 }}</div>
      <div class="body">
        <div class="meta"><span class="cat">{{ post.cat_label | default: post.category }}</span><span>{{ post.date | date: "%Y.%m.%d" }}</span></div>
        <h3>{{ post.title }}</h3>
        <p class="exc">{{ post.hero_excerpt | default: post.description | default: post.excerpt | strip_html | truncate: 200 }}</p>
      </div>
      <div class="rt">{{ post.content | number_of_words | divided_by: 200 | plus: 1 }} MIN</div>
      <div class="arrow">→</div>
    </a>
    {% endfor %}
  </div>
</div>

<script>
(function () {
  "use strict";
  function init() {
    var rows = Array.prototype.slice.call(document.querySelectorAll(".row"));
    function pad(n) { return String(n).padStart(2, "0"); }

    /* marquee */
    var track = document.getElementById("track");
    if (track) {
      var html = "<span><b>// FIELD NOTES</b><i>// " + pad(rows.length) + " TRANSMISSIONS LOGGED</i>";
      rows.forEach(function (r) {
        var h = r.querySelector("h3");
        var d = r.querySelector(".meta span:last-child");
        html += "// " + (d ? d.textContent : "") + " · " + (h ? h.textContent.toUpperCase() : "");
      });
      html += "<b>// BANGALORE 12.97°N 77.59°E</b></span>";
      track.innerHTML = html + html;
    }
  }
  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
</script>
