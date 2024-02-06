<template>
  <div class="projects-section p-md" ref="projectsSection" @mouseenter="mouseenter()">
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
import gsap from 'gsap'
import scrollTrigger from 'gsap/ScrollTrigger'
import { ref, onMounted, onUnmounted } from 'vue'
import { useSergiStore } from '@/stores/sergiStore'

const sergiStore = useSergiStore()

const storyblokApi = useStoryblokApi()
const route = useRoute()
const { data } = await storyblokApi.get('cdn/stories/', {
  language: route.name.endsWith('en') ? 'en' : 'ca',
  starts_with: 'projects'
})

let projectsCtx
const projectsSection = ref(null)

onMounted(() => {
  gsap.registerPlugin(scrollTrigger)

  const clamp = gsap.utils.clamp(-0.12, 0.12)
  var clipSetter = gsap.quickSetter(".clip-path", "attr")

  projectsCtx = gsap.context(() => {
    const scroll = scrollTrigger.create({
      onUpdate: self => clipSetter({d: 'M1,0.03 c-0.5,' + clamp(self.getVelocity() / -50000) + ',-1,0,-1,0 V0.97 s0.485,' + clamp(self.getVelocity() / -50000) + ',1,0' })
      //onUpdate: self => gsap.set('.clip-path', { attr: {d: 'M1,0.03 c-0.5,' + clamp(self.getVelocity() / -50000) + ',-1,0,-1,0 V0.97 s0.485,' + clamp(self.getVelocity() / -50000) + ',1,0' }})
    })
  }, projectsSection.value)
})

function mouseenter() {
  sergiStore.cursorState = 'project'
}

onUnmounted(() => {
  projectsCtx.revert()
})
</script>

<style lang="scss" scoped>
.projects-section {
  &-separator {
    margin-top: .5em;
    height: 2px;
    width: 100%;
    background: var(--foreground);
  }

  &-grid {
    row-gap: calc($col-gap * 0.5)
  }
}
</style>