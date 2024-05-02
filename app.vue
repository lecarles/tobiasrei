<template>
  <div>
    <div id="smooth-wrapper" ref="main">
      <div id="smooth-content">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
import { onMounted, onUnmounted, ref } from 'vue'
import { useTobiasStore } from '@/stores/tobiasStore'

const tobiasStore = useTobiasStore()
let ctx
let smoother
const main = ref(null)


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
})
      
onUnmounted(() => {
  ctx.revert()
})

function onResize() {
  tobiasStore.setWindowSize({x: window.innerWidth,  y: window.innerHeight})
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
</script>

<style lang="scss">
.page-wrapper {
  position: relative;
}

.wrapper { 
  background: var(--background);
}
</style>