<template>
  <img :src="image + '/m/1400x0'" alt="" :style="{
    gridColumn: props.isMb ? tobiasStore.positionsMb[photoIndex].gridColumn : tobiasStore.positions[photoIndex].gridColumn,
    gridRow: props.isMb ? tobiasStore.positionsMb[photoIndex].gridRow : tobiasStore.positions[photoIndex].gridRow,
    objectPosition: props.isMb ? tobiasStore.positionsMb[photoIndex].objectPosition : tobiasStore.positions[photoIndex].objectPosition
  }">
</template>

<script setup>
import { useTobiasStore } from '@/stores/tobiasStore'
import { onMounted } from 'vue';

const tobiasStore = useTobiasStore()
let photoIndex = Math.floor(Math.random() * 80)

onMounted(() => {
  photoIndex = Math.floor(Math.random() * 80)
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
}
</style>