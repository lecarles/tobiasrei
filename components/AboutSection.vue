<template>
  <div class="about-grid p-md mt-row-2">
    <div class="font-size-mdlg">
      {{ data.story.content.header }}
    </div>
    <div class="font-size-md about-grid-text" v-html="renderRichText(data.story.content.about)">
    </div>
  </div>
</template>

<script setup>
const storyblokApi = useStoryblokApi()
const route = useRoute()
const { data } = await storyblokApi.get('cdn/stories/home/', {
language: route.name.endsWith('es') ? 'es' : 'ca'
})
</script>

<style lang="scss">
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4em;

  &-text {
    margin: 0 auto;
  }

  p {
    margin-bottom: 1rem;
  }
}

@media (max-width: $sm-breakpoint) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}
</style>