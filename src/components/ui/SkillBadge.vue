<template>
  <div
    class="skill-badge shrink-0 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 sm:px-5 sm:py-3 text-white/90 font-medium text-xs sm:text-sm transition-all duration-300 hover:border-neon-cyan/30 hover:bg-white/[0.04] hover:text-white"
  >
    {{ skill.name }}
  </div>
</template>

<script setup>
defineProps({
  skill: { type: Object, required: true }
})
</script>
