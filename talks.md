---
layout: page
title: Talks
---

<div class="talks">
  {% for talk in site.talks reversed %}
  <div class="talk">
    <h1 class="talk-title">
      <a href="{{ talk.url }}">
        {{ talk.title }}
      </a>
    </h1>
    <span class="post-date">{{ talk.date | date_to_string }} (<a href="{{talk.place.url}}" target="_blank">{{talk.place.name}}</a>)</span>
  </div>
  {% endfor %}
</div>
