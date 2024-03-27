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
    <div class="controls font-size-sm">
      <button @mouseenter="handlemouse('left')" class="left" @click="left()">←</button>
      <button @mouseenter="handlemouse('right')" class="right" @click="right()">→</button>
      <button @mouseenter="handlemouse('up')" class="up" @click="up()">↑</button>
      <button @mouseenter="handlemouse('down')" class="down" @click="down()">↓</button>
    </div>
    <custom-cursor :hover="direction"/>
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

let direction = ref(null)
let shifted = ref(false)

function handlemouse(dir) {
  direction.value = dir
  console.log(dir)
}

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

.photo-carousel, .photo-carousel-v {
  position: absolute;
  inset: 0;
  height: 100vh;
  overflow: hidden;

  .photo-container {
    display: grid;
    grid-template-columns: repeat(5, 20vw);
    grid-template-rows: repeat(5, 20vh);
    position: relative;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.photo-carousel {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 100vw;
  grid-auto-flow: column;
}

.photo-carousel-v {
  transform: translateY(-100%);
}

.controls {
  display: grid;
  position: fixed;
  inset: 0;
  height: 100vh;
  width: 100vw;
  grid-template-columns: 1fr 1fr 1fr 1fr; 
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "l u u r"
    "l u u r"
    "l . . r"
    "l d d r"
    "l d d r"; 
  }

  .left, .right, .up, .down {
    display: flex;
  } 

  .left { 
    grid-area: l; 
    justify-content: flex-start;
    align-items: center;
  }
  .right { 
    grid-area: r; 
    justify-content: flex-end;
    align-items: center;
  }
  .up { 
    grid-area: u; 
    justify-content: center;
    align-items: flex-start;
  }
  .down { 
    grid-area: d; 
    justify-content: center;
    align-items: flex-end;
  }

  button {
    font-size: inherit;
    font-family: inherit;
    outline: none;
    background: none;
    border: none;
    padding: 1em;
    display: flex;
  }

</style>