<template>
  <img :src="image + '/m/1400x0'" alt="" :style="{
    gridColumn: tobiasStore.positions[photoIndex].gridColumn,
    gridRow: tobiasStore.positions[photoIndex].gridRow,
    objectPosition: tobiasStore.positions[photoIndex].objectPosition
  }">
</template>

<script setup>
import { useTobiasStore } from '@/stores/tobiasStore'
const tobiasStore = useTobiasStore()
let photoIndex = Math.floor(Math.random() * 80)

const props = defineProps({
  image: String,
})
</script>

<style>

</style>