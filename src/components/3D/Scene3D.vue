<template>
  <div ref="containerRef" class="scene-container"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as THREE from 'three'
import { useThree } from '../../composables/useThree'

const props = defineProps({
  backgroundColor: {
    type: String,
    default: 'transparent'
  }
})

const containerRef = ref(null)
const { scene, camera, renderer, animate, isMobile } = useThree(containerRef)

defineExpose({
  scene,
  camera,
  renderer,
  animate,
  isMobile
})

onMounted(() => {
  if (scene.value) {
    scene.value.background = props.backgroundColor === 'transparent' ? null : new THREE.Color(props.backgroundColor)
  }
})

watch(() => props.backgroundColor, (newColor) => {
  if (scene.value) {
    scene.value.background = newColor === 'transparent' ? null : new THREE.Color(newColor)
  }
})
</script>

<style scoped>
.scene-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

.scene-container canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
