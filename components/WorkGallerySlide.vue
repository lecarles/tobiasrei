<template>
  <div v-show="props.isActiveSlide" class="work-gallery-slide">
    <video v-if="props.item.filename.endsWith('mp4')" playsinline autoplay muted loop disableRemotePlayback class="video">
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;


  img, .video {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    aspect-ratio: 1;
    object-fit: contain;
    height: 100%;
    width: 100%;
  }
}
</style>
