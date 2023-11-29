<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

let activeSlide = ref(0)
const slideLength = 2
const imageSwitcher = ref(null)

function loopSlides() {
  if ((activeSlide.value + 1) < slideLength) {
    activeSlide.value = activeSlide.value + 1
  } else {
    activeSlide.value = 0
  }
}

const props = defineProps({
  images: {
    type: Array,
    default: ['', '']
  }
})

onMounted(() => {
  setInterval(loopSlides, 3000)
})
</script>

<template>
  <div class="image-switcher" ref="imageSwitcher">
		<Transition name="slide-up">
      <div class="slide slide-a" v-if="activeSlide === 0">
        <img class="image1" ref="image1" :src="props.images[0] + '/m/1400x0'" alt="">
      </div>
      <div class="slide slide-b" v-else-if="activeSlide === 1">
        <img class="image2" ref="image2" :src="props.images[1] + '/m/1400x0'" alt="">
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
.image-switcher {
  display: flex;
  position: relative;
  overflow: hidden;
  justify-content: center;
  width: 100%;
  height: 60vh;
  z-index: 20;

  .slide {
    max-width: 100%;
    max-height: 60vh;
    position: absolute;
    margin: 0 auto;

    img {
      max-width: 70vw;
      max-height: 60vh;
      object-fit: contain;
    }
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all .85s;
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-leave-to {
  transform: translateY(-100%);
}

@media (max-width: $sm-breakpoint)  {
  .image-switcher {
    height: 50vh;
    align-items: center;

    .slide {
      height: 50vh;
      max-width: 100%;

      img {
        height: 50vh;
        max-width: 100%;
        padding: 0 $padding-x-md;
      }
    }
  }
}
</style>