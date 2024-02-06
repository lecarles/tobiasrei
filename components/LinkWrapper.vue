<template>
  <div @mouseenter="enableHover()" @mouseleave="disableHover()" class="link-wrapper">
    <slot />
  </div>
</template>

<script setup>
import { useSergiStore } from '@/stores/sergiStore'

const sergiStore = useSergiStore()

function enableHover() {
  sergiStore.cursorHover = true
}

function disableHover() {
  sergiStore.cursorHover = false
}
</script>

<style lang="scss" scoped>
.link-wrapper {
  display: inherit;
}
</style>