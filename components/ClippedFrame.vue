<template>
  <div class="clipped-image-wrapper">
    <svg class="svg">
      <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
        <path class="clip-path" ref="clipPath" d="M1,0.03 c-0.5,0,-1,0,-1,0 V0.97 s0.485,0,1,0" />
      </clipPath>
    </svg>
    <div class="clipped-frame">
        <slot />
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import scrollTrigger from 'gsap/ScrollTrigger'
import { ref, onMounted } from 'vue'

let tl 
const clipPath = ref(null)

  onMounted (() => {
    gsap.registerPlugin(scrollTrigger)
    clipScroll()
  })

  function clipScroll () {
    const clamp = gsap.utils.clamp(-0.12, 0.12)

    const scroll = scrollTrigger.create({
      onUpdate: self => gsap.set(clipPath.value, { attr: {d: 'M1,0.03 c-0.5,' + clamp(self.getVelocity() / -50000) + ',-1,0,-1,0 V0.97 s0.485,' + clamp(self.getVelocity() / -50000) + ',1,0' }})
    })
  }
</script>

<style lang="scss" scoped>
.clipped-image-wrapper {
  width: 100%;
}

.svg {
  position: absolute;
  width: 0;
  height: 0;
}

.clipped-frame {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  aspect-ratio: 0.94;
  box-sizing: border-box;
  -webkit-clip-path: url(#my-clip-path);
  clip-path: url(#my-clip-path);

  * {
    width: 100%;
  }

  img {
    width: 100%;
    object-fit: cover;
    background-size: cover;
  }
}

</style>
