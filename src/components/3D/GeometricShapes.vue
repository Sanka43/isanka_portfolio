<template>
  <Scene3D ref="sceneRef" :backgroundColor="backgroundColor" />
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import * as THREE from 'three'
import Scene3D from './Scene3D.vue'
import { useScrollAnimation } from '../../composables/useScrollAnimation'
import { useParallax3D } from '../../composables/useParallax3D'

const props = defineProps({
  backgroundColor: {
    type: String,
    default: 'transparent'
  },
  shapeCount: {
    type: Number,
    default: 5
  }
})

const sceneRef = ref(null)
const shapes = ref([])
const { scrollProgress } = useScrollAnimation()
const { rotation, position, scale } = useParallax3D({
  speed: 0.5,
  rotationSpeed: 0.3,
  scaleSpeed: 0.2
})

onMounted(async () => {
  await nextTick()
  if (!sceneRef.value) return

  const scene = sceneRef.value.scene?.value
  const camera = sceneRef.value.camera?.value
  const isMobile = sceneRef.value.isMobile

  if (!scene || !camera) {
    console.warn('GeometricShapes: Scene or camera not available')
    return
  }

  // Further reduce shapes on mobile for better performance
  const shapeCount = isMobile.value ? Math.floor(props.shapeCount / 3) : props.shapeCount

  // Create geometric shapes
  for (let i = 0; i < shapeCount; i++) {
    let geometry, material, mesh

    const shapeType = i % 3
    const x = (Math.random() - 0.5) * 15
    const y = (Math.random() - 0.5) * 15
    const z = (Math.random() - 0.5) * 15

    // Choose color based on shape
    let color
    if (i % 3 === 0) {
      color = new THREE.Color(0x00f5ff) // Neon cyan
    } else if (i % 3 === 1) {
      color = new THREE.Color(0xff00ff) // Neon magenta
    } else {
      color = new THREE.Color(0xffd700) // Neon yellow
    }

    if (shapeType === 0) {
      // Cube
      geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
      material = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8
      })
      mesh = new THREE.Mesh(geometry, material)
    } else if (shapeType === 1) {
      // Sphere
      geometry = new THREE.SphereGeometry(0.4, 16, 16)
      material = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8
      })
      mesh = new THREE.Mesh(geometry, material)
    } else {
      // Torus
      geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 32)
      material = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8
      })
      mesh = new THREE.Mesh(geometry, material)
    }

    mesh.position.set(x, y, z)
    mesh.userData = {
      baseRotation: {
        x: Math.random() * 0.02,
        y: Math.random() * 0.02,
        z: Math.random() * 0.02
      },
      basePosition: { x, y, z },
      parallaxSpeed: 0.3 + Math.random() * 0.4
    }

    scene.add(mesh)
    shapes.value.push(mesh)
  }

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
  scene.add(ambientLight)

  // Add point lights
  const light1 = new THREE.PointLight(0x00f5ff, 1, 20)
  light1.position.set(5, 5, 5)
  scene.add(light1)

  const light2 = new THREE.PointLight(0xff00ff, 1, 20)
  light2.position.set(-5, -5, -5)
  scene.add(light2)

  // Animation
  let time = 0
  sceneRef.value.animate(() => {
    time += 0.01

    shapes.value.forEach((shape, index) => {
      // Base rotation
      shape.rotation.x += shape.userData.baseRotation.x
      shape.rotation.y += shape.userData.baseRotation.y
      shape.rotation.z += shape.userData.baseRotation.z

      // Reduce scroll effects on mobile
      const mobileFactor = isMobile.value ? 0.2 : 1

      // Scroll-based rotation
      shape.rotation.y += rotation.value.y * 0.01 * shape.userData.parallaxSpeed * mobileFactor
      shape.rotation.x += rotation.value.x * 0.01 * shape.userData.parallaxSpeed * mobileFactor

      // Scroll-based position
      const parallaxOffset = scrollProgress.value * 5 * shape.userData.parallaxSpeed * mobileFactor
      shape.position.y = shape.userData.basePosition.y + position.value.y * shape.userData.parallaxSpeed * mobileFactor
      shape.position.z = shape.userData.basePosition.z + position.value.z * shape.userData.parallaxSpeed * mobileFactor

      // Scale based on scroll (reduced on mobile)
      const scaleFactor = 1 + (scale.value - 1) * shape.userData.parallaxSpeed * 0.5 * mobileFactor
      shape.scale.setScalar(scaleFactor)

      // Floating animation
      shape.position.y += Math.sin(time + index) * 0.005
      shape.position.x += Math.cos(time + index * 0.5) * 0.003
    })

    // Update camera position based on scroll
    if (camera) {
      camera.position.z = 5 + position.value.z * 2
    }
  })
})
</script>

<style scoped>
</style>
