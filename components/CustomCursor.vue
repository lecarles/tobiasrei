<template>
  <div class="cursor" ref="cursor">
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import CustomEase from "gsap/CustomEase"
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTobiasStore } from '@/stores/tobiasStore'

const tobiasStore = useTobiasStore()

const cursor = ref(null)
const { cursorHover, cursorState } = storeToRefs(tobiasStore)

let xSetter, ySetter
let mouseX, mouseY
let hovering = false

const props = defineProps({
  hover: String
})

watch(cursorHover, async (newHover, oldHover) => {
  //wtch
})

onMounted(() => {
  gsap.registerPlugin(CustomEase)  
  gsap.set(cursor.value, {xPercent: -50, yPercent: -50})
  xSetter = gsap.quickTo(cursor.value, "x", {duration: 0.6, ease: "power3"})
  ySetter = gsap.quickTo(cursor.value, "y", {duration: 0.6, ease: "power3"})
  gsap.set(cursor.value, {
    x: tobiasStore.windowSize.x/2,
    y: tobiasStore.windowSize.y/2
  })

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX
    mouseY = e.clientY

    if(!hovering) {
      xSetter(mouseX)
      ySetter(mouseY)
    }
  })

  if(props.hover === 'right') {
    hovering = true
    gsap.to(cursor.value, {x: tobiasStore.windowSize.x, duration: 0.6, ease: "power3"})
  }
})
</script>

<style lang="scss" scoped>
.cursor {
  position: fixed;
  width: 1.8em;
  height: 1.8em;
  top: 0;
  left: 0;
  border: 1px solid black;
  pointer-events: none;
  z-index: 100;
  border-radius: 100%;
}
</style>