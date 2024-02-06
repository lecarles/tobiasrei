<script setup>
import { useSergiStore } from '@/stores/sergiStore'

const sergiStore = useSergiStore()
const localePath = useLocalePath()
const props = defineProps({
  project: {
    type: Object,
    default: null
  }
})

function enableHover() {
  sergiStore.cursorHover = true
}

function disableHover() {
  sergiStore.cursorHover = false
}
</script>

<template>
  <div @mouseenter="enableHover()" @mouseleave="disableHover()">
    <nuxt-link class="project-item" :to="props.project.full_slug">
      <clipped-frame>
        <template v-if="props.project.content.featuredMedia.filename">
          <video v-if="props.project.content.featuredMedia.filename.endsWith('mp4')" :src="props.project.content.featuredMedia.filename" autoplay muted loop playsinline></video>
          <img v-else :src="props.project.content.featuredMedia.filename">
        </template>
      </clipped-frame>    
      <div class="project-item-title">{{props.project.content.title}}</div>
    </nuxt-link>
  </div>
</template>


<style lang="scss" scoped>
.project-item {
  display: flex;
  flex-direction: column;
  gap: .25em;

  img, video {
    object-fit: cover;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
  }
}
</style>