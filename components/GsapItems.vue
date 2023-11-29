<template>
  <div class="gsap-items" ref="gsapItems">
    <slot></slot>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import CustomEase from "gsap/CustomEase"

let anim = null
const gsapItems = ref(null)

const props = defineProps({
  delay: {
    type: Number,
    default: 0
  },
})

onMounted(() => {
  gsap.registerPlugin(CustomEase)
  animate()
  anim.tweenFromTo(0, 'enter')
})

function animate() {
  anim = gsap.timeline({paused: true, delay: props.delay, defaults: { ease: CustomEase.create("custom", "M0,0,C0.084,0.6,0.194,0.892,0.548,0.968,0.667,0.993,0.831,1,1,1"),}})
  anim.to(gsapItems.value, {
    opacity: 1,
    duration: .1
  })
  anim.to(gsapItems.value.children,
  {
    y: 0,
    duration: 1,
    stagger: 0.1,
  }, '>')
  anim.addLabel('enter', '>')
  anim.fromTo(gsapItems.value.children, {
    y: 0,
  },
  {
    y: '-150%',
    duration: 1,
    stagger: 0.1,
  })
}
</script>

<style lang="scss">
.gsap-items {
  overflow: hidden;
  opacity: 0;
  padding-top: .1em;
}
</style>
