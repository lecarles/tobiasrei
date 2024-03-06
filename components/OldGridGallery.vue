<template>
  <div class="project-item-thumbnail" v-if="asset.filename">
    <video v-if="asset.filename.endsWith('mp4')" :src="asset.filename" autoplay muted loop playsinline></video>
    <img v-else :src="asset.filename">
  </div>    
</template>