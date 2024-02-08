<template>
  <div class="email-section">
    <div class="email-hover p-md font-size-xl" @mouseenter="handleEmail()" @mouseleave="handleEmailLeave()">
      <div class="p-lg">hola@imcarl.es</div>
      <div class="email-section-options font-size-sm" ref="mailoptions" @mouseenter="handleOptions()" @mouseleave="handleOptionsLeave()">
        <carl-button><a href="mailto:hola@imcarl.es">Envia'm un correu</a></carl-button>
        <carl-button @click="copyMail()" class="copy-button">
          <div class="copy-button-text">
            <div ref="copyBtn">
              <div>Copia la meua adreça</div>
              <div>Copiada!</div>
            </div>
          </div>
        </carl-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { onMounted, onUnmounted, ref } from 'vue'
import { useSergiStore } from '@/stores/sergiStore'

const sergiStore = useSergiStore()
const mailoptions = ref(null)
const copyBtn = ref(null)
let optionsTl = null
let btnTl = null

onMounted(() => {
  setupTl()
})

function setupTl() {
  optionsTl = gsap.timeline({paused: true})
  optionsTl.set(mailoptions.value, {
    display: 'flex'
  })
  optionsTl.from(mailoptions.value, {
    opacity: 0,
    y: -20,
    duration: .2
  })
  optionsTl.addLabel('leave')
  optionsTl.to(mailoptions.value, {
    opacity: 0,
    y: -20,
    duration: .2
  })
  optionsTl.set(mailoptions.value, {
    display: 'none'
  })
  
  btnTl = gsap.timeline({paused: true})
  btnTl.to(copyBtn.value, {
    y: '-1.4em',
    duration: .3
  })
  btnTl.to(copyBtn.value, {
    y: '0',
    duration: .25
  }, '>1.5')
}

async function copyMail() {
  await navigator.clipboard.writeText('hola@imcarl.es')
  btnTl.tweenFromTo(0, btnTl.duration(), { ease: 'Power4.out' })
  console.log('asfas')
}

function handleEmail() {
  optionsTl.tweenFromTo(0, "leave", { ease: 'Power4.inOut' })
  sergiStore.cursorState = 'home'
}

function handleEmailLeave() {
  optionsTl.tweenFromTo('leave', optionsTl.duration(), { ease: 'Power4.out' })
  sergiStore.cursorState = 'other'
}

function handleOptions() {
  sergiStore.cursorState = 'options'
}

function handleOptionsLeave() {
  sergiStore.cursorState = 'home'
}
</script>

<style lang="scss">
.email-hover {
  position: relative;
}

.copy-button {
  .carl-button-slot {
    height: calc($font-size-md * 1.3);
  }
}
.email-section {
  height: calc(100vh - $font-size-md - $padding-x-md * 2);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &-options {
    display: flex;
    position: absolute;
    bottom: calc($padding-x-md);
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
  }
}
</style>