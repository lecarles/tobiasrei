<template>
  <div class="work-gallery">
    <!-- <work-gallery-slide v-for="(item, i) in props.items" :key="item.id" :item="item" :is-active-slide="activeSlide === i" /> -->
    {{ props.items }}
    <div class="work-gallery-nav work-gallery-nav-md">
      <button @click="setActiveSlide(activeSlide - 1)" @mouseover="prevMouseover()" @mouseleave="prevMouseleave()" />
      <button @click="setActiveSlide(activeSlide + 1)" @mouseover="nextMouseover()" @mouseleave="nextMouseleave()" />
    </div>
    <div class="work-gallery-nav work-gallery-nav-sm">
      <button @click="setActiveSlide(activeSlide + 1)" />
    </div>
    <div class="work-gallery-slide-number md-d-none sm-d-block">
      {{ activeSlide + 1 }} / {{ props.items.length }}
    </div>
    <div v-if="showTapMe" class="work-gallery-tap-me md-d-none sm-d-block">
      Toca'm!
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

let activeSlide = 0
let showTapMe = true

const props = defineProps({
  items: {
    type: Array,
    default: null
  }
})

onMounted (() => {
  activeSlide = 0
})

function setActiveSlide (i) {
  if (i < 0) {
    activeSlide = items.length - 1
  } else if (i < items.length) {
    activeSlide = i
  } else {
    activeSlide = 0
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
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;

  &-nav {
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20vw;
    position: absolute;

    button {
      appearance: none;
      border: none;
      outline: none;
      background: none;
      cursor: none;
    }

    &-sm {
      display: none;
    }
  }

  &-slide-number {
    mix-blend-mode: difference;
    color: $gray;
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: $padding-x-sm;
    left: 0;
    right: 0;
    z-index: 1;
  }

  &-tap-me {
    mix-blend-mode: difference;
    color: $magenta;
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
    grid-template-columns: 1fr;
    gap: 0;

    &-nav {
      &-sm {
        display: block;

        button {
          width: 100%;
          height: 100%;
        }
      }
      &-md {
        display: none;
      }
    }
  }
}
</style>
