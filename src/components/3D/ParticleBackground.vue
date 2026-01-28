<template>
  <Scene3D ref="sceneRef" :backgroundColor="backgroundColor" />
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import * as THREE from 'three'
import Scene3D from './Scene3D.vue'
import { useScrollAnimation } from '../../composables/useScrollAnimation'
import { useMouseInteraction } from '../../composables/useMouseInteraction'

const props = defineProps({
  particleCount: {
    type: Number,
    default: 1000
  },
  backgroundColor: {
    type: String,
    default: 'transparent'
  }
})

const sceneRef = ref(null)
const particleSystem = ref(null)
const { scrollProgress } = useScrollAnimation()
const { normalizedX, normalizedY } = useMouseInteraction()

onMounted(async () => {
  await nextTick()
  if (!sceneRef.value) return

  const scene = sceneRef.value.scene?.value
  const camera = sceneRef.value.camera?.value
  const isMobile = sceneRef.value.isMobile

  if (!scene || !camera) {
    console.warn('ParticleBackground: Scene or camera not available')
    return
  }

  // Create particle geometry
  const geometry = new THREE.BufferGeometry()
  // Reduce particle count significantly on mobile for better performance
  const count = isMobile.value ? Math.floor(props.particleCount / 3) : props.particleCount
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  // Color palette - Neon theme
  const color1 = new THREE.Color(0x00f5ff) // Neon cyan
  const color2 = new THREE.Color(0xff00ff) // Neon magenta
  const color3 = new THREE.Color(0xffd700) // Neon yellow

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    
    // Position
    positions[i3] = (Math.random() - 0.5) * 20
    positions[i3 + 1] = (Math.random() - 0.5) * 20
    positions[i3 + 2] = (Math.random() - 0.5) * 20

    // Color
    const colorChoice = Math.random()
    let color
    if (colorChoice < 0.33) color = color1
    else if (colorChoice < 0.66) color = color2
    else color = color3

    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  // Material
  const material = new THREE.PointsMaterial({
    size: isMobile.value ? 0.05 : 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  })

  // Points
  particleSystem.value = new THREE.Points(geometry, material)
  scene.add(particleSystem.value)

  // Animation
  let time = 0
  sceneRef.value.animate(() => {
    time += 0.001

    if (particleSystem.value) {
      // Rotate particles
      particleSystem.value.rotation.y = time * 0.1
      particleSystem.value.rotation.x = time * 0.05

      // Mouse interaction (only on desktop)
      if (camera && !isMobile.value) {
        camera.position.x += (normalizedX.value * 0.5 - camera.position.x) * 0.05
        camera.position.y += (normalizedY.value * 0.5 - camera.position.y) * 0.05
      }

      // Scroll-based color transition
      const positions = particleSystem.value.geometry.attributes.position
      const colors = particleSystem.value.geometry.attributes.color
      
      for (let i = 0; i < positions.count; i++) {
        const i3 = i * 3
        const y = positions.array[i3 + 1]
        positions.array[i3 + 1] = y + Math.sin(time + i * 0.01) * 0.01

        // Color transition based on scroll
        const t = scrollProgress.value
        const r = THREE.MathUtils.lerp(color1.r, color2.r, t)
        const g = THREE.MathUtils.lerp(color1.g, color2.g, t)
        const b = THREE.MathUtils.lerp(color1.b, color2.b, t)
        
        colors.array[i3] = r
        colors.array[i3 + 1] = g
        colors.array[i3 + 2] = b
      }
      
      colors.needsUpdate = true
      positions.needsUpdate = true
    }
  })
})
</script>

<style scoped>
</style>
