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
let sizes = [4, 5, 6]
let positions = [1, 2, 3, 4]

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

onMounted(() => {
  for(let i = 0; i < 80; i++) {
    let colSize = sizes[Math.floor(Math.random() * sizes.length)]
    let colPosition = positions[Math.floor(Math.random() * positions.length)]
    let rowSize = sizes[Math.floor(Math.random() * sizes.length)]
    let rowPosition = positions[Math.floor(Math.random() * positions.length)]

    /* if (colSize === 2 && rowSize === 2) {
      getRandomInt(2) === 0 ? colSize = 3 : rowSize = 3
    } */

    if (colPosition + colSize > 6) {
      colPosition = 6 - colSize
    }

    if (rowPosition + rowSize > 6) {
      rowPosition = 6 - rowSize
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