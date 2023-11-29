<template>
  <div class="concert-grid">
    <concert-link :concert="concert" :i="i" v-for="(concert, i) in data.stories" :key="concert._uuid"></concert-link>
  </div>
</template>

<script setup>
const storyblokApi = useStoryblokApi()
const { data } = await storyblokApi.get('cdn/stories', {
  version: 'draft',
  starts_with: 'concerts',
  sort_by: 'content.data:asc'
})
</script>

<style lang="scss" scoped>
.concert-grid {
  margin: 5vh 0;
  display: grid;
  gap: .45rem;
  width: 100%;
  text-align: center;
  justify-items: start;
  padding: $padding-y-md $padding-x-md $padding-y-md;
  box-sizing: border-box;
}
</style>