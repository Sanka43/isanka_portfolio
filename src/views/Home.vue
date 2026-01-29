<template>
  <div class="home-wrapper">
    <div class="home scroll-container">
      <ScrollParallax3D :imagePath="bgImage" :speed="0.5" />
      <HeroSection class="snap-section" />
      <AboutSection class="snap-section" />
      <ProjectsSection class="snap-section" />
      <SkillsSection class="snap-section" />
      <ExperienceSection class="snap-section" />
      <ContactSection class="snap-section" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeroSection from '../components/sections/HeroSection.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import ProjectsSection from '../components/sections/ProjectsSection.vue'
import SkillsSection from '../components/sections/SkillsSection.vue'
import ExperienceSection from '../components/sections/ExperienceSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'
import ScrollParallax3D from '../components/3D/ScrollParallax3D.vue'
import bgImageSrc from '../assets/images/bgimage.png'

const bgImage = ref(bgImageSrc)
</script>

<style scoped>
.home-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.scroll-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  transform-style: preserve-3d;
}

.home {
  position: relative;
  width: 100%;
  transform-style: preserve-3d;
}

.snap-section {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  width: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: normal;
}

.snap-section {
  display: block;
}

.home > .snap-section {
  position: relative;
  z-index: 2;
}

/* Mobile: scroll snap + reserve space for bottom nav */
@media (max-width: 767px) {
  .scroll-container {
    scroll-snap-type: y mandatory;
    scroll-padding-bottom: 72px;
  }
}

/* Hide scrollbar but keep functionality */
.scroll-container::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

.scroll-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
