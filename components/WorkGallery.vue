<template>
  <div class="work-gallery">
    <div clas="work-gallery-slide-wrapper">
      <work-gallery-slide v-for="(item, i) in props.items" :key="item.id" :item="item" :is-active-slide="activeSlide === i" />
      <div class="work-gallery-nav">
        <button @click="setActiveSlide(activeSlide - 1)" @mouseover="prevMouseover()" @mouseleave="prevMouseleave()" />
        <button @click="setActiveSlide(activeSlide + 1)" @mouseover="nextMouseover()" @mouseleave="nextMouseleave()" />
      </div>
    </div>
    <div class="work-gallery-slide-number">
      <carl-button @click="setActiveSlide(activeSlide - 1)">←</carl-button>
      <div>{{ activeSlide + 1 }} / {{ props.items.length }}</div>
      <carl-button @click="setActiveSlide(activeSlide + 1)">→</carl-button>
    </div>
    <div v-if="showTapMe" class="work-gallery-tap-me md-d-none sm-d-block">
      Toca'm!
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

let activeSlide = ref(0)
let showTapMe = true

const props = defineProps({
  items: {
    type: Array,
    default: null
  }
})

onMounted (() => {
  activeSlide.value = 0
})

function setActiveSlide (i) {
  if (i < 0) {
    activeSlide.value = props.items.length - 1
  } else if (i < props.items.length) {
    activeSlide.value = i
  } else {
    activeSlide.value = 0
  }

  showTapMe = false
}

function prevMouseover () {
  // EventBus.$emit('galleryPrevEnter')
}

function prevMouseleave () {
  // EventBus.$emit('galleryPrevExit')
}

function nextMouseover () {
  // EventBus.$emit('galleryNextEnter')
}

function nextMouseleave () {
  // EventBus.$emit('galleryNextExit')
}
</script>

<style lang="scss">
.work-gallery {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  gap: $padding-x-md;
  max-height: 100%;
  max-width: 100%;
  position: relative;

  &-slide-wrapper {
    position: relative;
  }

  &-nav {
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20vw;
    position: absolute;

    button {
      appearance: none;
      border: none;
      outline: none;
      background: none;
      cursor: pointer;
    }

    &-sm {
      display: none;
    }
  }

  &-slide-number {
    display: flex;
    color: var(--foreground);
    gap: 1em;
    align-self: center;
    justify-self: center;
    text-align: center;
    z-index: 1;
  }

  &-tap-me {
    mix-blend-mode: difference;
    color: var(--secondary);
    width: 100%;
    text-align: center;
    position: absolute;
    top: 15%;
    transform: rotate(-10deg);
    left: 0;
    right: 0;
    z-index: 1;
    font-size: $font-size-md;
  }
}
@media (max-width: $sm-breakpoint) {
  .work-gallery {
    gap: 0;
  }
}
</style>
