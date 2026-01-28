import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'

export function useParallax3D(options = {}) {
  const {
    speed = 2,
    direction = 'y',
    rotationSpeed = 1.5,
    scaleSpeed = 0.8,
    minScale = 0.8,
    maxScale = 1.2,
    minRotation = 0,
    maxRotation = 45,
    perspective = 1000,
    zDepth = 1
  } = options

  const isMobile = ref(typeof window !== 'undefined' && window.innerWidth < 768)
  const { y: scrollY } = useWindowScroll()
  const scrollProgress = ref(0)
  const rotation = ref({ x: 0, y: 0, z: 0 })
  const position = ref({ x: 0, y: 0, z: 0 })
  const scale = ref(1)

  const updateParallax = () => {
    if (typeof window === 'undefined') return
    
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    scrollProgress.value = Math.min(scrollY.value / (documentHeight - windowHeight), 1)

    // Reduce effects on mobile for better performance
    const mobileFactor = isMobile.value ? 0.3 : 1

    // Calculate rotation based on scroll
    const rotationProgress = scrollProgress.value * maxRotation * mobileFactor
    rotation.value = {
      x: rotationProgress * rotationSpeed * 0.35,
      y: rotationProgress * rotationSpeed,
      z: rotationProgress * rotationSpeed * 0.25
    }

    // Calculate position based on scroll and direction
    const scrollOffset = scrollY.value * speed * 0.01 * mobileFactor
    if (direction === 'y') {
      position.value = { x: 0, y: scrollOffset, z: scrollOffset * 1.25 * zDepth }
    } else if (direction === 'x') {
      position.value = { x: scrollOffset, y: 0, z: scrollOffset * 1.25 * zDepth }
    } else {
      position.value = { x: scrollOffset * 0.8, y: scrollOffset, z: scrollOffset * 1.5 * zDepth }
    }

    // Calculate scale based on scroll (reduced on mobile)
    const scaleProgress = Math.sin(scrollProgress.value * Math.PI) * mobileFactor
    scale.value = minScale + (maxScale - minScale) * scaleProgress * scaleSpeed
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      updateParallax()
      window.addEventListener('scroll', updateParallax, { passive: true })
    }
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', updateParallax)
    }
  })

  return {
    scrollProgress,
    rotation,
    position,
    scale,
    perspective
  }
}

export function useSectionParallax(sectionId, options = {}) {
  const {
    speed = 2,
    rotationSpeed = 1.5,
    offset = 0,
    maxRotation = 45,
    perspective = 1000,
    zDepth = 1
  } = options

  const isMobile = ref(typeof window !== 'undefined' && window.innerWidth < 768)
  const sectionProgress = ref(0)
  const rotation = ref({ x: 0, y: 0, z: 0 })
  const position = ref({ x: 0, y: 0, z: 0 })

  const updateSectionParallax = () => {
    if (typeof window === 'undefined') return
    
    const section = document.getElementById(sectionId)
    if (!section) return

    const rect = section.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const sectionTop = rect.top + window.scrollY
    const sectionHeight = rect.height
    const scrollY = window.scrollY

    // Calculate progress when section is in viewport
    if (scrollY + windowHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
      const sectionScroll = scrollY - sectionTop + offset
      sectionProgress.value = Math.max(0, Math.min(1, sectionScroll / (sectionHeight + windowHeight)))
      
      // Reduce effects on mobile
      const mobileFactor = isMobile.value ? 0.3 : 1

      // Calculate rotation
      const rotationProgress = sectionProgress.value * maxRotation * mobileFactor
      rotation.value = {
        x: rotationProgress * rotationSpeed * 0.6,
        y: rotationProgress * rotationSpeed,
        z: rotationProgress * rotationSpeed * 0.35
      }

      // Calculate position
      const parallaxOffset = sectionScroll * speed * 0.1 * mobileFactor
      position.value = {
        x: parallaxOffset * 0.5,
        y: parallaxOffset,
        z: parallaxOffset * 1.25 * zDepth
      }
    }
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      updateSectionParallax()
      window.addEventListener('scroll', updateSectionParallax, { passive: true })
    }
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', updateSectionParallax)
    }
  })

  return {
    sectionProgress,
    rotation,
    position,
    perspective
  }
}
