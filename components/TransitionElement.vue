<template>
  <div class="transition-elements">
    <div class="transition-element transition-element-green"></div>
    <div class="transition-element transition-element-gray"></div>
  </div>
</template>

<style lang="scss" scoped>
.transition-element {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: 10;
  overflow: hidden;
  height: 0;
  width: 100vw;

  &-green {
    background: var(--primary);
  }

  &-gray {
    background: var(--background);
  }
}
</style>