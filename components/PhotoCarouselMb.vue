<template>
  <div class="carousel-mb">
    <div class="photo-carousel-mb">
      <div ref="carouselMb" class="photo-container-mb" v-for="photo in props.images" :key="photo.category + photo.order">
        <photo-item :image="photo.filename" isMb/>
      </div>
    </div>
    <div class="pos-container">
      <transition mode="out-in" name="key">
        <div :key="activeIndex" :class="['font-size-sm-mono position-indicator', `position-indicator-${props.images[activeIndex].category}`]">
          {{ cap(props.images[activeIndex].category) }}
          ({{ props.images[activeIndex].order }} / 24)
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import CustomEase from "gsap/CustomEase"
import horizontalLoop from '@/helpers/horizontalLoop'

const carouselMb = ref(null)
let loopMb = null
let activeIndex = ref(0)


function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const current = computed(() => {
  if(!loopMb) {
    return 0
  } else {
    return loopMb.current()
  }
})


const props = defineProps({
  images: {
    type: Object,
    default: null
  },
})

onMounted(() => {
  gsap.registerPlugin(Draggable)
  gsap.registerPlugin(InertiaPlugin)
  gsap.registerPlugin(CustomEase)

  gsap.to('.pos-container', {
    duration: .5,
    opacity: 1
  })

  setupLoop()
})

function setupLoop() {
  loopMb = horizontalLoop(carouselMb.value, {
    paused: true, 
    draggable: true,
    onChange: (element, index) => { 
      activeIndex.value = index
    }
  })
}
</script>

<style lang="scss" scoped>
.carousel-mb {
  position: relative;
}

.pos-container {
  opacity: 0;
}


.position-indicator {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  padding: $padding-x-md;
  bottom: 0;
  z-index: 10000;
}

.photo-carousel-mb {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 100vw;
  grid-auto-flow: column;
  position: absolute;
  inset: 0;
  height: 100dvh;
  overflow: hidden;

  .photo-container-mb {
    display: grid;
    height: 100dvh;
    width: 100dvw;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    position: relative;
    padding: 6rem 2rem 3.5rem 2rem;
    align-items: center;
    justify-content: center;
    align-content: center;

    img {
      grid-row: 1;
      grid-column: 1;
      width: 100%;
      height: 100%;
    }
  }
}
</style>