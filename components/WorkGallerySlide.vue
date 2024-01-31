<template>
  <div v-show="props.isActiveSlide" class="work-gallery-slide">
    <video v-if="props.item.filename.endsWith('mp4')" playsinline autoplay muted loop class="video">
      <source :src="props.item.filename" type="video/mp4">
    </video>
    <img v-else
      :src="props.item.filename"
      :alt="props.item.title"
    >
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: null
  },
  isActiveSlide: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.work-gallery-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  width: 100%;

  img, .video {
    aspect-ratio: 1;
    object-fit: contain;
    height: 100%;
    max-height: 100%;
    max-width: 100%;
  }
}
</style>
