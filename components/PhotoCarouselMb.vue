<template>
  <div class="carousel-mb">
    <div
      ref="carouselMb"
      class="photo-carousel-mb"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointerleave="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <div
        class="photo-track"
        :style="trackStyle"
      >
        <div
          v-for="(photo, index) in orderedImages"
          :key="`${photo.filename}-${index}`"
          class="photo-slide"
        >
          <photo-item :image="photo.filename" isMb />
        </div>
      </div>
    </div>

    <div class="pos-container">
      <transition mode="out-in" name="key">
        <div
          v-if="currentItem && tobiasStore.workLength"
          :key="`${currentItem.category}-${currentItem.order}`"
          :class="['font-size-sm-mono position-indicator', `position-indicator-${currentItem.category}`]"
        >
          {{ cap(currentItem.category) }}
          ({{ currentItem.order }} / {{ currentItem.category === 'diary' ? tobiasStore.diaryLength : tobiasStore.workLength }})
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { useTobiasStore } from '@/stores/tobiasStore'

const tobiasStore = useTobiasStore()
const carouselMb = ref(null)
const currentIndex = ref(0)
const dragStartX = ref(0)
const dragOffsetX = ref(0)
const isDragging = ref(false)
const viewportWidth = ref(0)

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  order: {
    type: Array,
    default: () => []
  }
})

const orderedImages = computed(() => {
  if (!props.order?.length || !props.images?.length) {
    return props.images || []
  }

  return props.order.map((imageIndex) => props.images[imageIndex]).filter(Boolean)
})

const currentItem = computed(() => {
  return orderedImages.value[currentIndex.value] || props.images[0] || null
})

const trackStyle = computed(() => ({
  transform: `translate3d(${-(currentIndex.value * viewportWidth.value) + dragOffsetX.value}px, 0, 0)`,
  transition: isDragging.value ? 'none' : 'transform 0.25s ease-out'
}))

function cap(value) {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function clampIndex(value) {
  const max = Math.max(orderedImages.value.length - 1, 0)
  return Math.min(Math.max(value, 0), max)
}

function updateViewportWidth() {
  viewportWidth.value = window.innerWidth
}

function onPointerDown(event) {
  if (event.pointerType === 'mouse' && event.button !== 0) return

  isDragging.value = true
  dragStartX.value = event.clientX
  dragOffsetX.value = 0
  carouselMb.value?.setPointerCapture?.(event.pointerId)
}

function onPointerMove(event) {
  if (!isDragging.value) return

  const delta = event.clientX - dragStartX.value
  const maxDrag = Math.max(window.innerWidth * 0.9, 280)
  dragOffsetX.value = Math.min(Math.max(delta, -maxDrag), maxDrag)
}

function onPointerUp() {
  if (!isDragging.value) return

  const threshold = Math.max(24, viewportWidth.value * 0.12)

  if (Math.abs(dragOffsetX.value) > threshold) {
    currentIndex.value += dragOffsetX.value < 0 ? 1 : -1
  }

  currentIndex.value = clampIndex(currentIndex.value)
  dragOffsetX.value = 0
  isDragging.value = false
}

onMounted(() => {
  updateViewportWidth()
  window.addEventListener('resize', updateViewportWidth)
  window.addEventListener('orientationchange', updateViewportWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewportWidth)
  window.removeEventListener('orientationchange', updateViewportWidth)
})
</script>

<style lang="scss" scoped>
.carousel-mb {
  position: relative;
}

.pos-container {
  opacity: 1;
}

.position-indicator {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  padding: $padding-x-md;
  bottom: 0;
  z-index: 10000;
}

.photo-carousel-mb {
  position: absolute;
  inset: 0;
  height: 100dvh;
  overflow: hidden;
  touch-action: pan-y;
  user-select: none;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}

.photo-track {
  display: flex;
  height: 100%;
  will-change: transform;
}

.photo-slide {
  flex: 0 0 100vw;
  width: 100vw;
  height: 100dvh;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  position: relative;
  padding: 6rem 2rem 3.5rem 2rem;
  align-items: center;
  justify-content: center;
  align-content: center;

  :deep(img) {
    grid-row: 1;
    grid-column: 1;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>