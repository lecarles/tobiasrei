<template>
  <div class="app-nav font-size-sm" @mouseenter="handleMouse()">
    <div class="app-nav-primary">
      <div class="tobias-rei"><span>Tobias Rei</span>, photographer based in Barcelona</div>
      <div class="font-size-sm-mono underline nav-links"><a class="mr-1" href="mailto:hi@tobiasrei.com">hi@tobiasrei.com</a><a href="https://instagram.com/tobias.rei">@tobias.rei</a></div>
    </div>
    <div class="app-nav app-nav-show-all">
      <button class="toggle-btn" @click="toggleMasonry()">
        <div class="toggle-btn-child toggle-btn-all">(Show all)</div>
        <div class="toggle-btn-child toggle-btn-single">(Show single)</div>
      </button>
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
  gsap.set('.nav-links', {
    rotation: rotations.value[getRandomInt(5)]
  })

  gsap.to('.app-nav', {
    duration: .65,
    opacity: 1
  })

  masTl.set('.photo-masonry', {display: 'block'})
  masTl.set('.masonry-img', {yPercent: 150})
  masTl.set('.masonry-no-child', { yPercent: 110 })
  masTl.set('.carousels', { yPercent: 0 })
  masTl.to('.toggle-btn-all', {yPercent: -110, duration: .5, ease: 'power4.out'})
  masTl.to('.carousels', {yPercent: -110, duration: 1.2, ease: 'power4.out'}, '<0.2')
  masTl.to('.masonry-img', {yPercent: 0, duration: 1, stagger: 0.02, ease: 'power4.out'}, '<0.25')
  masTl.to('.masonry-no-child', {yPercent: 0, duration: .5, stagger: 0.02, ease: 'power4.out'}, '<0.5')
  masTl.to('.toggle-btn-single', {y: 0, duration: .65, ease: 'power4.out'}, '<0.25')
  masTl.addLabel('show')
  masTl.set('.toggle-btn-all', { yPercent: 120 })
  masTl.set('.carousels', { yPercent: 120 })
  masTl.to('.toggle-btn-single', {yPercent: -110, duration: .65, ease: 'power4.out'})
  masTl.to('.masonry-no-child', {yPercent: -100, duration: .4, stagger: 0.012, ease: 'power4.out'}, '<0.1')
  masTl.to('.masonry-img', {yPercent: -120, duration: .7, stagger: 0.01, ease: 'power4'}, '<0.1')
  masTl.to('.carousels', {yPercent: 0, duration: .9, ease: 'power4.out'}, '<0.8')
  masTl.set('.photo-masonry', {display: 'none'})
  masTl.to('.toggle-btn-all', {yPercent: 0, duration: .65, stagger: 0.02, ease: 'power4.out'}, '<0.1')
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
  opacity: 0;

  .tobias-rei {
    max-width: 20ch;
    margin-bottom: .5em;
  }

  .toggle-btn {
    height: 1.2em;
    width: 12ch;
    position: relative;

    &-child {
      position: absolute;
      top: 0;
      right: 0;
    }

    &-single {
      transform: translateY(100%);
    }
  }

  &-primary {
    padding: 1em;
    position: fixed;
    top: 0;
  }

  &-show-all {
    padding: 1em;
    position: fixed;
    top: 0;
    right: 0;

    button {
      overflow: hidden;
      display: flex;
      appearance: none;
      font-family: inherit;
      color: inherit;
      padding: 0;
      margin: 0;
      border: none;
      background: none;
      cursor: pointer;
      font-size: inherit;
      font-weight: inherit;
      outline: none;
    }
  }
}

@media (max-width: $sm-breakpoint) {
  .app-nav {
    &-show-all {
      display: none;
    }
  }
}
</style>