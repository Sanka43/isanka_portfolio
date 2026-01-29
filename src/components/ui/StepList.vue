<template>
  <div class="step-list-wrapper">
    <!-- Desktop: right vertical sidebar (unchanged) -->
    <div class="step-list step-list-desktop" :aria-hidden="isMobile">
      <button
        v-for="step in steps"
        :key="'d-' + step.id"
        class="step-item"
        :class="{ active: activeStep === step.id }"
        :aria-label="step.label"
        @click="scrollToSection(step.id)"
      >
        <span class="step-label">{{ step.label }}</span>
      </button>
    </div>

    <!-- Mobile: fixed bottom nav bar with labels -->
    <div class="step-list-mobile" :aria-hidden="!isMobile">
      <div class="step-list-mobile-inner">
        <div class="step-list-mobile-scroll">
          <button
            v-for="step in steps"
            :key="'m-' + step.id"
            class="step-mobile-item"
            :class="{ active: activeStep === step.id }"
            @click="scrollToSection(step.id)"
          >
            <span class="step-mobile-label">{{ step.label }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useMediaQuery } from '@vueuse/core'

const isMobile = useMediaQuery('(max-width: 767px)')

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
.step-list-wrapper {
  position: static;
  pointer-events: none;
}

.step-list-wrapper > * {
  pointer-events: auto;
}

/* Desktop: right vertical sidebar — unchanged from original */
.step-list.step-list-desktop {
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

.step-list-desktop .step-item {
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

.step-list-desktop .step-item:hover {
  color: rgba(255, 255, 255, 0.8);
}

.step-list-desktop .step-item.active {
  color: #00f5ff;
  background: rgba(0, 245, 255, 0.08);
  border-color: rgba(0, 245, 255, 0.2);
  box-shadow: 0 0 20px -4px rgba(0, 245, 255, 0.15);
}

.step-label {
  display: block;
}

/* Hide desktop nav on mobile */
@media (max-width: 767px) {
  .step-list.step-list-desktop {
    display: none;
  }
}

/* Mobile: fixed bottom nav bar */
.step-list-mobile {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding-left: env(safe-area-inset-left, 0);
  padding-right: env(safe-area-inset-right, 0);
  padding-bottom: env(safe-area-inset-bottom, 0);
  pointer-events: none;
}

.step-list-mobile-inner {
  pointer-events: auto;
  padding: 10px 12px 10px 16px;
  background: rgba(10, 10, 15, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.3);
}

.step-list-mobile-scroll {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 2px;
}

.step-list-mobile-scroll::-webkit-scrollbar {
  display: none;
}

.step-mobile-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  min-height: 40px;
  border: 1px solid transparent;
  border-radius: 9999px;
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  white-space: nowrap;
}

.step-mobile-item:hover {
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.04);
}

.step-mobile-item.active {
  color: #00f5ff;
  background: rgba(0, 245, 255, 0.1);
  border-color: rgba(0, 245, 255, 0.25);
  box-shadow: 0 0 16px -2px rgba(0, 245, 255, 0.2);
}

.step-mobile-label {
  font-family: inherit;
}

@media (max-width: 767px) {
  .step-list-mobile {
    display: block;
  }
}
</style>
