<template>
  <Transition name="page">
    <slot />
  </Transition>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'

onMounted(() => {
  // Global page transition animations
  gsap.set('.page-enter-active, .page-leave-active', {
    transition: 'all 0.5s ease'
  })
})
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
