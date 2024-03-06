<template>
  <div class="section-separator font-size-sm">
    <div class="section-title" ref="separatorTitle">
      <slot/>
    </div>
    <div class="section-separator-line mb-row" ref="separatorLine"></div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import CustomEase from "gsap/CustomEase"

let anim = null
const separatorTitle = ref(null)
const separatorLine = ref(null)

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

function animateSeparator() {
  anim = gsap.timeline({delay: props.delay, defaults: { ease: CustomEase.create("custom", "M0,0,C0.084,0.6,0.194,0.892,0.548,0.968,0.667,0.993,0.831,1,1,1"),}})
  anim.to(separatorTitle.value, {
    opacity: 1,
    y: 0,
    duration: .35,
    stagger: .1
  })
  anim.to(separatorLine.value,
  {
    width: '100%',
    duration: 1,
  }, '<0.1')
}
</script>

<style lang="scss">
.section-separator {
  .section-title {
    opacity: 0;
    transform: translateY(30px);
    display: flex;
    width: 100%;
  }

  &-line {
    margin-top: .5em;
    height: 2px;
    width: 0;
    background: var(--foreground);
  }
}
</style>
