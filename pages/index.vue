<script setup>
useSeoMeta({
  title: 'Circuit Viu',
  ogTitle: 'Circuit Viu',
  description: "El Circuit Viu és un projecte que naix l’any 2020 amb uns objectius molt clars: reivindicar la importància de les sales de música en directe com a llocs primordials en la cadena de valor cultural de les ciutats i els territoris, visibilitzar la seua activitat a través d’una programació conjunta i dinamitzar l’escena musical valenciana.",
  ogDescription: "El Circuit Viu és un projecte que naix l’any 2020 amb uns objectius molt clars: reivindicar la importància de les sales de música en directe com a llocs primordials en la cadena de valor cultural de les ciutats i els territoris, visibilitzar la seua activitat a través d’una programació conjunta i dinamitzar l’escena musical valenciana.",
  ogImage: 'https://a.storyblok.com/f/243306/2149x1080/3bba475e90/fons-taronja.png',
})

import { pageTransition } from '@/helpers/transitionConfig'

definePageMeta({
  pageTransition: pageTransition,
})
</script>

<template>
  <div>
    <viu-anim />
    <marquee-line />
    <concerts-list></concerts-list>
    <marquee-viu class="mt-row marquee-viu-intro"/>
    <about-section />
    <app-footer />
  </div>
</template>

<style lang="scss">
.intro-section {
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .logo-video {
    width: 75%;
    max-width: clamp(420px, 30vw, 1080px);
  }
}

.marquee-viu-intro {
  padding: 3em 0;
}
</style>
