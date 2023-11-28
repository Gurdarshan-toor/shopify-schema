=================== swatches jehre color image te click kre sirf ohi image ho howa gi product page te ===============
-------------------- jehri div block vich chl rhi us nu apni class dena ex:"mw_vari_image" and attribute change karna\
ex=data-type="{{ media.media_type }}"----------------------------
--------------------- div code ------------------------------------------------
<div id="{{ media_wrapper_id }}"
  class="product-single__media-slide{% unless featured_media == media %} media--hidden{% endunless %} mw_vari_image"
  data-product-slide
  data-id="{{ media.id }}"
  data-aspectratio="{{ media_aspect_ratio }}"
  data-media-id="{{ unique }}-{{ media.id }}"
  data-type="{{ media.media_type }}"
  data-variant-color="{{ media.alt }}"
  {% if media.media_type == 'video' or media.media_type == 'external_video' %}
    data-video
    data-video-id="{{ media.id }}"
    data-enable-video-looping="{{ enable_video_looping }}"
  {% endif %}
  {% if media.media_type == 'model' %}
    data-model
    data-model-id="{{ media.id }}"
  {% endif %}
  {% if media.media_type == 'external_video' %}
    data-youtube-id="{{ media.external_id }}"
  {% endif %}
  data-product-single-media-wrapper>
  {%- if media.media_type == 'image' -%}
    {%- assign image = media.preview_image | default: media -%}
    {%- assign image_url_pattern = image | img_url: '1x1' | replace: '_1x1.', '_{width}x.' -%}
    {%- assign image_widths = "[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048, 2450, 2700, 3000, 3350, 3750, 4100]" -%}

    <div class="product-single__media product-single__media--image">
      <div class="product-single__media--image-height" style="padding-top: {{ media_padding_top }}%;"></div>
      <img class="lazyload"
        src="{{ 'blank.gif' | asset_img_url: '1x1' }}"
        data-src="{{ image_url_pattern }}"
        data-product-image
        data-image-id="{{ media.id }}"
        data-widths= "{{ image_widths }}"
        data-aspectratio="{{ media_aspect_ratio }}"
        data-sizes="auto"
        data-object-fit="contain"
        alt="{{ media.alt | strip_html | escape }}">
      <noscript>
        <img src="{{ media | img_url: image_zoom_size }}" alt="{{ media.alt | strip_html | escape }}" id="{{ media.id }}">
      </noscript>

      {%- if enable_zoom and section_type != 'quickview' -%}
        <a href="{{ media | product_img_url: image_zoom_size }}" class="product-single__media-link" rel="lightbox" data-zoom-wrapper data-image-width="{{ media.width }}" data-image-height="{{ media.height }}">
          <span class="visually-hidden">{{ 'general.accessibility.product_image_lightbox' | t }}</span>
        </a>
      {%- endif -%}
    </div>
  {%- else -%}

    {%- case media.media_type -%}
      {%- when 'external_video' -%}
        <deferred-media class="product-single__media product-single__media--video deferred-media" data-deferred-media style="padding-top: {{ media_padding_top }}%;">
          <button type="button" class="deferred-media__poster" aria-label="{{ 'general.accessibility.view' | t }} {{ media.alt | strip_html | escape }}" data-deferred-media-button>
            <span class="deferred-media__poster-button">
              {%- render 'icon-media-video' -%}
            </span>

            <img
              srcset="{% if media.preview_image.width >= 288 %}{{ media.preview_image | img_url: '288x' }} 288w,{% endif %}
                      {% if media.preview_image.width >= 576 %}{{ media.preview_image | img_url: '576x' }} 576w,{% endif %}
                      {% if media.preview_image.width >= 550 %}{{ media.preview_image | img_url: '550x' }} 550w,{% endif %}
                      {% if media.preview_image.width >= 1100 %}{{ media.preview_image | img_url: '1100x' }} 1100w{% endif %}"
              src="{{ media | img_url: '550x550' }}"
              sizes="(min-width: 1200px) calc((1200px - 10rem) / 2), (min-width: 750px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)"
              loading="lazy"
              width="576"
              height="{{ 576 | divided_by: media.preview_image.aspect_ratio }}"
              alt="{{ media.preview_image.alt | escape }}">
          </button>

          <template>
            {%- if media.host == 'youtube' -%}
              {{ media | external_video_url: autoplay: true, mute: true, playsinline: true, controls: controls, loop: enable_video_looping, playlist: media.external_id | external_video_tag: loading: 'lazy' }}
            {%- else -%}
              {{ media | external_video_url: autoplay: true, muted: true, playsinline: true, controls: controls, loop: enable_video_looping | external_video_tag: loading: 'lazy' }}
            {%- endif -%}
          </template>
        </deferred-media>
      {%- when 'video' -%}
        <deferred-media class="product-single__media product-single__media--video product-single__media--{{ media.id }} deferred-media" data-deferred-media style="padding-top: {{ media_padding_top }}%;" data-loop="{{ enable_video_looping }}">
          <button type="button" class="deferred-media__poster" aria-label="{{ 'general.accessibility.view' | t }} {{ media.alt | strip_html | escape }}" data-deferred-media-button>
            <span class="deferred-media__poster-button">
              {%- render 'icon-media-video' -%}
            </span>

            <img
              srcset="{% if media.preview_image.width >= 288 %}{{ media.preview_image | img_url: '288x' }} 288w,{% endif %}
                      {% if media.preview_image.width >= 576 %}{{ media.preview_image | img_url: '576x' }} 576w,{% endif %}
                      {% if media.preview_image.width >= 550 %}{{ media.preview_image | img_url: '550x' }} 550w,{% endif %}
                      {% if media.preview_image.width >= 1100 %}{{ media.preview_image | img_url: '1100x' }} 1100w{% endif %}"
              src="{{ media | img_url: '550x550' }}"
              sizes="(min-width: 1200px) calc((1200px - 10rem) / 2), (min-width: 750px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)"
              loading="lazy"
              width="576"
              height="{{ 576 | divided_by: media.preview_image.aspect_ratio }}"
              alt="{{ media.preview_image.alt | escape }}">
          </button>

          <template>
            {{ media | media_tag: image_size: image_size, class: 'media-video', autoplay: true, muted: true, loop: enable_video_looping, controls: controls, preload: 'auto' }}
          </template>
        </deferred-media>
      {%- when 'model' -%}
        <deferred-media class="product-single__media product-single__media--model product-single__media--{{ media.id }} deferred-media" data-deferred-media style="padding-top: {{ media_padding_top }}%;" data-loop="{{ enable_video_looping }}">
          <button type="button" class="deferred-media__poster" aria-label="{{ 'general.accessibility.view' | t }} {{ media.alt | strip_html | escape }}" data-deferred-media-button>
            <span class="deferred-media__poster-button">
              {%- render 'icon-media-model' -%}
            </span>

            <img
              srcset="{% if media.preview_image.width >= 288 %}{{ media.preview_image | img_url: '288x' }} 288w,{% endif %}
                      {% if media.preview_image.width >= 576 %}{{ media.preview_image | img_url: '576x' }} 576w,{% endif %}
                      {% if media.preview_image.width >= 550 %}{{ media.preview_image | img_url: '550x' }} 550w,{% endif %}
                      {% if media.preview_image.width >= 1100 %}{{ media.preview_image | img_url: '1100x' }} 1100w{% endif %}"
              src="{{ media | img_url: '550x550' }}"
              sizes="(min-width: 1200px) calc((1200px - 10rem) / 2), (min-width: 750px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)"
              loading="lazy"
              width="576"
              height="{{ 576 | divided_by: media.preview_image.aspect_ratio }}"
              alt="{{ media.preview_image.alt | escape }}">
          </button>

          <template>
            {{ media | model_viewer_tag: image_size: image_size, toggleable: true, data-model-id: media.id }}
          </template>
        </deferred-media>
      {%- else -%}
        <div class="product-single__media" style="padding-top: {{ media_padding_top }}%;">
          {{ media | media_tag: class: 'media-item', image_size: image_size }}
        </div>
    {%- endcase -%}
  {%- endif -%}
