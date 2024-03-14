<template>
  <div class="photo-carousel">
    <div ref="photos" class="photo-container" v-for="(photo, i) in props.images" :key="photo.id" @click="to(i)">
      <img :src="photo.filename + '/m/1400x0'" alt="">
    </div>
  </div>
  <div>
    <button @click="next()">n</button>
    <button @click="previous()">p</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import CustomEase from "gsap/CustomEase"
import horizontalLoop from '@/helpers/horizontalLoop'

let observer

const photos = ref(null)
let loop

onMounted(() => {
  gsap.registerPlugin(Draggable)
  gsap.registerPlugin(InertiaPlugin)
  gsap.registerPlugin(CustomEase)
  gsap.registerPlugin(Observer)

  setupLoop()
})

onBeforeUnmount(() => {
  if(observer) {
    observer.kill()
  }
})

function setupLoop() {
  if(props.images.length > 1) {
    loop = horizontalLoop(photos.value, {
    paused: true, 
    draggable: false,
  })
  }
}

function to(i) {
  loop.toIndex(i, {duration: 1.4, ease: "power4.inOut"})
}

function next() {
  loop.next({duration: 1.4, ease: "power4.inOut"})
}
function previous() {
  loop.previous({duration: 1.4, ease: "power4.inOut"})
}

const props = defineProps({
  images: {
    type: Object,
    default: null
  }
})
</script>

<style lang="scss" scoped>
.photo-carousel {
  display: grid;
  height: 90vh;
  overflow: hidden;
  grid-template-rows: 1fr;
  grid-template-columns: 100vw;
  grid-auto-flow: column;

  .photo-container {
    position: relative;
    width: 100vw;
    height: 90vh;
    display: grid;
    grid-template-columns: repeat(5, 20vw);
    grid-template-rows: repeat(5, 15vh);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: left top;
    grid-row: span 4;
    grid-column: span 4;
  }
}

@media (max-width: $md-breakpoint) {
  .photo-carousel {
    img {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
      object-position: top;
    }
  }
}
</style>