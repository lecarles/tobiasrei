<template>
  <nuxt-link class="carl-button" :to="localePath(props.to)" @mousemove="handleMove($event)">
      <div class="carl-button-slot"><slot></slot></div>
      <div class="circle" ref="circle"></div>
  </nuxt-link>
</template>

<script setup>
import {ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import CustomEase from "gsap/CustomEase"
import { useSergiStore } from '~/stores/sergiStore'

const circle = ref(null)
let xTo, yTo 

const sergiStore = useSergiStore()

onMounted(() => {
  gsap.registerPlugin(CustomEase) 
  xTo = gsap.quickTo(circle.value, "left", {duration: 1, ease: CustomEase.create("custom", "M0,0,C0.084,0.6,0.194,0.892,0.548,0.968,0.667,0.993,0.831,1,1,1")})
  yTo = gsap.quickTo(circle.value, "top", {duration: 1, ease: CustomEase.create("custom", "M0,0,C0.084,0.6,0.194,0.892,0.548,0.968,0.667,0.993,0.831,1,1,1")})
})

const localePath = useLocalePath()
const props = defineProps({
  to: {
    type: String,
    default: ''
  }
})

function handleMove(e) {
  const cursorX = e.clientX/sergiStore.windowSize.x - 0.5
  const cursorY = e.clientY/sergiStore.windowSize.y - 0.5
  console.log(e)
  xTo(e.clientX)
  yTo(e.clientY)
}

function handleEnter() {
  console.log('in')
}

function handleLeave() {
  console.log('out')
}
</script>

<style lang="scss" scoped>
.carl-button {
  position: relative;
  display: block;
  overflow: hidden;
  border: 1px solid var(--black);
  border-radius: 10em;
  transition: .1s ease;

  &-slot {
    padding: .25em .75em;
  }

  &:hover {
    .circle {
      width: 20px;
      height: 20px;
    }
    
    color: var(--white);
  }

  .circle {
    background: var(--black);
    width: 0;
    height: 0;
    border-radius: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    margin: 0 auto;
    transition: .25s ease;
  }
}
</style>