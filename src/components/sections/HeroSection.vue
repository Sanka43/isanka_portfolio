<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center overflow-hidden bg-[#06070a]"
  >
    <!-- Gradient mesh background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-neon-cyan/8 rounded-full blur-[120px] animate-float" />
      <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-magenta/8 rounded-full blur-[100px] animate-float" style="animation-delay: 2s" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[80px] animate-float" style="animation-delay: 4s" />
      <!-- Grid overlay -->
      <div
        class="absolute inset-0 opacity-[0.03]"
        style="background-image: linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px); background-size: 64px 64px"
      />
    </div>

    <ParticleBackground :particle-count="600" class="opacity-60" />

    <div class="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
      <div class="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center min-h-[85vh] py-12 sm:py-16 md:py-20">
        <!-- Left: content -->
        <div class="hero-content text-center lg:text-left order-2 lg:order-1">
          <div
            ref="badgeRef"
            class="inline-flex items-center gap-2 mb-4 sm:mb-6 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm"
          >
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span class="text-sm font-medium text-white/70 tracking-wide">Available for work</span>
          </div>

          <h1
            ref="heroTitleRef"
            class="font-display font-bold mb-6 leading-[0.95] tracking-tight text-white"
            :class="titleSize"
          >
            <span class="block">Isanka</span>
            <span class="block">Eranga</span>
          </h1>

          <div
            ref="heroSubtitleRef"
            class="mb-4 sm:mb-5"
          >
            <span class="text-lg sm:text-xl md:text-2xl text-white/90 font-light">
              Software Engineer
            </span>
            <span class="text-neon-cyan/80 text-lg sm:text-xl md:text-2xl mx-1.5">/</span>
            <span class="text-lg sm:text-xl md:text-2xl text-white/90 font-light">
              Full Stack Developer
            </span>
          </div>

          <p
            ref="heroDescriptionRef"
            class="text-base sm:text-lg text-white/50 max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 md:mb-10 leading-relaxed"
          >
            Crafting digital experiences with code, creativity, and cutting-edge technology.
          </p>

          <div ref="heroButtonsRef" class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <a
              href="#projects"
              class="group relative px-6 sm:px-8 py-3.5 min-h-[48px] sm:min-h-0 flex items-center justify-center rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:ring-offset-2 focus:ring-offset-[#06070a]"
              :style="ctaGradient"
              @click.prevent="scrollToSection('projects')"
            >
              <span class="relative z-10">View My Work</span>
              <div class="absolute inset-0 bg-gradient-to-r from-neon-magenta to-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="#contact"
              class="px-6 sm:px-8 py-3.5 min-h-[48px] sm:min-h-0 flex items-center justify-center rounded-xl font-semibold border border-white/20 text-white/90 hover:border-neon-cyan/50 hover:text-neon-cyan hover:bg-white/[0.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-cyan/30 focus:ring-offset-2 focus:ring-offset-[#06070a]"
              @click.prevent="scrollToSection('contact')"
            >
              Get In Touch
            </a>
          </div>
        </div>

        <!-- Right: decorative -->
        <div class="hidden lg:flex order-1 lg:order-2 justify-center lg:justify-end items-center pointer-events-none">
          <div class="relative w-80 h-80 lg:w-96 lg:h-96">
            <div class="absolute inset-0 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent rotate-6 scale-95" />
            <div class="absolute inset-0 rounded-3xl border border-neon-cyan/20 bg-neon-cyan/5 -rotate-6 scale-95" />
            <div class="absolute inset-4 rounded-2xl border border-white/5 flex items-center justify-center">
              <span class="font-display font-bold text-6xl lg:text-7xl text-white/5 select-none">&lt;/&gt;</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator (above mobile bottom nav) -->
    <div
      ref="scrollIndicatorRef"
      class="absolute bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span class="text-xs font-medium text-white/40 uppercase tracking-widest">Scroll</span>
      <div class="w-px h-10 bg-gradient-to-b from-white/30 to-transparent rounded-full" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import ParticleBackground from '../3D/ParticleBackground.vue'

const badgeRef = ref(null)
const heroTitleRef = ref(null)
const heroSubtitleRef = ref(null)
const heroDescriptionRef = ref(null)
const heroButtonsRef = ref(null)
const scrollIndicatorRef = ref(null)

const titleSize = computed(() => {
  return 'text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-8xl'
})

const ctaGradient = computed(() => ({
  background: 'linear-gradient(135deg, #00f5ff 0%, #ff00ff 100%)',
  boxShadow: '0 4px 24px -2px rgba(0, 245, 255, 0.25), 0 0 0 1px rgba(255,255,255,0.05) inset'
}))

const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId)
  if (!el) return
  const container = document.querySelector('.scroll-container')
  if (container) {
    const top = el.getBoundingClientRect().top + container.scrollTop - 80
    container.scrollTo({ top, behavior: 'smooth' })
  }
}

onMounted(() => {
  const tl = gsap.timeline()
  tl.from(badgeRef.value, { opacity: 0, y: -12, duration: 0.6, ease: 'power3.out' })
    .from(heroTitleRef.value?.children || [], { opacity: 0, y: 32, duration: 0.9, stagger: 0.15, ease: 'power3.out' }, '-=0.2')
    .from(heroSubtitleRef.value, { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out' }, '-=0.5')
    .from(heroDescriptionRef.value, { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out' }, '-=0.5')
    .from(heroButtonsRef.value?.children || [], { opacity: 0, y: 16, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, '-=0.4')
    .from(scrollIndicatorRef.value, { opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
})
</script>

