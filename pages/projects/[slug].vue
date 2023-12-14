<script setup>
import { onMounted } from 'vue'
import { useSergiStore } from '~/stores/sergiStore'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { pageTransition } from '@/helpers/transitionConfig'

const sergiStore = useSergiStore()
const { slug } = useRoute().params
const storyblokApi = useStoryblokApi()
const route = useRoute()
let locale = route.name.endsWith('en') ? 'en' : 'ca'

const { data } = await storyblokApi.get('cdn/stories/projects/' + slug, {
  language: route.name.endsWith('en') ? 'en' : 'ca'
})

const info = ref(null)
const page = ref(null)

const { year, month, day, time, fullMonth } = useDateFormatter(data.story.content.data)

definePageMeta({
  pageTransition: pageTransition,
})

useHead({
  title: 'imcarl.es – ' + data.story.content.title
})

useServerSeoMeta({
  description: data.story.content.title,
  ogDescription: data.story.content.title
})

onMounted(() => {
  /* gsap.registerPlugin(ScrollTrigger)  

  let st = ScrollTrigger.create({
    trigger: page.value,
    pin: info.value,
    start: "top top",
    end: "bottom bottom",
  }) */
})
</script>

<template>
  <div>
    <app-nav />
    <div class="p-md project-page" ref="page">
      <div class="project-page-info" ref="info">
        <h3>{{data.story.content.title}}</h3>
        <div class="mt-row font-size-sm mb-auto" v-html="renderRichText(data.story.content.description)"></div>
        <carl-link v-if="data.story.content.link[0]" to="/">{{data.story.content.link[0].displayName}}</carl-link>
      </div>
      <work-gallery :items="data.story.content.media" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-page {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: calc($col-gap * 2);

  &-info {
    display: flex;
    flex-direction: column;
    height: calc(100vh - $navbar-height - $padding-x-md * 2);
  }

  &-assets {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $col-gap;

    img, video {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
}

</style>
