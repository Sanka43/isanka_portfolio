import { shallowRef, ref, onMounted, onUnmounted, markRaw } from 'vue'
import * as THREE from 'three'

export function useThree(containerRef) {
  // IMPORTANT: Three.js objects must NOT be made reactive (Vue proxy breaks them)
  const scene = shallowRef(null)
  const camera = shallowRef(null)
  const renderer = shallowRef(null)
  const animationId = ref(null)
  const isMobile = ref(typeof window !== 'undefined' && window.innerWidth < 768)
  
  // Reduce quality on mobile for better performance
  const getQuality = () => {
    return isMobile.value ? 0.5 : 1
  }

  const initScene = () => {
    if (!containerRef.value) return

    // Scene
    scene.value = markRaw(new THREE.Scene())

    // Camera
    const aspect = containerRef.value.clientWidth / containerRef.value.clientHeight
    camera.value = markRaw(new THREE.PerspectiveCamera(75, aspect, 0.1, 1000))
    camera.value.position.z = 5

    // Renderer
    renderer.value = markRaw(new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    }))
    renderer.value.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
    renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.value.shadowMap.enabled = true
    renderer.value.shadowMap.type = THREE.PCFSoftShadowMap
    containerRef.value.appendChild(renderer.value.domElement)

    // Handle resize
    const handleResize = () => {
      if (!containerRef.value || !camera.value || !renderer.value) return
      
      if (typeof window !== 'undefined') {
        isMobile.value = window.innerWidth < 768
        const width = containerRef.value.clientWidth
        const height = containerRef.value.clientHeight

        camera.value.aspect = width / height
        camera.value.updateProjectionMatrix()
        renderer.value.setSize(width, height)
        renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
    }
  }

  const animate = (callback) => {
    const loop = () => {
      animationId.value = requestAnimationFrame(loop)
      if (callback) callback()
      if (renderer.value && scene.value && camera.value) {
        renderer.value.render(scene.value, camera.value)
      }
    }
    loop()
  }

  const dispose = () => {
    if (animationId.value) {
      cancelAnimationFrame(animationId.value)
    }
    if (renderer.value) {
      renderer.value.dispose()
      if (renderer.value.domElement && renderer.value.domElement.parentNode) {
        renderer.value.domElement.parentNode.removeChild(renderer.value.domElement)
      }
    }
    if (scene.value) {
      scene.value.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(mat => mat.dispose())
          } else {
            object.material.dispose()
          }
        }
      })
    }
  }

  onMounted(() => {
    initScene()
  })

  onUnmounted(() => {
    dispose()
  })

  return {
    scene,
    camera,
    renderer,
    animate,
    dispose,
    isMobile
  }
}
