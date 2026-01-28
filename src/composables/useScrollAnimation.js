import { ref, onMounted, onUnmounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'

export function useScrollAnimation() {
  const scrollY = ref(0)
  const scrollProgress = ref(0)
  const { y } = useWindowScroll()

  const updateScroll = () => {
    if (typeof window === 'undefined') return
    scrollY.value = y.value
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    scrollProgress.value = Math.min(scrollY.value / (documentHeight - windowHeight), 1)
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      updateScroll()
      window.addEventListener('scroll', updateScroll, { passive: true })
    }
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', updateScroll)
    }
  })

  return {
    scrollY,
    scrollProgress
  }
}
