<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { onMounted, onUnmounted, ref } from 'vue'
import { useTobiasStore } from '@/stores/tobiasStore'

const tobiasStore = useTobiasStore()
let ctx
let smoother
const main = ref(null)


onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)  

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

  window.innerWidth > 900 ? tobiasStore.isMb = false : tobiasStore.isMb = true
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