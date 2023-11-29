<template>
  <div class="projects-section p-md grid-3">
    <project-item v-for="project in data.stories" :key="project.uuid" :project="project"></project-item>
  </div>
</template>

<script setup>
const storyblokApi = useStoryblokApi()
const route = useRoute()
const { data } = await storyblokApi.get('cdn/stories/', {
  language: route.name.endsWith('en') ? 'en' : 'ca',
  starts_with: 'projects'
})
</script>

<style lang="scss" scoped>

</style>