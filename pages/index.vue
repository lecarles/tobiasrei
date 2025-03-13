<script setup>
useSeoMeta({
  title: 'Tobias Rei',
  ogTitle: 'Tobias Rei',
  description: "Photographer based in Barcelona",
  ogDescription: "Photographer based in Barcelona",
  ogImage: '',
})

import { ref } from 'vue'

const storyblokApi = useStoryblokApi()
const work = await storyblokApi.get('cdn/stories/work')
const diary = await storyblokApi.get('cdn/stories/diary')
let images = work.data.story.content.images
const navRef = ref(null)
const carouselRef = ref(null)

images.reverse()
images.unshift(images.pop())

let imgh = ref(images.map((img, i) => {
  return {
    filename: img.filename,
    order: i + 1,
    category: "work"
  }
}))

let imgv = ref(diary.data.story.content.images.map((img, i) => {
  return {
    filename: img.filename,
    order: i + 1,
    category: "diary"
  }
}))

let imagesMb = ref(imgh.value.concat(imgv.value))
const order = useState('order', () => Array.from({length: imagesMb.value.length - 1}, (_, i) => i + 1).sort(() => Math.random() - 0.5))

function workTo(i, j) {
  carouselRef.value.to(i, j)
  navRef.value.toggleMasonry()
}

function diaryTo(i) {
  carouselRef.value.toV(i)
  navRef.value.toggleMasonry()
}
</script>

<template>
  <div class="main-page">
    <app-nav ref="navRef"></app-nav>
    <photo-carousel-mb :images="imagesMb" :order="order" />
    <photo-carousel ref="carouselRef" :images="images" :imagesV="diary.data.story.content.images" />
    <photo-masonry :images="work.data.story.content.images" :imagesV="diary.data.story.content.images" @masonry-work="workTo" @masonry-diary="diaryTo" />
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

.carousel-mb {
  display: none;
}

@media (max-width: $sm-breakpoint) {
  .carousels-wrap {
    display: none;
  }

  .carousel-mb {
    display: block;
  }
}
</style>
