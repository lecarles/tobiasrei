<template>
  <div class="projects-section p-md">
    <div class="projects-section-title font-size-sm">
      <div>
        <span>Projectes <sup>{{data.stories.length}}</sup></span>
      </div>
      <div class="projects-section-separator mb-row"></div>
    </div>
    <div class="projects-section-grid grid-3">
      <project-item v-for="project in data.stories" :key="project.uuid" :project="project"></project-item>
    </div>
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
.projects-section {
  &-separator {
    margin-top: .5em;
    height: 2px;
    width: 100%;
    background: var(--black);
  }

  &-grid {
    row-gap: calc($col-gap * 0.5)
  }
}
</style>