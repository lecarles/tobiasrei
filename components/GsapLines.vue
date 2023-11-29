<template>
  <div class="gsap-lines" :id="id" ref="gsapLines">
    <slot></slot>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import CustomEase from "gsap/CustomEase"
import { SplitText } from "gsap/SplitText"

let anim = null
const gsapLines = ref(null)
let splitLines = null
let splitParent = null

const props = defineProps({
  id: {
    type: String,
    default: ''
  },

  delay: {
    type: Number,
    default: 0
  }
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(SplitText)
  gsap.registerPlugin(CustomEase)

  splitParent = new SplitText(gsapLines.value, { type: "lines", linesClass: "gsap-line-parent" })
  splitLines = new SplitText(splitParent.lines, { type: 'lines', linesClass: 'gsap-line' })
  animateLetters()
})

function animateLetters() {
  anim = gsap.timeline({scrollTrigger: gsapLines.value, delay: props.delay, defaults: { ease: CustomEase.create("custom", "M0,0,C0.084,0.6,0.194,0.892,0.548,0.968,0.667,0.993,0.831,1,1,1"),}})
  anim.to(gsapLines.value, {
    opacity: 1,
    duration: .1
  })
  anim.fromTo(splitLines.lines, {
    y: '250%',
  },
  {
    y: 0,
    duration: 1,
    stagger: 0.15,
  }, '>')
}
</script>

<style lang="scss">
.gsap-line-parent {
  width: 100%;
  overflow: hidden;
  padding: .1em 0 .2em 0;
}

.gsap-lines {
  opacity: 0;
}
</style>
