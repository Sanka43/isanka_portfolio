<template>
  <section
    id="about"
    class="relative min-h-screen flex items-center py-16 md:py-24 bg-[#06070a] overflow-hidden"
  >
    <!-- Background accents -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-1/4 -left-32 w-96 h-96 bg-neon-magenta/6 rounded-full blur-[100px]" />
      <div class="absolute bottom-1/4 -right-32 w-80 h-80 bg-neon-cyan/6 rounded-full blur-[80px]" />
      <div
        class="absolute inset-0 opacity-[0.02]"
        style="background-image: linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px); background-size: 64px 64px"
      />
    </div>

    <div class="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12">
      <!-- Section title -->
      <div ref="titleRef" class="text-center mb-12 md:mb-16">
        <span class="text-sm font-medium text-neon-cyan/80 uppercase tracking-[0.2em]">Who I am</span>
        <h2 class="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mt-2">
          About <span class="text-neon-cyan">Me</span>
        </h2>
      </div>

      <div class="grid lg:grid-cols-[1fr,400px] gap-10 lg:gap-16 items-start">
        <!-- Bio -->
        <div ref="bioRef" class="space-y-6">
          <p class="text-white/85 text-base md:text-lg leading-relaxed">
            Enthusiastic <span class="text-neon-cyan font-medium">Front-End Developer</span> with strong technical skills and a creative approach to problem-solving. Passionate about building user-friendly, responsive, and visually appealing web and mobile interfaces that enhance user experience.
          </p>
          <p class="text-white/85 text-base md:text-lg leading-relaxed">
            Skilled in translating design concepts into clean, efficient code and ensuring cross-platform compatibility. Quick learner with a keen interest in exploring new technologies, frameworks, and tools to improve design quality and performance.
          </p>
          <p class="text-white/85 text-base md:text-lg leading-relaxed">
            Dedicated to continuous growth, teamwork, and delivering reliable, high-quality solutions that align with modern development standards.
          </p>
          <div class="flex flex-wrap gap-3 pt-2">
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-white/80 text-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
              English
            </span>
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-white/80 text-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-neon-magenta" />
              Sinhala
            </span>
          </div>
        </div>

        <!-- Education -->
        <div ref="eduRef" class="lg:sticky lg:top-24">
          <div class="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <h3 class="font-display font-semibold text-xl text-white mb-6 flex items-center gap-3">
              <span class="w-8 h-px bg-gradient-to-r from-neon-cyan to-neon-magenta" />
              Education
            </h3>
            <div class="space-y-6">
              <div
                v-for="(edu, i) in education"
                :key="i"
                class="relative pl-6 border-l-2 border-white/10 hover:border-neon-cyan/40 transition-colors duration-300"
              >
                <div class="absolute -left-[9px] top-1.5 w-3 h-3 rounded-full bg-neon-cyan/80 ring-4 ring-[#06070a]" />
                <h4 class="text-white font-semibold text-base md:text-lg mb-0.5">{{ edu.degree }}</h4>
                <p class="text-neon-cyan/90 text-sm mb-1">{{ edu.institution }}</p>
                <p class="text-white/40 text-xs">{{ edu.year }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const titleRef = ref(null)
const bioRef = ref(null)
const eduRef = ref(null)

const education = [
  { degree: 'ICT (Hons) Software Technology', institution: 'Wayamba University of Sri Lanka', year: '2025' },
  { degree: 'G.C.E. Advanced Level', institution: 'Dharmadutha College Badulla', year: '2019' }
]

onMounted(() => {
  const scrollRoot = document.querySelector('.scroll-container')
  if (!scrollRoot || !titleRef.value) return

  gsap.from(titleRef.value, {
    opacity: 0,
    y: 24,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: titleRef.value,
      scroller: scrollRoot,
      start: 'top 88%',
      once: true
    }
  })

  gsap.from(bioRef.value?.children ?? [], {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.08,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: bioRef.value,
      scroller: scrollRoot,
      start: 'top 85%',
      once: true
    }
  })

  gsap.from(eduRef.value, {
    opacity: 0,
    x: 24,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: eduRef.value,
      scroller: scrollRoot,
      start: 'top 82%',
      once: true
    }
  })
})
</script>