</div>



-----------js code-----------------
window.onload = function() {
    const selectedValue = document.querySelector('input[name="options[Color]"]:checked').value;
    showImages(selectedValue);
}

const inputs = document.getElementsByName("options[Color]");
// Loop through each radio button
inputs.forEach(input => {
  // Add a change event listener to the radio button
  input.addEventListener("change", function() {
    const seletedInput = this.value;
    showImages(seletedInput);
  });
});

function showImages(seletedInput) {
  const divs = document.querySelectorAll(".mw_vari_image");
  // Loop through all the divs
  divs.forEach(div => {
    // Get the value of the data-variant-color attribute
    const dataType = div.getAttribute("data-variant-color");
    // Check if the data-variant-color attribute matches the desired value
    if (dataType.toLowerCase() !== seletedInput.toLowerCase()) {
      // Hide the div if it doesn't match the desired value
      div.style.display = "none";
    } else {
      div.style.display = "block";
    }
  });
}

=============================CDN link============================================
<!-- Add the slick-theme.css if you want default styling -->
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    <!-- Add the slick-theme.css if you want default styling -->   
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"/> 
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
	
///////////////////////////////////////////////////////////////////////////// 
	
======================custom slick slider link asset file================================	
	
	   <link rel="stylesheet" href="{{ 'slick-theme.css' | asset_url }}">
     <link rel="stylesheet" href="{{ 'slick.css' | asset_url }}">

    <script src="{{ 'jquery.min.js' | asset_url }}" defer="defer"></script>
    <script src="{{ 'slick.min.js' | asset_url }}" defer="defer"></script>
	
////////////////////////////////////////////////////////////////////////////////////////////////

======================= custom slick  =============================

Asset main file import karni---- slick.css, slick-theme.css, jquery.min.js, slick.min.js

layout > theme.liquid

    {{ 'slick.css' | asset_url | stylesheet_tag }}
    {{ 'slick-theme.css' | asset_url | stylesheet_tag }}
 
    {{ 'jquery.min.js' | asset_url | script_tag }} 
    {{ 'slick.min.js' | asset_url | script_tag }}
	
////////////////////////////////////////////////////////


function goBack() {
  window.history.back();
}
5:25
<div class="cart-header">
        <h1 class="cart-header__title">{{ 'cart.general.title' | t }}</h1>
        <a href="#" class="text-link text-link--accent" onclick="goBack()">
          {{ 'cart.general.continue_shopping' | t }}
        </a>
    </div>

    =====================================
