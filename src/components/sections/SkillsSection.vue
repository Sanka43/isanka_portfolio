<template>
  <section
    id="skills"
    class="relative min-h-screen flex flex-col justify-center py-14 md:py-20 bg-[#06070a] overflow-hidden"
  >
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-1/3 -right-24 w-80 h-80 bg-neon-cyan/6 rounded-full blur-[100px]" />
      <div class="absolute bottom-1/3 -left-24 w-72 h-72 bg-neon-magenta/6 rounded-full blur-[80px]" />
      <div
        class="absolute inset-0 opacity-[0.02]"
        style="background-image: linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px); background-size: 64px 64px"
      />
    </div>

    <div class="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 flex-1 flex flex-col justify-center">
      <div ref="titleRef" class="text-center mb-10 md:mb-12">
        <span class="text-sm font-medium text-neon-cyan/80 uppercase tracking-[0.2em]">What I use</span>
        <h2 class="font-display font-bold text-4xl md:text-5xl text-white mt-2">Skills</h2>
      </div>

      <div class="space-y-12">
        <!-- Technical – marquee rows -->
        <div ref="techRef">
          <h3 class="font-display font-semibold text-xl text-white text-center mb-8">
            Supported Languages & Frameworks
          </h3>
          <div class="space-y-6">
            <!-- Row 1: scroll left -->
            <div class="marquee-row overflow-hidden relative">
              <div class="marquee-track marquee-track-left flex gap-6 w-max">
                <div class="flex gap-4 shrink-0">
                  <SkillBadge v-for="(s, i) in technicalSkillsRow1" :key="'r1-a-' + i" :skill="s" />
                </div>
                <div class="flex gap-4 shrink-0">
                  <SkillBadge v-for="(s, i) in technicalSkillsRow1" :key="'r1-b-' + i" :skill="s" />
                </div>
              </div>
            </div>
            <!-- Row 2: scroll right -->
            <div class="marquee-row overflow-hidden relative">
              <div class="marquee-track marquee-track-right flex gap-6 w-max">
                <div class="flex gap-4 shrink-0">
                  <SkillBadge v-for="(s, i) in technicalSkillsRow2" :key="'r2-a-' + i" :skill="s" />
                </div>
                <div class="flex gap-4 shrink-0">
                  <SkillBadge v-for="(s, i) in technicalSkillsRow2" :key="'r2-b-' + i" :skill="s" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Soft skills -->
        <div ref="softRef">
          <h3 class="font-display font-semibold text-lg text-white/90 mb-4 flex items-center gap-3">
            <span class="w-6 h-px bg-gradient-to-r from-neon-magenta to-neon-cyan" />
            Soft skills
          </h3>
          <div class="grid md:grid-cols-3 gap-4">
            <div
              v-for="(s, i) in softSkills"
              :key="i"
              class="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-neon-cyan/30 hover:bg-white/[0.04]"
            >
              <p class="text-white/80 text-sm leading-relaxed">{{ s }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SkillBadge from '../ui/SkillBadge.vue'

gsap.registerPlugin(ScrollTrigger)

const titleRef = ref(null)
const techRef = ref(null)
const softRef = ref(null)

const technicalSkillsRow1 = [
  { name: 'HTML' },
  { name: 'CSS' },
  { name: 'JavaScript' },
  { name: 'TypeScript' },
  { name: 'Vue.js' },
  { name: 'React' },
  { name: 'Node.js' },
  { name: 'Tailwind CSS' },
  { name: 'WordPress' },
  { name: 'Flutter' },
  { name: 'Dart' },
  { name: 'React Native' },
  { name: 'Git' },
  { name: 'REST APIs' },
  { name: 'MySQL' },
  { name: 'Firebase' },
  { name: 'Figma' }
]

const technicalSkillsRow2 = [
{ name: 'HTML' },
  { name: 'CSS' },
  { name: 'JavaScript' },
  { name: 'TypeScript' },
  { name: 'Vue.js' },
  { name: 'React' },
  { name: 'Node.js' },
  { name: 'Tailwind CSS' },
  { name: 'WordPress' },
  { name: 'Flutter' },
  { name: 'Dart' },
  { name: 'React Native' },
  { name: 'Git' },
  { name: 'REST APIs' },
  { name: 'MySQL' },
  { name: 'Firebase' },
  { name: 'Figma' }
]

const softSkills = [
  'Time Management and Task Prioritization',
  'Collaboration with Designers and Backend Developers',
  'Adaptability',
  'Problem Solving',
  'Communication',
  'Continuous Learning'
]

onMounted(async () => {
  await nextTick()
  if (!titleRef.value || !techRef.value || !softRef.value) return

  const scrollRoot = document.querySelector('.scroll-container')
  const st = (trigger, start) => ({ trigger, scroller: scrollRoot, start, once: true })

  gsap.from(titleRef.value, {
    opacity: 0,
    y: 24,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: st(titleRef.value, 'top 88%')
  })

  gsap.from(techRef.value, {
    opacity: 0,
    y: 16,
    duration: 0.5,
    ease: 'power3.out',
    scrollTrigger: st(techRef.value, 'top 85%')
  })

  gsap.from(softRef.value, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: 'power3.out',
    scrollTrigger: st(softRef.value, 'top 88%')
  })
})
</script>

<style scoped>
.marquee-row {
  mask-image: linear-gradient(
    to right,
    transparent 0,
    black 80px,
    black calc(100% - 80px),
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0,
    black 80px,
    black calc(100% - 80px),
    transparent 100%
  );
}

.marquee-track {
  padding: 0 16px;
}

@keyframes marquee-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes marquee-right {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

.marquee-track-left {
  animation: marquee-left 28s linear infinite;
}

.marquee-track-right {
  animation: marquee-right 28s linear infinite;
}
</style>
