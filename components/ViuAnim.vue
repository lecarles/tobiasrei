<template>
  <div class="viu-anim p-md" ref="main">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 735 371.72" ref="svg">
      <path class="base" @mouseenter="enter(v1)" @mouseleave="exit(v1)" id="v1" d="M64.6,371.72H56.78L0,333v-7.81L176.1,64h7.82l56.78,38.67v7.82Z"/>
      <path class="base" @mouseenter="enter(v2)" @mouseleave="exit(v2)" id="v2" d="M109.24,333.25,290.89,63.75h7.82l56.78,38.68v7.81L208.19,328.72l-6.58,4.53Z"/>
      <path class="base" id="vt" d="M90.39,333.25l25.23-37.44-.4,37.44Z"/>
      <path class="base" @mouseenter="enter(i)" @mouseleave="exit(i)" id="i" d="M419,188.83h-7.82l-56.78-38.68v-7.81l38.68-57.19h7.82l56.78,38.67v7.82Zm-80.64-23h7.81L403,204.47v7.81L295.6,371.51h-7.82L231,332.84V325Z"/>  
      <path class="base" @mouseenter="enter(u1)" @mouseleave="exit(u1)" id="u1" d="M410.21,371.51h-7.82l-56.78-38.67V325L453,165.79h7.82l56.78,38.68v7.81Z"/>
      <path class="base" id="ut" d="M461.27,333.25H435.74l25.49-37.89Z" />
      <path class="base" @mouseenter="enter(u2)" @mouseleave="exit(u2)" id="u2" d="M632.39,204.47v7.81L525,371.51h-7.81l-56.37-38.26V324.4l107-158.61h7.82Z"/>
      <path class="base" @mouseenter="enter(p)" @mouseleave="exit(p)" id="p" d="M641.45,371.51h-7.82l-56.78-38.67V325l38.67-57.19h7.82l56.78,38.67v7.82Z"/>  
      <path class="ex" id="p-ex" d="M678.22,186.2,735,224.88v7.82L641.45,371.51h-7.82l-56.78-38.67V325L670.4,186.2Z"/>
      <path class="ex" id="u2-ex" d="M632.11,82l56.78,38.68v7.81L525,371.51h-7.81l-56.37-38.26V324.4L624.29,82Z"/>
      <path class="ex" id="u1-ex" d="M516.32,83l56.78,38.68v7.81l-162.89,242h-7.82l-56.78-38.67V325L508.5,83Z"/>
      <path class="ex" id="i-ex" d="M474.4,104.16h-7.81L409.81,65.48V57.66L447.23,1.47h7.82l56.78,38.68V48ZM400.7,85.29,457.48,124v7.81L295.6,371.51h-7.82L231,332.84V325L392.89,85.29Z"/>
      <path class="ex" id="v2-ex" d="M109.24,333.25,333.39,0h7.82L398,38.68v7.81L208.19,328.72l-6.58,4.53Z"/>
      <path class="ex" id="v1-ex" d="M226.67.21l56.78,38.68V46.7L64.6,371.72H56.78L0,333v-7.81L218.85.21Z"/>
    </svg>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, onUnmounted } from 'vue'
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import MorphSVGPlugin from "gsap/MorphSVGPlugin"
import CustomEase from "gsap/CustomEase"
import { useTransitionComposable } from '@/composables/transitionComposable'

const { transitionState } = useTransitionComposable()
const main = ref()
const svg = ref()

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(CustomEase)
  gsap.registerPlugin(MorphSVGPlugin)
})

watch(
  () => transitionState.transitionComplete,
  (newValue) => {
    if (newValue) {
      setupTimelines()
    }
  }
)

let v1, v2, i, u1, u2, p

function setupTimelines() {
  v1 = gsap.timeline({paused: true})
  v1.to('#v1', { 
    morphSVG:"#v1-ex",
    duration: 1
  })
  v1.addLabel('mid', '>')
  v1.to('#v1', {
    morphSVG:"#v1",
    duration: 1
  })

  v2 = gsap.timeline({paused: true})
  v2.to('#v2', { 
    morphSVG:"#v2-ex",
    duration: 1
  })
  v2.addLabel('mid', '>')
  v2.to('#v2', {
    morphSVG:"#v2",
    duration: 1
  })

  i = gsap.timeline({paused: true})
  i.to('#i', { 
    morphSVG:"#i-ex",
    duration: 1
  })
  i.addLabel('mid', '>')
  i.to('#i', {
    morphSVG:"#i",
    duration: 1
  })

  u1 = gsap.timeline({paused: true})
  u1.to('#u1', { 
    morphSVG:"#u1-ex",
    duration: 1
  })
  u1.addLabel('mid', '>')
  u1.to('#u1', {
    morphSVG:"#u1",
    duration: 1
  })

  u2 = gsap.timeline({paused: true})
  u2.to('#u2', { 
    morphSVG:"#u2-ex",
    duration: 1
  })
  u2.addLabel('mid', '>')
  u2.to('#u2', {
    morphSVG:"#u2",
    duration: 1
  })

  p = gsap.timeline({paused: true})
  p.to('#p', { 
    morphSVG:"#p-ex",
    duration: 1
  })
  p.addLabel('mid', '>')
  p.to('#p', {
    morphSVG:"#p",
    duration: 1
  })
}

function enter(letter) {
  if(transitionState.transitionComplete) {
    letter.tweenFromTo(0, 'mid', {ease: 'Power4.easeOut'})
  }
}

function exit(letter) {
  if (transitionState.transitionComplete) {
    letter.tweenTo(letter.duration(), {ease: 'Power4.easeOut'})
  }
}
</script>

<style lang="scss" scoped>
.viu-anim {
  position: relative;
  z-index: 1;
  height: calc(100vh - $navbar-height);
  height: calc((var(--vh, 1vh) * 100) - $navbar-height - $font-size-md * 1.1 - $font-size-md * 0.67);
  display: flex;
  align-items: flex-end;

  svg {
    fill: var(--primary);
    width: 97%;
    max-height: calc((var(--vh, 1vh) * 100) - $navbar-height - $font-size-md * 1.1 - $font-size-md * 0.67);
    transform: translateX(3.5%);
  }
}
.ex {
  display: none;
}


@media (max-width: $sm-breakpoint) {
  .viu-anim {
    height: calc((var(--vh, 1vh) * 100) - $padding-x-md * 2 - 24px - $font-size-md * 1.1 - $font-size-md * 0.67);
  }

}
</style>