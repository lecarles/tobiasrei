<template>
  <div class="section-separator font-size-sm" ref="sectionSeparator">
    <div class="section-title">
      <slot/>
    </div>
    <div class="section-separator-line mb-row"></div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import CustomEase from "gsap/CustomEase"
import { SplitText } from "gsap/SplitText"

let anim = null
const sectionSeparator = ref(null)

const props = defineProps({
  delay: {
    type: Number,
    default: 0
  }
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(CustomEase)

  animateSeparator()
})

function animateLetters() {
  anim = gsap.timeline({delay: props.delay, defaults: { ease: CustomEase.create("custom", "M0,0,C0.084,0.6,0.194,0.892,0.548,0.968,0.667,0.993,0.831,1,1,1"),}})
  anim.to(gsapLines.value, {
    opacity: 1,
    duration: .01
  })
  anim.fromTo(splitLines.lines, {
    y: '60%',
  },
  {
    y: 0,
    duration: 1,
    stagger: 0.15,
  })
  anim.to(splitLines.lines, {
    opacity: 1,
    duration: .5,
    stagger: .1
  }, '<0.1')
}
</script>

<style lang="scss">
.section-separator {
  &-line {
    margin-top: .5em;
    height: 2px;
    width: 100%;
    background: var(--foreground);
  }
}
</style>
