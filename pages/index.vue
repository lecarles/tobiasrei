<script setup>
useSeoMeta({
  title: 'Tobias Rei',
  ogTitle: 'Tobias Rei',
  description: "",
  ogDescription: "",
  ogImage: 'https://a.storyblok.com/f/243306/2149x1080/3bba475e90/fons-taronja.png',
})

import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const storyblokApi = useStoryblokApi()
const route = useRoute()
const work = await storyblokApi.get('cdn/stories/work')
const diary = await storyblokApi.get('cdn/stories/diary')
let images = work.data.story.content.images
let mobile = ref(false)
let menuOpen = ref(false)

images.reverse()
images.unshift(images.pop())

let imgh = images.map((img, i) => {
  return {
    filename: img.filename,
    order: i + 1,
    category: "work"
  }
})

let imgv = diary.data.story.content.images.map((img, i) => {
  return {
    filename: img.filename,
    order: i + 1,
    category: "diary"
  }
})

let imagesMb = imgh.concat(imgv)
shuffleArray(imagesMb)

onMounted(() => {
  let mm = gsap.matchMedia()
  mm.add("(max-width: 900px)", () => {
    mobile.value = true
  })
})

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

</script>

<template>
  <div class="main-page font-size-sm">
    <app-nav />
    <photo-carousel-mb :images="imagesMb" v-if="mobile"/>
    <photo-carousel :images="images" :imagesV="diary.data.story.content.images" v-else/>
    <photo-masonry :images="images" :imagesV="diary.data.story.content.images" />
  </div>
</template>

<style lang="scss">
.main-page {
  position: relative;
}

.photo-masonry {
  display: none;
}

.intro-text {
  text-wrap: balance;
}
</style>
