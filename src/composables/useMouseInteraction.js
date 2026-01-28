import { ref, onMounted, onUnmounted } from 'vue'
import { useMouse } from '@vueuse/core'

export function useMouseInteraction() {
  const mouse = useMouse()
  const mouseX = ref(0)
  const mouseY = ref(0)
  const normalizedX = ref(0)
  const normalizedY = ref(0)

  const updateMouse = () => {
    if (typeof window === 'undefined') return
    mouseX.value = mouse.x.value
    mouseY.value = mouse.y.value
    normalizedX.value = (mouse.x.value / window.innerWidth) * 2 - 1
    normalizedY.value = -(mouse.y.value / window.innerHeight) * 2 + 1
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', updateMouse, { passive: true })
    }
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', updateMouse)
    }
  })

  return {
    mouseX,
    mouseY,
    normalizedX,
    normalizedY
  }
}
