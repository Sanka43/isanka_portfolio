import { ref, onMounted, onUnmounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'

export function useBackgroundParallax(options = {}) {
  const { speed = 0.5 } = options

  const isMobile = ref(typeof window !== 'undefined' && window.innerWidth < 768)
  const { y: scrollY } = useWindowScroll()
  const backgroundY = ref(0)

  let rafId = null

  const update = () => {
    rafId = null
    if (typeof window === 'undefined') return
    backgroundY.value = scrollY.value * speed * -1
  }

  const onScroll = () => {
    if (rafId != null) return
    rafId = window.requestAnimationFrame(update)
  }

  const onResize = () => {
    isMobile.value = window.innerWidth < 768
    onScroll()
  }

  onMounted(() => {
    if (typeof window === 'undefined') return
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
  })

  onUnmounted(() => {
    if (typeof window === 'undefined') return
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
    if (rafId != null) window.cancelAnimationFrame(rafId)
  })

  return {
    backgroundY,
    isMobile
  }
}

