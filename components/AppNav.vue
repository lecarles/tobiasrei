<template>
  <div class="app-nav font-size-sm" @mouseenter="handleMouse()">
    <div class="app-nav-primary">
      <div class="ml-col-2"><span>Tobias Rei</span>, <br>photographer based in Barcelona</div>
      <div class="font-family-mono underline" :style="{transform: `rotate(${rotations[getRandomInt(5)]}deg)`}"><a class="mr-1" href="mailto:hi@tobiasrei.com">hi@tobiasrei.com</a><a href="https://instagram.com/tobias.rei">@tobias.rei</a></div>
      <button @click="toggleMasonry()">show all</button>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { useTobiasStore } from '@/stores/tobiasStore'
import { ref, onMounted } from 'vue'

const tobiasStore = useTobiasStore()
const rotations = ref([2.6, 1.8, 1.1, -1.6, -2.1, -2.7])
let masTl = gsap.timeline({paused: true})
let showMasonry = ref(false)

onMounted(() => {
  masTl.set('.photo-masonry', {display: 'block'})
  masTl.set('.masonry-img', {yPercent: 150})
  masTl.set('.masonry-no-child', { yPercent: 100 })
  masTl.set('.carousels', { yPercent: 0 })
  masTl.to('.carousels', {yPercent: -120, duration: 1, ease: 'power4.out'})
  masTl.to('.masonry-img', {yPercent: 0, duration: 1, stagger: 0.02, ease: 'power4.out'}, '<0.25')
  masTl.to('.masonry-no-child', {yPercent: 0, duration: .5, stagger: 0.02, ease: 'power4.out'}, '<0.5')
  masTl.addLabel('show')
  masTl.set('.carousels', { yPercent: 120 })
  masTl.to('.masonry-no-child', {yPercent: -100, duration: .4, stagger: 0.012, ease: 'power4.out'})
  masTl.to('.masonry-img', {yPercent: -150, duration: 1, stagger: 0.02, ease: 'power4'}, '<0.1')
  masTl.to('.carousels', {yPercent: 0, duration: 1, ease: 'power4.out'}, '<0.5')
  masTl.set('.photo-masonry', {display: 'none'})
})

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function handleMouse() {
  tobiasStore.direction = 'nav'
}

function toggleMasonry() {
  showMasonry.value ? masTl.tweenFromTo('show', masTl.duration()) : masTl.tweenFromTo(0, 'show')
  showMasonry.value = !showMasonry.value
}

defineExpose({
  toggleMasonry
})
</script>

<style lang="scss" scoped>
.app-nav {
  z-index: 100;
  position: relative;

  &-primary {
    padding: 1em;
    position: fixed;
    top: 0;
  }
}
</style>