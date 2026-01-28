<template>
  <div class="scroll-parallax-3d fixed inset-0 pointer-events-none">
    <BackgroundImage3D :imagePath="imagePath" :speed="speed" />
  </div>
</template>

<script setup>
import BackgroundImage3D from './BackgroundImage3D.vue'

const props = defineProps({
  imagePath: { type: String, default: '/background.jpg' },
  speed: { type: Number, default: 0.5 }
})
</script>

<style scoped>
.scroll-parallax-3d {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 0;
}
</style>
