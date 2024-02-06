<template>
  <nuxt-link :to="localePath(props.to)">
      <div class="carl-button" ref="btn" @mouseenter="enableHover()" @mouseleave="disableHover()">
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
})

const localePath = useLocalePath()
const props = defineProps({
  to: {
    type: String,
    default: ''
  }
})

function enableHover() {
  sergiStore.cursorHover = true
}

function disableHover() {
  sergiStore.cursorHover = false
}
</script>

<style lang="scss" scoped>
.carl-button {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--foreground);
  border-radius: 10em;
  transition: .1s ease;
  align-items: center;
  justify-content: center;

  &-slot {
    padding: .25em .75em;
  }

  &:hover {
    color: var(--background);
    .circle {
      height: 100%;
    }
  }

  .circle {
    background: var(--foreground);
    height: 0;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    z-index: -1;
    margin: 0 auto;
    transition: height .2s ease;
  }
}
</style>