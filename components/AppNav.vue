<template>
  <div class="app-nav font-size-sm">
    <div class="app-nav-primary">
      <div>Tobias Rei</div>
      <div class="ml-auto">hi@tobiasrei.com</div>
    </div>
    <div class="app-nav-secondary">
      <div>otro texto?</div>
      <div class="ml-auto">@tobiasrei</div>
    </div>
  </div>
</template>

<script>
export default {
  setup () {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>
.app-nav {
  &-primary {
    padding: 1em;
    display: flex;
    width: 100%;
    position: fixed;
    top: 0;
  }

  &-secondary {
    padding: 1em;
    display: flex;
    width: 100%;
    position: fixed;
    bottom: 0;
  }
}
</style>