<template>
  <div class="cursor" ref="cursor">
    <div class="stamp stamp-up font-size-sm-mono" v-if="tobiasStore.direction === 'up'">
      <div :style="{transform: `rotate(${rotations[getRandomInt(5)]}deg)`}">
        <span>Diary</span> 
        <span class="mr-1 ml-1">↑</span>
        <span>({{ tobiasStore.currentDiary + 1 > tobiasStore.diaryLength ? 1 : tobiasStore.currentDiary + 1 }}/{{ tobiasStore.diaryLength }})</span>
      </div>
    </div>
    <div class="stamp stamp-down font-size-sm-mono" v-else-if="tobiasStore.direction === 'down'">
      <div :style="{transform: `rotate(${rotations[getRandomInt(5)]}deg)`}">
        <span>Diary</span> 
        <span class="mr-1 ml-1">↓</span>
        <span>({{ tobiasStore.currentDiary - 1 === 0 ? tobiasStore.diaryLength : tobiasStore.currentDiary - 1 }}/{{ tobiasStore.diaryLength }})</span>
      </div>
    </div>
    <div class="stamp stamp-right" v-else-if="tobiasStore.direction === 'right'">
      <div>Work</div>
      <div>({{ tobiasStore.currentWork + 1 > tobiasStore.workLength ? 1 : tobiasStore.currentWork + 1 }}/{{ tobiasStore.workLength }})</div>   
      <div>→</div>
    </div>
    <div class="stamp stamp-left" v-else-if="tobiasStore.direction === 'left'">
      <div>←</div>
      <div>Work</div>
      <div>({{ tobiasStore.currentWork - 1 === 0 ? tobiasStore.workLength : tobiasStore.currentWork - 1 }}/{{ tobiasStore.workLength }})</div>
    </div>
    <div class="stamp stamp-nav" v-else-if="tobiasStore.direction === 'nav'">

    </div>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import CustomEase from "gsap/CustomEase"
import { onMounted, ref } from 'vue'
import { useTobiasStore } from '@/stores/tobiasStore'

const tobiasStore = useTobiasStore()
const rotations = [2.6, 1.8, 0.8, -1.4, -2, -2.6]

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const cursor = ref(null)

let xSetter, ySetter
let mouseX, mouseY
let hovering = false

const props = defineProps({
  hover: String
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
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 100;

  .stamp {
    display: flex;
    line-height: 1;
    gap: .2em;

    &-up, &-down {
      text-align: center;
      flex-direction: column;
    }
  }
}
</style>