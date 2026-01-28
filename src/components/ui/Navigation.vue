<template>
  <nav 
    ref="navRef"
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      isScrolled ? 'glass border-b border-neon-cyan/30 shadow-lg shadow-neon-cyan/10' : 'bg-transparent'
    ]"
  >
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div 
          class="logo text-3xl font-bold cursor-pointer group"
          @click="scrollToTop"
        >
          <span class="text-neon-cyan neon-glow group-hover:text-neon-magenta transition-colors duration-300">
            &lt;IE /&gt;
          </span>
        </div>
        
        <ul class="hidden md:flex items-center space-x-1">
          <li v-for="item in navItems" :key="item.id">
            <a
              :href="`#${item.id}`"
              @click.prevent="scrollToSection(item.id)"
              :class="[
                'nav-link relative px-4 py-2 text-sm font-medium text-white/70 hover:text-neon-cyan transition-all duration-300 cursor-pointer uppercase tracking-wider',
                activeSection === item.id ? 'text-neon-cyan' : ''
              ]"
            >
              {{ item.label }}
              <span 
                v-if="activeSection === item.id"
                class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-neon-cyan to-neon-magenta transform scale-x-100 transition-transform duration-300"
              ></span>
              <span 
                class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-magenta transform scale-x-0 transition-transform duration-300 nav-link-underline"
              ></span>
            </a>
          </li>
        </ul>

        <!-- Mobile menu button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden text-neon-cyan focus:outline-none p-2"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden mt-4 pb-4 space-y-2 glass rounded-lg p-4"
      >
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          @click.prevent="scrollToSection(item.id)"
          :class="[
            'block px-4 py-2 text-white/70 hover:text-neon-cyan transition-colors duration-300 rounded',
            activeSection === item.id ? 'text-neon-cyan bg-neon-cyan/10' : ''
          ]"
        >
          {{ item.label }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' }
]

const navRef = ref(null)
const isScrolled = ref(false)
const activeSection = ref('hero')
const mobileMenuOpen = ref(false)
const { y: scrollY } = useWindowScroll()

const updateScrollState = () => {
  isScrolled.value = scrollY.value > 50
  
  // Update active section based on scroll position
  const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean)
  const current = sections.find(section => {
    const rect = section.getBoundingClientRect()
    return rect.top <= 100 && rect.bottom >= 100
  })
  
  if (current) {
    activeSection.value = current.id
  }
}

const scrollToSection = (sectionId) => {
  mobileMenuOpen.value = false
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', updateScrollState, { passive: true })
    updateScrollState()
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', updateScrollState)
  }
})
</script>

<style scoped>
.nav-link {
  position: relative;
  font-weight: 500;
  letter-spacing: 0.1em;
}

.nav-link:hover .nav-link-underline {
  transform: scaleX(1);
}

.nav-link-underline {
  transform-origin: left;
}

.nav-link:hover {
  transform: translateY(-2px);
  text-shadow: 0 0 10px currentColor;
}
</style>
