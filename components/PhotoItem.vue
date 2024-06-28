<template>
  <img :src="image + '/m/1400x0'" alt="" ref="img">
</template>

<script setup>
import gsap from 'gsap'
import { useTobiasStore } from '@/stores/tobiasStore'
import { onMounted, ref } from 'vue'

const tobiasStore = useTobiasStore()
let photoIndex = ref(Math.floor(Math.random() * 80))
const img = ref(null)

onMounted(() => {
  gsap.set(img.value, {
    gridColumn: props.isMb ? tobiasStore.positionsMb[photoIndex.value].gridColumn : tobiasStore.positions[photoIndex.value].gridColumn,
    gridRow: props.isMb ? tobiasStore.positionsMb[photoIndex.value].gridRow : tobiasStore.positions[photoIndex.value].gridRow,
    objectPosition: props.isMb ? tobiasStore.positionsMb[photoIndex.value].objectPosition : tobiasStore.positions[photoIndex.value].objectPosition
  })

  gsap.to(img.value, {
    duration: .5,
    opacity: 1
  })
})

const props = defineProps({
  image: String,
  isMb: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
img {
  object-fit: contain;
  height: 100%;
  width: 100%;
  opacity: 0;
}
</style>