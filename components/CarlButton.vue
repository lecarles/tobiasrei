<template>
  <nuxt-link :to="localePath(props.to)">
      <div class="carl-button" ref="btn" @mousemove="handleMove($event)">
        <div class="carl-button-slot"><slot></slot></div>
        <div class="circle" ref="circle"></div>
      </div>
  </nuxt-link>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import CustomEase from "gsap/CustomEase"
import { useSergiStore } from '~/stores/sergiStore'

const circle = ref(null)
const btn = ref(null)
let xTo, yTo 

const sergiStore = useSergiStore()

onMounted(() => {
  gsap.registerPlugin(CustomEase) 
  xTo = gsap.quickTo(circle.value, "left", {duration: .01})
  yTo = gsap.quickTo(circle.value, "top", {duration: .01})
})

const localePath = useLocalePath()
const props = defineProps({
  to: {
    type: String,
    default: ''
  }
})

function handleMove(e) {
  let w = circle.value.getBoundingClientRect().width/2
  let h = circle.value.getBoundingClientRect().height/2
  xTo(e.offsetX - w)
  yTo(e.offsetY - h)
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
  overflow: hidden;
  border: 1px solid var(--black);
  border-radius: 10em;
  transition: .1s ease;
  align-items: center;
  justify-content: center;

  &-slot {
    padding: .25em .75em;
  }

  &:hover {
    color: var(--white);
    .circle {
      height: 10em;
      width: 10em;
    }
  }

  .circle {
    background: var(--black);
    height: 1em;
    width: 1em;
    border-radius: 100%;
    position: absolute;
    z-index: -1;
    margin: 0 auto;
    transition: .5s ease;
  }
}
</style>