<template>
  <div class="carousels">
    <div class="photo-carousel">
      <div ref="photos" class="photo-container" v-for="photo in props.images" :key="photo.id">
        <photo-item :image="photo.filename" />
      </div>
    </div>
    <div class="photo-carousel-v">
      <div ref="photosV" class="photo-container" v-for="photo in props.imagesV" :key="photo.id">
        <photo-item :image="photo.filename" />
      </div>
    </div>
    <div class="controls font-size-sm">
      <button @mouseover="handlemouse('left')" class="left" @click="left()"></button>
      <button @mouseover="handlemouse('right')" class="right" @click="right()"></button>
      <button @mouseover="handlemouse('up')" class="up" @click="up()"></button>
      <button @mouseover="handlemouse('down')" class="down" @click="down()"></button>
      <button @mouseover="handlemouse('right')" class="rr" @click="right()"></button>
      <button @mouseover="handlemouse('left')" class="ll" @click="left()"></button>
      <!-- <div @mouseenter="handlemouse(`none-${shifted ? 'diary' : 'work'}`)" class="none"></div> -->
    </div>
    <custom-cursor />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import CustomEase from "gsap/CustomEase"
import horizontalLoop from '@/helpers/horizontalLoop'
import verticalLoop from '@/helpers/verticalLoop'
import { useTobiasStore } from '@/stores/tobiasStore'

const tobiasStore = useTobiasStore()
const photos = ref(null)
const photosV = ref(null)
let loop
let loopV
let shifted = ref(false)

function handlemouse(dir) {
  tobiasStore.direction = dir
}

onMounted(() => {
  gsap.registerPlugin(Draggable)
  gsap.registerPlugin(InertiaPlugin)
  gsap.registerPlugin(CustomEase)

  tobiasStore.workLength = props.images.length 
  tobiasStore.diaryLength = props.imagesV.length

  setupLoop()
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

function toV(i) {
  loopV.toIndex(i, {duration: .8, ease: "power3.inOut"})
}

function right() {
  if (shifted.value === true) {
    loop.previous({duration: .05})
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
  tobiasStore.currentWork + 1 > props.images.length ? tobiasStore.currentWork = 1 : tobiasStore.currentWork++
}

function left() {
  if (shifted.value === true) {
    loop.next({duration: .05})
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
  tobiasStore.currentWork - 1 < 1 ? tobiasStore.currentWork = props.images.length : tobiasStore.currentWork = tobiasStore.currentWork - 1
}

function up() {
  if (shifted.value === false) {
    loopV.next({duration: .05})
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
  tobiasStore.currentDiary + 1 > props.imagesV.length ? tobiasStore.currentDiary = 1 : tobiasStore.currentDiary++
}

function down() {
  if (shifted.value === false) {
    loopV.previous({duration: .05})
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

  tobiasStore.currentDiary - 1 < 1 ? tobiasStore.currentDiary = props.imagesV.length : tobiasStore.currentDiary = tobiasStore.currentDiary - 1
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
  height: calc(100vh - 1px);
  width: 100vw;
  overflow: hidden;
}

button {
  cursor: none;
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
    "l ll rr r"
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
  .ll {
    grid-area: ll;
  }
  .rr {
    grid-area: rr;
  }

  .none { 
    grid-area: n;
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