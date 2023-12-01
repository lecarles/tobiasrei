<template>
  <a class="carl-link" :href="props.to">
    <div class="link-text"><span class="arrow-left">→</span><slot></slot></div>
    <div class="arrow-right ml-auto">→</div>
  </a>
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
.carl-link {
  display: flex;
  width: 100%;
  border-top: 1px solid var(--black);
  border-bottom: 1px solid var(--black);
  padding: .5em 0 .5em;
  overflow: hidden;

  .link-text {
    transform: translateX(-1.05em);
  }

  .arrow-right, .link-text {
    transition: ease .25s;
  }

  .arrow-left {
    margin-right: .5em;
  }

  &:hover {
    .arrow-right {
      transform: translateX($padding-x-md);
    }

    .link-text {
      transform: translateX(0);
    }
  }
}
</style>