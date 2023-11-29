<template>
  <nuxt-link :class="[{ disabled: concert.content.tba}, 'concert-item']" @mousemove="handleMove($event)" :to="concert.content.tba ? '' : 'concerts/' + concert.slug" @mouseenter="handleEnter()" @mouseleave="handleLeave()">
    <div class="concert-item-title" ref="title">
      <div class="concert-item-data-left">
        <div class="concert-date">{{ day }} {{ fullMonth[locale] }}</div>
        <div class="concert-city">{{ concert.content.localitat }}</div>
      </div>
      <div class="concert-item-name">
        <span v-if="concert.content.tba">TBA</span>
        <span v-else><span>{{concert.content.artist1}}</span><span v-if="concert.content.artist2"> + {{concert.content.artist2}}</span></span>
      </div>
      <div class="concert-item-data-right">{{ concert.content.sala }}</div>
    </div>
    <div ref="imageWrap" class="concert-item-img-wrapper">
      <img v-if="concert.content.imatgeartista1.filename + '/m/1400x0'" :class="[{'active-concert-image': isActive}, 'image']" :src="concert.content.imatgeartista1.filename" ref="image" />
    </div>
  </nuxt-link>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue'
import { gsap } from 'gsap'
import scrollTrigger from "gsap/ScrollTrigger"
import CustomEase from "gsap/CustomEase"
import { useSergiStore } from '~/stores/sergiStore'

const route = useRoute()
const sergiStore = useSergiStore()
const { year, month, day, time, fullMonth } = useDateFormatter(props.concert.content.data)
let locale = route.name.endsWith('es') ? 'es' : 'ca'

const title = ref(null)
const image = ref(null)
const imageWrap = ref(null)
let tl = null
let xTo = null
let yTo = null
let isActive = ref(false)

const props = defineProps({
  concert: {
    type: Object,
    default: null
  },

  i: {
    type: Number,
    default: 0
  },

  color: {
    type: String,
    default: '#2c664b'
  },
})

onMounted(() => {
  gsap.registerPlugin(CustomEase)
  setupTl()

  xTo = gsap.quickTo(image.value, "left", {duration: 1.25, ease: CustomEase.create("custom", "M0,0,C0.084,0.6,0.194,0.892,0.548,0.968,0.667,0.993,0.831,1,1,1")})
  yTo = gsap.quickTo(image.value, "top", {duration: 1.25, ease: CustomEase.create("custom", "M0,0,C0.084,0.6,0.194,0.892,0.548,0.968,0.667,0.993,0.831,1,1,1")})
})

function setupTl() {
  tl = gsap.timeline({paused:true, defaults: {ease: CustomEase.create("custom", "M0,0,C0.084,0.6,0.194,0.892,0.548,0.968,0.667,0.993,0.831,1,1,1")}})
  tl.add('enter')
  tl.to(image.value, {
    y: 0,
    duration: 1.2
  })
  tl.add('exit', '>')
  tl.to(image.value, {
    y: '110%',
    duration: 1.2
  })
  tl.set(image.value, {
    y: '-110%'
  }, '>')
}

function handleMove(e) {
  const cursorX = e.clientX/sergiStore.windowSize.x - 0.5
  const cursorY = e.clientY/sergiStore.windowSize.y - 0.5
  xTo(cursorX * sergiStore.windowSize.x * 0.25)
  yTo(cursorY * sergiStore.windowSize.y * 0.1)
}

function handleEnter() {
  isActive.value = true
  gsap.to('html', {
    "--primary": sergiStore.colors[props.concert.content.color],
    duration: 0.25
  })
  gsap.to('html', {
    "--background": sergiStore.colors[props.concert.content.bgcolor],
    "--secondary": sergiStore.colors['black'],
    duration: 0.25
  })
  if (props.concert.content.bgcolor === 'purple' ||  props.concert.content.bgcolor === 'green') {
    gsap.to('html', {
      "--secondaryfades": sergiStore.colors['white'],
      "--secondary": sergiStore.colors['white'],
      duration: 0.25
    })
  }
  gsap.to('.concert-item-title', {
    color: '#2b2b2b30',
    duration: 0.25
  })
  gsap.to(title.value, {
    color: sergiStore.colors[props.concert.content.color],
    duration: 0.25
  })
  tl.tweenFromTo('enter', 'exit')
}

function handleLeave() {
  isActive.value = false
  let color =  (props.concert.content.bgcolor === 'purple' ||  props.concert.content.bgcolor === 'green') ? sergiStore.colors['white'] : sergiStore.colors['black']
  gsap.to('.concert-item-title', {
    color: color,
    duration: 0.25
  })
  gsap.to(title.value, {
    color: color,
    duration: 0.25
  })
  tl.tweenFromTo('exit', tl.duration())
}
</script>

<style lang="scss" scoped>
.concert-item {
  background: transparent;
  display: grid;
  justify-items: center;
  align-items: center;
  position: relative;
  width: 100%;
  line-height: 1;
  text-transform: uppercase;

  &.disabled {
    pointer-events: none;
  }

  &-name {
    font-size: $font-size-lg;
  }
   
  &-data {
    &-right {
      text-align: left;
      line-height: 0.9;
      font-size: $font-size-md;
    }

    &-left {
      text-align: right;
      line-height: 0.9;
      font-size: $font-size-md;

      .concert-date {
        margin-bottom: 0.12em;
      }
    }
  }

  &-title {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 1.5rem;
    width: 100%;
    line-height: .9;
    padding-top: .7em;
    overflow: hidden;
    color: var(--secondaryfades);
  }

  &-img-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: absolute;
    height: 60vh;
    width: 70vw;
    object-fit: contain;
    top: 50%;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
    margin: 0 auto;
    transform: translateY(-50%);
  }

  img, .image {
    position: relative;
    transform: translateY(-110%);
    max-height: 60vh;
    max-width: 70vw;
    object-fit: contain;
    height: 100%;
    width: 100%;
  }

  &:focus {
    outline: none;

    .project-item-name {
      text-decoration-line: underline;
      text-decoration-thickness: .04em;
    }
  }
}

@media (max-width: $sm-breakpoint) {
  .concert-item {
    &-title {
      grid-template-columns:  auto;
      gap: .25em;
    } 

    &-data-left {
      display: flex;
      gap: .75em;
      grid-row: 1;
      text-align: center;
      margin: 0 auto;

      .concert-date {
        margin-bottom: 0;
      }
    }

    &-data-right {
      grid-row: 2;
      text-align: center;
    }

    &-name {
      margin-top: .15em;
      grid-row: 3;
    }
  }
}
</style>