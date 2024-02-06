<template>
  <div class="cursor" ref="cursor"></div>
</template>

<script setup>
import { gsap } from 'gsap'
import CustomEase from "gsap/CustomEase"
import { onMounted, ref, watch } from 'vue'
import { useSergiStore } from '@/stores/sergiStore'
import { storeToRefs } from 'pinia'

const sergiStore = useSergiStore()

const cursor = ref(null)
const { cursorHover, cursorState } = storeToRefs(sergiStore)

let xSetter, ySetter
let mouseX, mouseY

watch(cursorHover, async (newHover, oldHover) => {
  if (newHover === true) {
    gsap.to(cursor.value, {
      scale: 1.8,
      duration: .25
    })
  } else {
    gsap.to(cursor.value, {
      scale: 1,
      duration: .25
    })
  }
})

watch(cursorState, async (newState, oldHover) => {
  if (newState === 'home') {
    
    //timeline nest a quickto + a position absolute change onComplete?
  } else {
    //same but to pos fixed?
  }
})

onMounted(() => {
  gsap.registerPlugin(CustomEase)  
  gsap.set(cursor.value, {xPercent: -50, yPercent: -50})
  xSetter = gsap.quickTo(cursor.value, "x", {duration: 0.6, ease: "power3"})
  ySetter = gsap.quickTo(cursor.value, "y", {duration: 0.6, ease: "power3"})
  xSetter(sergiStore.windowSize.x/2)
  ySetter(sergiStore.windowSize.y/2)

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX
    mouseY = e.clientY

    if (sergiStore.cursorState === 'home') {
      xSetter(sergiStore.windowSize.x/2 + (mouseX/sergiStore.windowSize.x - 0.5) * sergiStore.windowSize.x * 0.1)
      ySetter(sergiStore.windowSize.y/2 + (mouseY/sergiStore.windowSize.y - 0.5) * sergiStore.windowSize.y * 0.1)
    } else {
      xSetter(mouseX)
      ySetter(mouseY)
    }
  })
})
</script>

<style lang="scss" scoped>
.cursor {
  position: fixed;
  mix-blend-mode: difference;
  background-color: var(--secondary);
  fill: var(--secondary);
  width: 5vw;
  height: 5vw;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 100;
  border-radius: 100%;
}
</style>