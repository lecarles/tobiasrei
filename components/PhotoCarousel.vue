<template>
  <div class="carousels">
    <div class="photo-carousel">
      <div ref="photos" class="photo-container" v-for="(photo, i) in props.images" :key="photo.id" @click="to(i)">
        <img :src="photo.filename + '/m/1400x0'" alt="">
      </div>
    </div>
    <div class="photo-carousel-v">
      <div ref="photosV" class="photo-container" v-for="(photo, i) in props.imagesV" :key="photo.id" @click="to(i)">
        <img :src="photo.filename + '/m/1400x0'" alt="">
      </div>
    </div>
    <div class="controls">
      <button class="left" @click="next()">l</button>
      <button class="right" @click="previous()">r</button>
      <button class="up" @click="nextV()">up</button>
      <button class="down" @click="previousV()">dwn</button>
      <button @click="shift()">shft</button>
    </div>
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
import verticalLoop from '@/helpers/verticalLoop'

let observer

const photos = ref(null)
const photosV = ref(null)
let loop
let loopV

let shiftTl
let shifted = ref(false)

onMounted(() => {
  gsap.registerPlugin(Draggable)
  gsap.registerPlugin(InertiaPlugin)
  gsap.registerPlugin(CustomEase)
  gsap.registerPlugin(Observer)

  shiftTl = gsap.timeline({paused: true})
  shiftTl.to('.photo-carousel', {
    xPercent: -100,
  })
  shiftTl.to('.photo-carousel-v', {
    y: 0,
  })

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
    loopV = verticalLoop(photosV.value, {
      paused: true, 
      draggable: false,
    })
  }
}

function shift() {
  shifted.value ? shiftTl.tweenFromTo(shiftTl.duration(), 0, {duration: 1.4, ease: "power4.inOut"}) : shiftTl.tweenFromTo(0, shiftTl.duration(), {duration: 2.5, ease: "power3.inOut"})
  shifted.value = !shifted.value
}

function to(i) {
  loop.toIndex(i, {duration: 1.4, ease: "power4.inOut"})
}

function toV(i) {
  loopV.toIndex(i, {duration: 1.4, ease: "power4.inOut"})
}

function next() {
  shifted.value ? shift() : loop.next({duration: 1.4, ease: "power4.inOut"})
}

function previous() {
  shifted.value ? shift() : loop.previous({duration: 1.4, ease: "power4.inOut"})
}

function nextV() {
  shifted.value ? loopV.next({duration: 1.4, ease: "power4.inOut"}) : shift()
}

function previousV() {
  shifted.value ? loopV.previous({duration: 1.4, ease: "power4.inOut"}) : shift()
}

const props = defineProps({
  images: {
    type: Object,
    default: null
  },
  imagesV: {
    type: Object,
    default: null
  }
})
</script>

<style lang="scss" scoped>
.carousels {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.photo-carousel {
  position: absolute;
  inset: 0;
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
    grid-row: 3/-1;
    grid-column: 3/-1;
  }
}

.photo-carousel-v {
  height: 100vh;
  overflow: hidden;
  position: absolute;
  inset: 0;
  transform: translateY(-100%);

  .photo-container {
    position: relative;
    width: 100vw;
    height: 100vh;
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

.controls {
  .left {
    position: fixed;
    top: 50%;
    left: 0;
  }

  .right {
    position: fixed;
    top: 50%;
    right: 0;
  }

  .up {
    position: fixed;
    left: 50%;
    top: 0;
  }

  .down {
    position: fixed;
    left: 50%;
    bottom: 0;
  }
}
</style>