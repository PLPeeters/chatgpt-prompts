---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: ''
---

# Table of Contents

{% for category in site.data.prompts -%}
* [{{ category.title }}](#{{ category.title | slugify }})
    {% for prompt in category.prompts -%}* [{{ prompt.title }}](#{{ prompt.title | slugify }})
    {% endfor %}
{% endfor %}

{% for category in site.data.prompts %}
# {{ category.title }} {#{{ category.title | slugify }}}
{% for prompt in category.prompts %}
{% include prompt.html %}
{% endfor %}
{% endfor %}
