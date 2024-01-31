<template>
  <div>
    <div id="smooth-wrapper" ref="main">
      <div id="smooth-content">
        <NuxtPage />
        <custom-cursor />
      </div>
    </div>
    <transition-element />
  </div>
</template>

<script setup>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
import { onMounted, onUnmounted, ref } from 'vue'
import { useSergiStore } from '@/stores/sergiStore'

const sergiStore = useSergiStore()
let ctx
let smoother
const main = ref(null)

const { toggleTransitionComplete } = useTransitionComposable()

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)  

  ctx = gsap.context(() => {
    smoother = ScrollSmoother.create({
      smooth: 1, 
      effects: true,
    })
  }, main.value)

  onResize()
  window.addEventListener('resize', onResize)
  toggleTransitionComplete(true)
})
      
onUnmounted(() => {
  ctx.revert()
})

function onResize() {
  sergiStore.setWindowSize({x: window.innerWidth,  y: window.innerHeight})
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
</script>

<style lang="scss">
.wrapper { 
  background: var(--background);
}
</style>