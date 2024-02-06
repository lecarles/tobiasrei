<template>
  <div class="email-section" @mouseenter="mouseenter()">
    <div class="email-hover p-md font-size-xl" @mouseenter="handleEmail()">
      <div>hola@imcarl.es</div>
      <div class="email-section-options font-size-sm" @mouseenter="handleOptions()" @mouseleave="handleOptionsLeave()">
        <carl-button>Vull enviar-te un correu</carl-button>
        <carl-button>Vull copiar el teu email al portaretalls</carl-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSergiStore } from '@/stores/sergiStore'
const sergiStore = useSergiStore()
const showOptions = ref(false)

function handleEmail() {
  showOptions.value = true
}

function mouseenter() {
  sergiStore.cursorState = 'home'
}

function handleOptions() {
  sergiStore.cursorState = 'options'
}

function handleOptionsLeave() {
  sergiStore.cursorState = 'home'
}
</script>

<style lang="scss" scoped>
.email-hover {
  position: relative;
}
.email-section {
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &-options {
    position: absolute;
    bottom: calc($padding-x-md * -1);
    left: 0;
    right: 0;
    margin-top: $padding-x-md;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
  }
}
</style>