<template>
  <div @click="toggleDm">
    <carl-button>D</carl-button>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { useSergiStore } from '@/stores/sergiStore'

const sergiStore = useSergiStore()

function toggleDm() {
  if (!sergiStore.dark) {
    gsap.to("html", {"--background": "#0c0c0c", duration: .35});
    gsap.to("html", {"--foreground": "#f3f3f3", duration: .35});
    gsap.to("html", {"--primary": "rgb(150, 0, 200)", duration: .35});
    gsap.to("html", {"--secondary": "rgb(71, 221, 39)", duration: .35});
  } else {
    gsap.to("html", {"--background": "#f3f3f3", duration: .35});
    gsap.to("html", {"--foreground": "#0c0c0c", duration: .35});
    gsap.to("html", {"--primary": "rgb(71, 221, 39)", duration: .35});
    gsap.to("html", {"--secondary": "rgb(150, 0, 200)", duration: .35});
  }
  sergiStore.dark = !sergiStore.dark
}
</script>