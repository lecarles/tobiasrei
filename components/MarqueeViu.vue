<template>
  <div class="marquee-wrapper">
    <div class="marquee-viu" ref="marquee">
      <div ref="inner" class="marquee-inner-viu" aria-hidden="true">
        <div class="marquee-part-viu">
          <viu-anim-yoyo-b />
        </div>
        <div class="marquee-part-viu">
          <viu-anim-yoyo-b />
        </div>
        <div class="marquee-part-viu">
          <viu-anim-yoyo-b />
        </div>
        <div class="marquee-part-viu">
          <viu-anim-yoyo-b />
        </div>
        <div class="marquee-part-viu">
          <viu-anim-yoyo-b />
        </div>
        <div class="marquee-part-viu">
          <viu-anim-yoyo-b />
        </div>
        <div class="marquee-part-viu">
          <viu-anim-yoyo-b />
        </div>
        <div class="marquee-part-viu">
          <viu-anim-yoyo-b />
        </div>
        <div class="marquee-part-viu">
          <viu-anim-yoyo-b />
        </div>
        <div class="marquee-part-viu">
          <viu-anim-yoyo-b />
        </div>
        <div class="marquee-part-viu">
          <viu-anim-yoyo-b />
        </div>
        <div class="marquee-part-viu">
          <viu-anim-yoyo-b />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { watch, ref } from 'vue'
import { useTransitionComposable } from '@/composables/transitionComposable'

const { transitionState } = useTransitionComposable()

let inner = ref(null)
let marquee = ref(null)

watch(
  () => transitionState.transitionComplete,
  (newValue) => {
    if (newValue) {
      runMarquee()
    }
  }
)
  
function  runMarquee () {
  gsap.to(marquee.value, {
    y: 0,
    duration: .6,
    ease: 'Power4.InOut'
  })
  const tween = gsap.to('.marquee-part-viu', { xPercent: -100, repeat: -1, duration: 3, ease: 'linear' }).totalProgress(0.5)

  gsap.set('.marquee-inner-viu', { xPercent: -50 })
}
</script>

<style lang="scss" scoped>
.marquee-part-viu {
  display: inline;
  flex-shrink: 0;
  font-smooth: always;
  line-height: 1.1;
}

.marquee-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
}
.marquee-viu {
  position: relative;
  z-index: 1;
  transform: scale(1.2) translateY(100%);
  pointer-events: none;
  font-size: $font-size-md;
  perspective-origin: center;
  overflow: hidden;
}

.marquee-inner-viu {
  -webkit-font-smoothing: antialiased;
  width: fit-content;
  display: flex;
  flex: auto;
  flex-direction: row;
}

</style>
