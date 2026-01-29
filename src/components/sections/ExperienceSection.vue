<template>
  <section
    id="experience"
    class="relative min-h-screen flex flex-col pt-6 md:pt-8 pb-10 md:pb-14 bg-[#06070a] overflow-visible"
  >
    <!-- Background -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-neon-magenta/6 rounded-full blur-[100px]" />
      <div class="absolute bottom-0 left-0 w-[350px] h-[350px] bg-neon-cyan/6 rounded-full blur-[80px]" />
      <div
        class="absolute inset-0 opacity-[0.02]"
        style="background-image: linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px); background-size: 64px 64px"
      />
    </div>

    <div class="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 flex-1 flex flex-col justify-center pt-4 md:pt-6">
      <!-- Title -->
      <div ref="titleRef" class="text-center mb-6 sm:mb-8 md:mb-10">
        <span class="text-sm font-medium text-neon-cyan/80 uppercase tracking-[0.2em]">Where I've worked</span>
        <h2 class="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mt-2">
          Experience
        </h2>
      </div>

      <!-- Experience Cards: horizontal scroll on mobile, grid on desktop -->
      <div class="experience-cards">
        <div
          v-for="(exp, index) in experiences"
          :key="index"
          :ref="el => { if (el) experienceRefs[index] = el }"
          class="experience-item group"
        >
          <article
            class="relative h-full rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 md:p-8 transition-all duration-300 hover:border-neon-cyan/30 hover:bg-white/[0.04] overflow-hidden"
          >
            <!-- Left accent bar -->
            <div 
              class="absolute left-0 top-0 bottom-0 w-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              :class="exp.isCurrent ? 'bg-gradient-to-b from-neon-cyan to-neon-magenta' : 'bg-gradient-to-b from-neon-magenta/60 to-neon-cyan/60'"
            />

            <!-- Gradient overlay on hover -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-full" />

            <div class="relative z-10 flex flex-col h-full">
              <!-- Header -->
              <div class="flex flex-col gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div>
                  <h3 class="font-display font-semibold text-lg sm:text-xl md:text-2xl text-white group-hover:text-neon-cyan/90 transition-colors duration-300 mb-1">
                    {{ exp.title }}
                  </h3>
                  <p class="text-neon-cyan font-medium text-sm md:text-base flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {{ exp.company }}
                  </p>
                </div>
                
                <!-- Badges -->
                <div class="flex items-center gap-2 flex-wrap">
                  <span 
                    v-if="exp.isCurrent"
                    class="px-3 py-1 bg-neon-cyan/20 text-neon-cyan rounded-full text-xs font-medium border border-neon-cyan/30"
                  >
                    Current
                  </span>
                  <span 
                    v-if="exp.duration"
                    class="text-xs font-medium text-white/40 tabular-nums"
                  >
                    {{ exp.duration }}
                  </span>
                </div>
              </div>

              <!-- Responsibilities -->
              <ul class="space-y-2 sm:space-y-2.5 mt-auto">
                <li 
                  v-for="(responsibility, idx) in exp.responsibilities"
                  :key="idx"
                  class="text-white/70 text-[13px] sm:text-sm md:text-base leading-relaxed flex items-start gap-2 sm:gap-3"
                >
                  <span class="text-neon-cyan/80 mt-1.5 flex-shrink-0">▹</span>
                  <span>{{ responsibility }}</span>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const titleRef = ref(null)
const experienceRefs = ref([])

const experiences = [
  {
    title: 'Software Engineer',
    company: 'Infra Technologies',
    duration: null,
    isCurrent: true,
    startDate: '2025/12/10',
    responsibilities: [
      'Developing and maintaining software applications',
      'Collaborating with cross-functional teams',
      'Implementing best practices and modern development standards',
      'Optimizing web applications for SEO, performance, and search visibility',
      'Supporting digital marketing efforts through analytics, tracking, and data-driven improvements'
    ]
  },
  {
    title: 'Software Engineer Internship',
    company: 'Blue Chip Technologies Asia, Colombo',
    duration: '06/2024 - 12/2024',
    isCurrent: false,
    responsibilities: [
      'Developed full-stack web applications using PHP, MySQL, React.js, and Firebase',
      'Designed dynamic UIs with HTML, CSS, Bootstrap, and React',
      'Created and deployed WordPress sites with WooCommerce and Contact Form plugins',
      'Developed Flutter-based mobile HR Management app with Firebase integration',
      'Collaborated with senior developers for weekly reviews'
    ]
  }
]

onMounted(async () => {
  await nextTick()
  if (!titleRef.value) return

  const scrollRoot = document.querySelector('.scroll-container')
  const st = (trigger, start) => ({ 
    trigger, 
    scroller: scrollRoot || window, 
    start, 
    once: true
  })

  // Animate title
  gsap.fromTo(titleRef.value, 
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: st(titleRef.value, 'top 88%')
    }
  )

  // Animate experience cards
  await nextTick()
  
  experienceRefs.value.forEach((ref, index) => {
    if (ref) {
      const card = ref.querySelector('article')
      if (card) {
        // Animate from left for first card, from right for second card
        const xOffset = index === 0 ? -30 : 30
        gsap.fromTo(card,
          { opacity: 0, y: 30, x: xOffset },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: st(ref, 'top 85%')
          }
        )
      }
    }
  })

  // Fallback: ensure visibility after a delay
  setTimeout(() => {
    if (titleRef.value) {
      gsap.set(titleRef.value, { opacity: 1, y: 0 })
    }
    experienceRefs.value.forEach((ref) => {
      if (ref) {
        const card = ref.querySelector('article')
        if (card) {
          gsap.set(card, { opacity: 1, y: 0, x: 0 })
        }
      }
    })
  }, 1000)
})
</script>

<style scoped>
.experience-item {
  position: relative;
}

/* Mobile: horizontal scrollable row, swipe left/right */
.experience-cards {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: visible;
  gap: 1rem;
  margin-left: -1rem;
  margin-right: -1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 4px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.experience-cards::-webkit-scrollbar {
  display: none;
}

@media (min-width: 640px) {
  .experience-cards {
    margin-left: -1.5rem;
    margin-right: -1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .experience-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    overflow: visible;
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
    scroll-snap-type: none;
    -webkit-overflow-scrolling: auto;
  }
}

.experience-item {
  flex-shrink: 0;
  width: min(88vw, 360px);
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

@media (min-width: 1024px) {
  .experience-item {
    width: auto;
    flex-shrink: unset;
    scroll-snap-align: none;
    scroll-snap-stop: unset;
  }
}
</style>
