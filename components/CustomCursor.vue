<template>
  <div class="cursor-wrap" @mousemove="handleMove($event)">
    <div class="cursor"></div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue'
import { gsap } from 'gsap'
import CustomEase from "gsap/CustomEase"
import { useSergiStore } from '@/stores/sergiStore'

const sergiStore = useSergiStore()

let xTo = null
let yTo = null

onMounted(() => {
  gsap.registerPlugin(CustomEase)
  xTo = gsap.quickTo('.cursor', "x", {duration: .5, ease: CustomEase.create("custom", "M0,0,C0.084,0.6,0.194,0.892,0.548,0.968,0.667,0.993,0.831,1,1,1")})
  yTo = gsap.quickTo('.cursor', "y", {duration: .5, ease: CustomEase.create("custom", "M0,0,C0.084,0.6,0.194,0.892,0.548,0.968,0.667,0.993,0.831,1,1,1")})
})

function handleMove(e) {
  const cursorX = e.clientX/sergiStore.windowSize.x - 0.5
  const cursorY = e.clientY/sergiStore.windowSize.y - 0.5

  xTo(cursorX)
  yTo(cursorY)

  console.log('movv')
}

</script>

<style lang="scss" scoped>
.cursor-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 4;
}
.cursor {
  mix-blend-mode: difference;
  background-color: var(--secondary);
  fill: var(--secondary);
  position: absolute;
  height: 250px;
  width: 250px;
  border-radius: 100%;
}
</style>