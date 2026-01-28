<template>
  <div class="step-list">
    <button
      v-for="step in steps"
      :key="step.id"
      class="step-item"
      :class="{ active: activeStep === step.id }"
      @click="scrollToSection(step.id)"
    >
      <span class="step-label">{{ step.label }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  scrollRoot: {
    type: Object,
    default: null
  }
})

const steps = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' }
]

const activeStep = ref('hero')
let observer = null

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    let scrollContainer = null
    if (props.scrollRoot) {
      scrollContainer = props.scrollRoot.value || props.scrollRoot.$el || props.scrollRoot
    }
    if (!scrollContainer) {
      scrollContainer = document.querySelector('.scroll-container')
    }

    if (scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()
      const scrollTop = scrollContainer.scrollTop
      const elementTop = elementRect.top - containerRect.top + scrollTop

      scrollContainer.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      })
    } else {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

const updateActiveStep = () => {
  let scrollContainer = null
  if (props.scrollRoot) {
    scrollContainer = props.scrollRoot.value || props.scrollRoot.$el || props.scrollRoot
  }
  if (!scrollContainer) {
    scrollContainer = document.querySelector('.scroll-container')
  }
  if (!scrollContainer) return

  const containerRect = scrollContainer.getBoundingClientRect()
  const containerCenter = containerRect.top + containerRect.height / 2

  let currentSection = 'hero'
  let minDistance = Infinity

  steps.forEach((step) => {
    const element = document.getElementById(step.id)
    if (element) {
      const elementRect = element.getBoundingClientRect()
      const elementCenter = elementRect.top + elementRect.height / 2
      const distance = Math.abs(elementCenter - containerCenter)

      if (distance < minDistance) {
        minDistance = distance
        currentSection = step.id
      }
    }
  })

  activeStep.value = currentSection
}

onMounted(() => {
  setTimeout(() => {
    let scrollContainer = null
    if (props.scrollRoot) {
      scrollContainer = props.scrollRoot.value || props.scrollRoot.$el || props.scrollRoot
    }
    if (!scrollContainer) {
      scrollContainer = document.querySelector('.scroll-container')
    }

    if (scrollContainer) {
      const observerOptions = {
        root: scrollContainer,
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }

      observer = new IntersectionObserver(
        (entries) => {
          let maxRatio = 0
          let activeEntry = null

          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
              maxRatio = entry.intersectionRatio
              activeEntry = entry
            }
          })

          if (activeEntry && maxRatio >= 0.3) {
            activeStep.value = activeEntry.target.id
          }
        },
        observerOptions
      )

      steps.forEach((step) => {
        const element = document.getElementById(step.id)
        if (element) {
          observer.observe(element)
        }
      })

      scrollContainer.addEventListener('scroll', updateActiveStep, { passive: true })
      updateActiveStep()
    }
  }, 100)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  let scrollContainer = null
  if (props.scrollRoot) {
    scrollContainer = props.scrollRoot.value || props.scrollRoot.$el || props.scrollRoot
  }
  if (!scrollContainer) {
    scrollContainer = document.querySelector('.scroll-container')
  }
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', updateActiveStep)
  }
})
</script>

<style scoped>
.step-list {
  position: fixed;
  right: 24px;
  top: 50%;
  z-index: 100;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
  pointer-events: none;
}

.step-item {
  pointer-events: auto;
  padding: 6px 14px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.25s ease;
  color: rgba(255, 255, 255, 0.45);
  font-size: 13px;
  font-weight: 500;
  text-align: right;
  white-space: nowrap;
  letter-spacing: 0.02em;
}

.step-item:hover {
  color: rgba(255, 255, 255, 0.8);
}

.step-item.active {
  color: #00f5ff;
  background: rgba(0, 245, 255, 0.08);
  border-color: rgba(0, 245, 255, 0.2);
  box-shadow: 0 0 20px -4px rgba(0, 245, 255, 0.15);
}

.step-label {
  display: block;
}

@media (max-width: 768px) {
  .step-list {
    right: 12px;
    gap: 6px;
  }

  .step-item {
    font-size: 12px;
    padding: 5px 12px;
  }
}

@media (max-width: 480px) {
  .step-list {
    right: 8px;
    gap: 4px;
  }

  .step-item {
    font-size: 11px;
    padding: 4px 10px;
  }
}
</style>
