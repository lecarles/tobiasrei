<template>
  <div class="cursor">

  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.cursor {
  mix-blend-mode: difference;
  background-color: var(--secondary);
  fill: var(--secondary);
  position: absolute;
  height: 250px;
  width: 250px;
  border-radius: 100%;
}
</style>