<script setup>
useSeoMeta({
  title: 'Sóc Carles  – Dissenyador gràfic i desenvolupador web',
  ogTitle: 'Sóc Carles  – Dissenyador gràfic i desenvolupador web',
  description: "",
  ogDescription: "",
  ogImage: 'https://a.storyblok.com/f/243306/2149x1080/3bba475e90/fons-taronja.png',
})

import { pageTransition } from '@/helpers/transitionConfig'

definePageMeta({
  pageTransition: pageTransition,
})

const storyblokApi = useStoryblokApi()
const route = useRoute()
const { data } = await storyblokApi.get('cdn/stories/home', {
  language: route.name.endsWith('en') ? 'en' : 'ca',
})
</script>

<template>
  <div class="main-page">
    <div class="intro-section">
      <div class="intro-text font-size-md">
        {{ data.story.content.introText }}
      </div>
    </div>
    <ProjectsSection></ProjectsSection>
  </div>
</template>

<style lang="scss">
.intro-section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
