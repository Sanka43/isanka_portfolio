<template>
  <section
    id="projects"
    class="relative min-h-screen flex flex-col justify-center py-8 sm:py-10 md:py-14 bg-[#06070a] overflow-hidden"
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

    <div class="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 flex-1 flex flex-col justify-center">
      <!-- Title -->
      <div ref="titleRef" class="text-center mb-6 sm:mb-8 md:mb-10">
        <span class="text-sm font-medium text-neon-cyan/80 uppercase tracking-[0.2em]">What I've built</span>
        <h2 class="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mt-2">
          Projects
        </h2>
      </div>

      <!-- Grid -->
      <div
        ref="gridRef"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
      >
        <ProjectCard
          v-for="(project, index) in projects"
          :key="index"
          :project="project"
          :compact="true"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from '../ui/ProjectCard.vue'

gsap.registerPlugin(ScrollTrigger)

const titleRef = ref(null)
const gridRef = ref(null)

const projects = [
  {
    title: 'Fixvion',
    description: 'AI-powered code analysis tool that reviews generated code for quality, errors, and performance issues. Helps developers understand, improve, and refine AI-written code through clear insights and practical suggestions.',
    technologies: ['AI', 'Code Analysis', 'TypeScript', 'Web'],
    year: '2026',
    // link: 'https://fixvion.com'
  },
  {
    title: 'AIHedgeFund',
    description: 'Educational platform that simulates hedge fund strategies using AI agents, allowing users to analyze stocks and test investment ideas without real money.',
    technologies: ['AI', 'Finance', 'Simulation', 'Web'],
    year: '2026',
    // link: 'https://aihedgefund.com'
  },
  {
    title: 'Food Stock Management',
    description: 'Mobile app for real-time food stock monitoring and supplier coordination using IoT and Firebase. Automated stock tracking system.',
    technologies: ['Arduino C', 'Flutter', 'Dart', 'Firebase'],
    year: '2025',
    link: null
  },
  {
    title: 'Service & Job Finder Platform',
    description: 'Front-end development of "jobuy" web platform connecting 200+ service providers with customers. Responsive layouts and interactive features.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'SQL'],
    year: '2024',
    link: null
  },
  {
    title: 'HR Management System',
    description: 'Web-based platform for employee monitoring, attendance tracking, and performance management. Responsive React front-end with Node.js and MySQL backend.',
    technologies: ['React', 'Node.js', 'MySQL'],
    year: '2024',
    link: null
  }
]

onMounted(async () => {
  await nextTick()
  if (!titleRef.value || !gridRef.value) return

  // Wait a bit more for Vue to render components
  await nextTick()
  
  const scrollRoot = document.querySelector('.scroll-container')
  const st = (trigger, start) => ({ 
    trigger, 
    scroller: scrollRoot || window, 
    start, 
    once: true
  })

  // Get card elements - query for the actual article elements rendered by ProjectCard
  const cards = gridRef.value.querySelectorAll('article.project-card')
  const cardElements = cards.length > 0 ? Array.from(cards) : []

  if (cardElements.length === 0) {
    // If still no cards, make grid visible and return
    console.warn('Project cards not found in DOM')
    return
  }

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

  // Animate cards
  gsap.fromTo(cardElements,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: st(gridRef.value, 'top 85%')
    }
  )

  // Fallback: ensure visibility after a delay
  setTimeout(() => {
    if (!gridRef.value) return
    
    const rect = gridRef.value.getBoundingClientRect()
    const isInView = rect.top < window.innerHeight * 1.5 && rect.bottom > -200
    
    if (isInView) {
      // Force visibility if section is in view
      gsap.set(titleRef.value, { opacity: 1, y: 0 })
      gsap.set(cardElements, { opacity: 1, y: 0 })
    }
  }, 1000)
})
</script>
