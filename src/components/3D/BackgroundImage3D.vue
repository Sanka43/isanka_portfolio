<template>
  <div class="bg-image-3d fixed inset-0 pointer-events-none" :style="rootStyle" aria-hidden="true">
    <div class="bg-image-3d__layer" :style="layerStyle"></div>
    <div v-if="overlay" class="bg-image-3d__overlay" :style="overlayStyle"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBackgroundParallax } from '../../composables/useBackgroundParallax'

const props = defineProps({
  imagePath: {
    type: String,
    default: '/background.jpg'
  },
  imageSrc: {
    type: String,
    default: null
  },
  speed: {
    // 0.5 means background moves at 50% scroll speed
    type: Number,
    default: 0.5
  },
  perspective: {
    type: Number,
    default: 1000
  },
  // Extra movement to avoid blank edges when translating
  overscanVh: {
    type: Number,
    default: 40
  },
  overlay: {
    type: Boolean,
    default: true
  },
  overlayFrom: {
    type: String,
    default: 'rgba(10, 10, 15, 0.55)'
  },
  overlayTo: {
    type: String,
    default: 'rgba(5, 5, 8, 0.65)'
  }
})

const { backgroundY, isMobile } = useBackgroundParallax({
  speed: props.speed
})

const rootStyle = computed(() => ({
  perspective: `${props.perspective}px`,
  transformStyle: 'preserve-3d',
  zIndex: 0
}))

const layerStyle = computed(() => {
  // Reduce background movement on mobile for performance
  const mobileFactor = isMobile.value ? 0.35 : 1
  const y = backgroundY.value * mobileFactor
  const imageUrl = props.imageSrc || props.imagePath

  return {
    backgroundImage: `url("${imageUrl}")`,
    transform: `translate3d(0, ${y}px, -120px) scale(1.18)`,
    height: `calc(100vh + ${props.overscanVh}vh)`,
    top: `-${props.overscanVh / 2}vh`
  }
})

const overlayStyle = computed(() => ({
  background: `linear-gradient(180deg, ${props.overlayFrom}, ${props.overlayTo})`
}))
</script>

<style scoped>
.bg-image-3d {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.bg-image-3d__layer {
  position: absolute;
  left: 0;
  right: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  will-change: transform;
}

.bg-image-3d__overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
</style>
