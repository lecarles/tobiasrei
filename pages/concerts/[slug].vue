<script setup>
import { onMounted } from 'vue'
import { useSergiStore } from '~/stores/sergiStore'
import gsap from 'gsap'
import { concertTransition } from '~/helpers/transitionConfig';

definePageMeta({
  pageTransition: concertTransition,
})

const sergiStore = useSergiStore()
const { slug } = useRoute().params
const storyblokApi = useStoryblokApi()
const route = useRoute()
const { data } = await storyblokApi.get('cdn/stories/concerts/' + slug, {
  language: route.name.endsWith('es') ? 'es' : 'ca'
})
let locale = route.name.endsWith('es') ? 'es' : 'ca'

const { year, month, day, time, fullMonth } = useDateFormatter(data.story.content.data)

useHead({
  title: data.story.content.artist1 + ' - ' +  data.story.content.sala + ', ' + data.story.content.localitat
})

useServerSeoMeta({
  description: data.story.content.artist1 + ' - ' +  data.story.content.sala + ', ' + data.story.content.localitat,
  ogDescription: 'Concert de ' + data.story.content.artist1 + ' a ' +  data.story.content.sala + ', ' + data.story.content.localitat
})

onMounted(() => {
  gsap.set('html', {
    "--primary": sergiStore.colors[data.story.content.color],
  })
  gsap.set('html', {
    "--background": sergiStore.colors[data.story.content.bgcolor],
  })
  let color = (data.story.content.bgcolor === 'purple' ||  data.story.content.bgcolor === 'green') ? sergiStore.colors['white'] : sergiStore.colors['black']
  gsap.set('html', {
    "--secondary": color,
  })
})
</script>

<template>
  <div class="concert-page">
    <div class="concert-main">
      <div class="p-md concert-info grid-1">
        <div class="concert-artists font-size-xl secondary">
          <div class="concert-artists-line"><div class="concert-artist">{{data.story.content.artist1}}</div></div>
          <div class="concert-artists-line" v-if="data.story.content.artist2"><div class="concert-artist"> + {{data.story.content.artist2}}</div></div>
        </div>
        <div class="concert-data font-size-md secondary">
          <div class="concert-data-temporal">
            <div class="concert-date">{{ day }} {{ fullMonth[locale] }}</div>
            <div class="concert-time">{{ time }}H</div>
          </div>
          <div class="font-size-md j-self-center button-container">
            <a v-if="data.story.content.entrades" target="_blank" :href="data.story.content.entrades" class="button j-self-center">{{ $t('tickets') }}</a>
            <span v-else class="button disabled">{{ $t('soon') }}</span>
          </div>
          <div class="concert-data-space">
            <div class="concert-venue">{{ data.story.content.sala }}</div>
            <div class="concert-city">{{ data.story.content.localitat }}</div>
          </div>
        </div>
      </div>
      <div class="img-wrapper" v-if="data.story.content.imatgeartista1.filename">
        <div class="img-container">
          <div class="img-if">
            <image-switcher v-if="data.story.content.imatgeartista2.filename" :images="[data.story.content.imatgeartista1.filename, data.story.content.imatgeartista2.filename]"/>
            <img class="img-artista" v-else :src="data.story.content.imatgeartista1.filename + '/m/1400x0'" :alt="data.story.content.artist1">
          </div>
          <marquee-viu class="marquee-viu-concert" data-speed="0.9"/>
        </div>
      </div>
    </div>
    <div class="concert-bios">
      <div class="concert-bio-item p-md">
        <div class="concert-bio-item-aside">
          <div class="font-size-lg">{{ data.story.content.artist1 }}</div>
          <xarxes-links :xarxes="data.story.content.xarxesartista1[0]"/>
        </div>
        <div class="concert-bio-item-text secondary font-size-md"  v-html="renderRichText(data.story.content.bio)"></div>
      </div>
      <div class="concert-bio-item p-md" v-if="data.story.content.artist2">
        <div class="concert-bio-item-aside">
          <div class="font-size-lg">{{ data.story.content.artist2 }}</div>
          <xarxes-links :xarxes="data.story.content.xarxesartista2[0]"/>
        </div>
        <div class="concert-bio-item-text secondary font-size-md"  v-html="renderRichText(data.story.content.bioArtista2)"></div>
      </div>
    </div>
    <app-footer />
  </div>
</template>

<style lang="scss" scoped>
.concert-page {
  min-height: 100vh;
  .concert-info {
    text-transform: uppercase;
    text-align: center;
    overflow: hidden;
  }

  .concert-bios {
    margin-top: calc($padding-x-md * 4);
  }

  .concert-data {
    display: grid;
    align-items: center;
    text-align: center;
    grid-template-columns: 1fr 12em 1fr;
    gap: clamp(1em, 1.5vw, 2em);
    margin: 0 auto;
    overflow: hidden;
    padding: .6em 0;

    &-space, &-temporal {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1em;
    }
  }

  .concert-bio-item {
    display: grid;
    grid-template-columns: 1fr 2.25fr;
    gap: 2rem;

    &-aside {
      text-transform: uppercase;
    }
  }

  .img-container {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .img-artista {
    max-width: 70vw;
    max-height: 60vh;
    object-fit: contain;
    margin: 0 auto;
    z-index: 15;
  }

  .img-if {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
  }

  .concert-artists-line {
    overflow: hidden;
    padding-top: .3em;
    margin-top: -.3em;
  }
}

@media (max-width: $sm-breakpoint) {
  .concert-page {
    .concert-main {
      height: calc((var(--vh, 1vh) * 100) - $navbar-height-sm);
      position: relative;
      display: grid;
      grid-template-rows: auto 1fr;
    }

    .img-artista {
      height: 100%;
      max-width: 100%;
      padding: 0 $padding-x-md;
    }

    .img-wrapper {
      height: 100%;
    }
    .concert-data {
      grid-template-columns: auto;
      grid-auto-flow: row;
      gap: .15em;
      width: 100%;

      &-space, &-temporal {
        display: flex;
        justify-content: center;
      }

      .button-container {
        grid-row: 3;
        margin-top: $padding-x-md;
        width: 100%;
      }
      .button {
        width: 100%;
      }
    }  

    .concert-bio-item {
      grid-template-columns: 1fr;
    }
  }
  
}
</style>

<style lang="scss">
.concert-page {
  .img-container {
    position: relative;
  }

  .marquee-viu-concert {
    position: absolute;
    bottom: -5rem;
    left: 0;
    right: 0;
    width: 100%;
    overflow: hidden;
    padding: 2em;
  }
}

@media (max-width: $sm-breakpoint) {
.concert-page {
  .img-container {
    height: 100%;
    position: static;
  }

  .marquee-viu-concert {
    position: absolute;
    bottom: 0;
  }

  .img-switcher {
    height: 100%;

    .slide {
      height: 100%;
    }

    img {
      height: 100%;
    }
  }
}
}
</style>
