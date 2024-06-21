<template>
  <div class="photo-masonry">
      <div class="masonry-grid">
        <button class="masonry-grid-item" @click="$emit('masonryWork', i)" v-for="(image, i) in props.images" :key="image.filename">
          <div class="masonry-no"><div class="masonry-no-child">{{ i + 1 }}</div></div>
          <div class="masonry-img-wrapper"><img class="masonry-img" :src="image.filename + '/m/400x0'"></div>
        </button>
      </div>
      <div class="masonry-grid font-family-mono">
        <button class="masonry-grid-item" @click="$emit('masonryDiary', i)" v-for="(image, i) in props.imagesV" :key="image.filename">
          <div class="masonry-no"><div class="masonry-no-child">{{ i + 1 }}</div></div>
          <div class="masonry-img-wrapper"><img class="masonry-img" :src="image.filename + '/m/400x0'"></div>
        </button>
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
    font-family: inherit;
    font-weight: inherit;
    font-size: inherit;
    display: block;
    background: none;
    border: none;
    outline: none;
    appearance: none;
    width: auto;
    position: relative;
    padding: 0;
    margin: 0;
  }

  .masonry-no {
    top: -1.5em;
    left: .35em;
    position: absolute;
    overflow: hidden;
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

.masonry-img-wrapper {
  overflow: hidden;  
}
</style>