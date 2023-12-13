<template>
  <div v-show="props.isActiveSlide" class="work-gallery-slide" :style="props.item.fields.description">
    <img
      v-if="props.item.fields.file.contentType.startsWith('image')"
      :src="props.item.fields.file.url"
      :alt="props.item.fields.file.title"
    >
    <video v-else autoplay muted loop class="video">
      <source :src="props.item.fields.file.url" type="video/mp4">
    </video>
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
  padding: calc($padding-y-md * 2) $padding-y-md;
  width: 100%;

  img, .video {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}
</style>
