<details open markdown="block">
  <summary class="text-delta">
    Table of Contents
  </summary>
* TOC
{:toc}
</details>

{% for category in prompts %}
# {{ category.title }} {#{{ category.title | slugify }}}
{% for prompt in category.prompts %}
{% include prompt.html %}
{% endfor %}
{% endfor %}

<script src="js/main.js"></script>
