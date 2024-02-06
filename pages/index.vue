<script setup>
useSeoMeta({
  title: 'Sóc Carles  – Dissenyador gràfic i desenvolupador web',
  ogTitle: 'Sóc Carles  – Dissenyador gràfic i desenvolupador web',
  description: "",
  ogDescription: "",
  ogImage: 'https://a.storyblok.com/f/243306/2149x1080/3bba475e90/fons-taronja.png',
})

import { useSergiStore } from '@/stores/sergiStore'
import { pageTransition } from '@/helpers/transitionConfig'

definePageMeta({
  pageTransition: pageTransition,
})

const storyblokApi = useStoryblokApi()
const route = useRoute()
const { data } = await storyblokApi.get('cdn/stories/home', {
  language: route.name.endsWith('en') ? 'en' : 'ca',
})
const sergiStore = useSergiStore()

function mouseenter() {
  sergiStore.cursorState = 'home'
}
</script>

<template>
  <div class="main-page font-size-sm">
    <app-nav />
    <div class="intro-section" @mouseenter="mouseenter()">
      <div class="intro-text p-md font-size-xl">
        {{ data.story.content.introText }}
      </div>
    </div>
    <ProjectsSection></ProjectsSection>
    <email-section />
    <app-footer />
  </div>
</template>

<style lang="scss">
.intro-section {
  height: calc(80vh - $navbar-height);
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.intro-text {
  text-wrap: balance;
}
</style>
