<template>
  <div class="carousels">
    <div class="photo-carousel">
      <div ref="photos" class="photo-container" v-for="(photo, i) in props.images" :key="photo.id" @click="to(i)">
        <img :src="photo.filename + '/m/1400x0'" alt="" :style="randomPosition()">
      </div>
    </div>
    <div class="photo-carousel-v">
      <div ref="photosV" class="photo-container" v-for="(photo, i) in props.imagesV" :key="photo.id" @click="to(i)">
        <img :src="photo.filename + '/m/1400x0'" alt="" :style="randomPosition()">
      </div>
    </div>
    <div class="controls">
      <button class="left" @click="left()">l</button>
      <button class="right" @click="right()">r</button>
      <button class="up" @click="up()">up</button>
      <button class="down" @click="down()">dwn</button>
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

let shiftRight
let shifted = ref(false)

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
    loopV = verticalLoop(photosV.value, {
      paused: true, 
      draggable: false,
    })
  }
}

function to(i) {
  loop.toIndex(i, {duration: .8, ease: "power3.inOut"})
}


let positionsX = ['left', 'right'] 
let positionsY = ['top', 'bottom']
let sizes = [2, 3, 4]
let positions = [1, 2, 3, 4]

function randomPosition() {
  let colSize = sizes[Math.floor(Math.random() * sizes.length)]
  let colPosition = positions[Math.floor(Math.random() * positions.length)]
  let rowSize = sizes[Math.floor(Math.random() * sizes.length)]
  let rowPosition = positions[Math.floor(Math.random() * positions.length)]

  if (colPosition + colSize > 6) {
    colPosition = 6 - colSize
  }

  if (rowPosition + rowSize > 6) {
    rowPosition = 6 - rowSize
  }

  return {
    objectPosition: `${positionsX[Math.floor(Math.random() * positionsX.length)]} ${positionsY[Math.floor(Math.random() * positionsY.length)]}`,
    gridColumn: `${colPosition} / span ${colSize}`,
    gridRow: `${rowPosition} / span ${rowSize}`,
  }
}

function toV(i) {
  loopV.toIndex(i, {duration: .8, ease: "power3.inOut"})
}

function right() {
  if (shifted.value === true) {
    console.log('shifted right')
    gsap.to('.photo-carousel-v', {
      y: '100%',
      duration: .8, 
      ease: "power3.inOut",
    })
    gsap.set('.photo-carousel', {
      xPercent: -100
    })
    gsap.to('.photo-carousel', {
      xPercent: 0,
      duration: .8, 
      ease: "power3.inOut",
      delay: .2
    })
    shifted.value = !shifted.value
  } else {
    loop.previous({duration: .8, ease: "power3.inOut"})
  } 
}

function left() {
  if (shifted.value === true) {
    console.log('shifted left')
    gsap.to('.photo-carousel-v', {
      y: '100%',
      duration: .8, 
      ease: "power3.inOut"
    })
    gsap.set('.photo-carousel', {
      xPercent: 100
    })
    gsap.to('.photo-carousel', {
      xPercent: 0,
      duration: .8, 
      ease: "power3.inOut",
      delay: .2
    })
    shifted.value = !shifted.value
  } else {
    loop.next({duration: .8, ease: "power3.inOut"})
  } 
}

function up() {
  if (shifted.value === false) {
    console.log('shifted up')
    gsap.to('.photo-carousel', {
      xPercent: 100,
      duration: .8, 
      ease: "power3.inOut",
    })
    gsap.set('.photo-carousel-v', {
      y: '100%',
    })
    gsap.to('.photo-carousel-v', {
      y: 0,
      duration: .8, 
      ease: "power3.inOut",
      delay: .2
    })
    shifted.value = !shifted.value
  } else {
    loopV.next({duration: .8, ease: "power3.inOut"})
  }
}

function down() {
  if (shifted.value === false) {
    console.log('shifted dwn')
    gsap.to('.photo-carousel', {
      xPercent: 100,
      duration: .8, 
      ease: "power3.inOut"
    })
    gsap.set('.photo-carousel-v', {
      y: '-100%'
    })
    gsap.to('.photo-carousel-v', {
      y: 0,
      duration: .8, 
      ease: "power3.inOut",
      delay: .2
    })
    shifted.value = !shifted.value
  } else {
    loopV.previous({duration: .8, ease: "power3.inOut"})
  }
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
  height: 100%;
  overflow: hidden;
  grid-template-rows: 1fr;
  grid-template-columns: 100vw;
  grid-auto-flow: column;

  .photo-container {
    position: relative;
    display: grid;
    grid-template-columns: repeat(5, 20vw);
    grid-template-rows: repeat(5, 20vh);
    background: white;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.photo-carousel-v {
  transform: translateY(-100%);
  height: 100vh;
  overflow: hidden;
  position: absolute;
  inset: 0;

  .photo-container {
    position: relative;
    display: grid;
    grid-template-columns: repeat(5, 20vw);
    grid-template-rows: repeat(5, 20vh);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
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