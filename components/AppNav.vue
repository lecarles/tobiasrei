<template>
  <div class="app-nav font-size-sm" @mouseenter="handleMouse()">
    <div class="app-nav-primary">
      <div>Tobias Rei, photographer based in Barcelona</div>
      <div><a class="mr-1" href="mailto:hi@tobiasrei.com">hi@tobiasrei.com</a><a href="https://instagram.com/tobias.rei">@tobias.rei</a></div>
    </div>
  </div>
</template>

<script setup>
import { useTobiasStore } from '@/stores/tobiasStore'
const tobiasStore = useTobiasStore()

function handleMouse() {
  tobiasStore.direction = 'nav'
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