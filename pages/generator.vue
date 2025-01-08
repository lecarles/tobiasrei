<template>
  <div>
    {{ photoPositions }}
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

let photoPositions = ref([])
let positionsX = ['left', 'right'] 
let positionsY = ['top', 'bottom']
let rowSizes = [3, 4]
let colSizes = [4, 5, 6]
let rowPositions = [1, 2]
let colPositions = [1, 2, 3, 4]

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

onMounted(() => {
  for(let i = 0; i < 80; i++) {
    let colSize = colSizes[Math.floor(Math.random() * colSizes.length)]
    let colPosition = colPositions[Math.floor(Math.random() * colPositions.length)]
    let rowSize = rowSizes[Math.floor(Math.random() * rowSizes.length)]
    let rowPosition = rowPositions[Math.floor(Math.random() * rowPositions.length)]

    if (colPosition + colSize > 7) {
      colPosition = 7 - colSize
    }

    if (rowPosition + rowSize > 5) {
      rowPosition = 5 - rowSize
    }

    photoPositions.value.push({
      objectPosition: `${positionsX[Math.floor(Math.random() * positionsX.length)]} ${positionsY[Math.floor(Math.random() * positionsY.length)]}`,
      gridColumn: `${colPosition} / span ${colSize}`,
      gridRow: `${rowPosition} / span ${rowSize}`,
    })
  }
})
</script>

<style>

</style>