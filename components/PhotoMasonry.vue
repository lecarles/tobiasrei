<template>
  <div class="photo-masonry">
      <div class="masonry-grid">
        <div class="masonry-grid-item" v-for="(image, i) in props.images" :key="image.filename">
          <div class="no">{{ i + 1 }}</div>
          <img :src="image.filename + '/m/400x0'">
        </div>
      </div>
      <div class="masonry-grid font-family-mono">
        <div class="masonry-grid-item" v-for="(image, i) in props.imagesV" :key="image.filename">
          <div class="no">{{ i + 1 }}</div>
          <img :src="image.filename + '/m/400x0'">
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import CustomEase from "gsap/CustomEase"
import { useTobiasStore } from '@/stores/tobiasStore'

const tobiasStore = useTobiasStore()

const props = defineProps({
  images: {
    type: Object,
    default: null
  },
  imagesV: {
    type: Object,
    default: null
  }
})
</script>

<style lang="scss" scoped>
.photo-masonry {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
  padding-top: 7em;
  font-size: .8em;
  background: white;
  height: 100%;
  overflow: auto;

  .masonry-grid {
    font-size: .92em;
  }
}

.masonry-grid {
  padding: $padding-x-md;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  column-gap: 6em;
  row-gap: 6em;
  justify-content: space-between;

  &::after {
  content: "";
  flex: auto;
  }

  &-item {
    width: auto;
    position: relative;
  }

  .no {
    top: -1.5em;
    left: .35em;
    position: absolute;
  }

  img {
    object-fit: contain;
    object-position: top left;
    width: 100%;
    height: 100%;
    max-width: max-content;
    max-height: 20vh;
  }
}
</style>