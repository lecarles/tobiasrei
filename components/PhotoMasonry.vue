<template>
  <div class="photo-masonry">
      <div class="masonry-grid masonry-grid-work font-size-xs">
        <button :class="['masonry-grid-item', `work-${i}`]" @mouseenter="handleEnter(`work-${i}`)" @mouseleave="handleLeave()" @click="$emit('masonryWork', getFakeI(i), i)" v-for="(image, i) in work.data.story.content.images" :key="image.filename">
          <div class="masonry-no"><div class="masonry-no-child">({{ i + 1 }})</div></div>
          <div class="masonry-img-wrapper"><img class="masonry-img" :src="image.filename + '/m/400x0'"></div>
        </button>
      </div>
      <div class="masonry-grid masonry-grid-diary font-size-xs-mono">
        <button :class="['masonry-grid-item', `diary-${i}`]" @mouseenter="handleEnter(`diary-${i}`)" @mouseleave="handleLeave()" @click="$emit('masonryDiary', i)" v-for="(image, i) in props.imagesV" :key="image.filename">
          <div class="masonry-no"><div class="masonry-no-child">({{ i + 1 }})</div></div>
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

const storyblokApi = useStoryblokApi()
const work = await storyblokApi.get('cdn/stories/work')

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

function handleEnter(id) {
  gsap.to('.masonry-grid-item', {opacity: 0.4, duration: 0.4})
  gsap.to(`.${id}`, {opacity: 1, duration: 0.4}, '<')
}

function handleLeave() {
  gsap.to('.masonry-grid-item', {opacity: 1, duration: 0.4})
}

function getFakeI(i) {
  //get index of item in props.images that has same filename as work.data.story.content.images[i].filename
  return props.images.findIndex(image => image.filename === work.data.story.content.images[i].filename)
}
</script>

<style lang="scss" scoped>
.photo-masonry {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
  padding-top: 7em;
  height: 100%;
}

.masonry-grid {
  padding: $padding-x-md;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  column-gap: 1.5em;
  row-gap: 6em;
  justify-content: space-between;

  &::after {
  content: "";
  flex: auto;
  }

  &-diary {
    padding-top: 6em;
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
    cursor: pointer;
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
    max-height: 22vh;
  }
}

.masonry-img-wrapper {
  overflow: hidden;  
}
</style>