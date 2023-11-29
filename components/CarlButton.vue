<template>
  <nuxt-link class="carl-button" :to="localePath(props.to)">
    <slot></slot>
  </nuxt-link>
</template>

<script setup>
const localePath = useLocalePath()
const props = defineProps({
  to: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.carl-button {
  border: 1px solid var(--black);
  border-radius: 10em;
  padding: .25em .75em;
}
</style>