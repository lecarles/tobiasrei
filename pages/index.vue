<script setup>
useSeoMeta({
  title: 'Tobias Rei',
  ogTitle: 'Tobias Rei',
  description: "",
  ogDescription: "",
  ogImage: 'https://a.storyblok.com/f/243306/2149x1080/3bba475e90/fons-taronja.png',
})

const storyblokApi = useStoryblokApi()
const route = useRoute()
const { data } = await storyblokApi.get('cdn/stories/home')

</script>

<template>
  <div class="main-page font-size-sm">
    <photo-carousel :images="data.story.content.work" :imagesV="data.story.content.diary" />
  </div>
</template>

<style lang="scss">
.intro-section {
  height: calc(80vh - $navbar-height);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.intro-text {
  text-wrap: balance;
}
</style>
