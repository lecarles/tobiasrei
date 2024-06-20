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
const tobiasStore = useTobiasStore()

const rotations = [2.6, 1.8, 1.1, -1.6, -2.1, -2.7]

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function handleMouse() {
  tobiasStore.direction = 'nav'
}

function toggleMasonry() {
  gsap.set('.photo-masonry', {display: 'block'})
}
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