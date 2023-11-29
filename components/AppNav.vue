<template>
  <div class="navbar navbar-wrapper font-size-sm">
    <nuxt-link class="mr-auto navbar-logo-link" :to="localePath('/')">
      Circuit Viu
    </nuxt-link>
    <div class="navbar-md" ref="navbar">
      <NuxtLink class="locale-change button-link" v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">{{
      locale.name
    }}</NuxtLink>
    </div>
    <button class="navbar-sm-toggle" @click="toggleMenu()" ref="navbarButton">
      <svg viewBox="0 0 48.36 48.36" class="button-icon">
        <line x1="24.18" y1="48.36" x2="24.18"/>
        <line y1="24.18" x2="48.36" y2="24.18"/>
      </svg>
    </button>
    <div class="navbar-sm" ref="navbarSm" @click="toggleMenu()">
        <NuxtLink class="locale-change" v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.name)">{{
        locale.name
      }}</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import gsap from 'gsap'

let tl = null
const navbar = ref(null)
const navbarSm = ref(null)
const navbarButton = ref(null)
let navbarActive = ref(false)

let menuTl

const route = useRoute()
const localePath = useLocalePath()

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const availableLocales = computed(() => {
  return (locales.value).filter(i => i.code !== locale.value)
})

onMounted(() => {
  setupMenu()
})

function toggleMenu() {
  if (navbarActive.value) {
    menuTl.tweenFromTo("leave", menuTl.duration(), { ease: 'Power4.out' })
    navbarActive.value = false
  } else {
    menuTl.tweenFromTo(0, "leave", { ease: 'Power4.out' })
    navbarActive.value = true
  }
}

function setupMenu() {
  menuTl = gsap.timeline({paused: true})
  menuTl.to(navbarButton.value, {
    rotate: '45deg',
    duration: 0.3
  },)
  menuTl.set(navbarSm.value, {
    visibility: 'visible' 
  }, '<0.1')
  menuTl.to(navbarSm.value.children, {
    opacity: 1,
    y: 0,
    stagger: 0.1,
    duration: 0.2
  }, '<')
  menuTl.addLabel('leave', '>')
  menuTl.to(navbarSm.value.children, {
    y: -5,
    opacity: 0,
    stagger: 0.1,
    duration: 0.2
  })
  menuTl.to(navbarButton.value, {
    rotate: '0deg',
    duration: 0.3
  }, '<0.1')
  menuTl.set(navbarSm.value, {
    visibility: 'hidden' 
  }, '>')
}

function setupTl() {
  tl = gsap.timeline({paused: true, defaults: {ease: 'Power4.InOut'}})
  tl.addLabel('enter')
  tl.to(navbar.value.children, {
    y: 0,
    duration: .5,
    stagger: .05
  })
  tl.addLabel('leave', '>')
  tl.to(navbar.value.children, {
    y: 100,
    duration: .5,
    stagger: .05
  })
}
</script>

<style lang="scss">
.navbar {
  text-transform:  uppercase;
  
  &-wrapper {
    padding: $padding-x-sm $padding-x-md;
    width: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    z-index: 10000;
    gap: 1rem;
    position: relative;
  }

  .logo-acord {
    display: none;
  }

  &-logo {
    height: 2em;
    width: auto;

    &-link {
      display: flex;
    }
  }

  a {
    text-decoration: none;
  }

  &-md {
    display: flex;
    gap: 1rem;
    text-align: right;
  }

  &-sm {
    display: none;
  }

  &-sm-toggle {
    display: none;
  }
}

@media (max-width: $sm-breakpoint)  {
  .navbar-wrapper {
    padding: $padding-x-md;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: .3rem;
  }

  .navbar .logo-acord {
    line-height: 1;
    margin-right: auto;
    display: block;
  }

  .navbar-md {
    display: none;
  }

  .navbar-sm-toggle {
    display: block;
  }

  .navbar-sm {
    position: absolute;
    top: calc($navbar-height - .5em);
    width: 100%;
    padding: 0 $padding-x-md;
    visibility: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: right;
    z-index: 100;

    a {
      opacity: 0;
      transform: translateY(10px);
    }

    &-toggle {
      appearance: none;
      background: none;
      border: none;
      outline: none;
      padding: 0;

      svg {
        stroke: var(--secondary);
        stroke-width: 3px;
        height: 1.5em;
      }
    }
  }
}
</style>