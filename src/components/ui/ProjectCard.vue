<template>
  <article
    class="project-card group relative h-full rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-neon-cyan/30 hover:bg-white/[0.04]"
    :class="compact ? 'p-3 sm:p-4' : 'p-4 sm:p-6'"
  >
    <!-- Left accent -->
    <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-cyan/60 to-neon-magenta/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    <div class="relative flex h-full flex-col">
      <header class="flex items-start justify-between gap-2 mb-1.5 sm:mb-2">
        <h3 class="font-display font-semibold text-white group-hover:text-neon-cyan/90 transition-colors duration-300" :class="compact ? 'text-[15px] sm:text-base' : 'text-lg sm:text-xl'">
          {{ project.title }}
        </h3>
        <span class="shrink-0 text-xs font-medium text-white/40 tabular-nums">{{ project.year }}</span>
      </header>

      <p
        class="text-white/60 leading-snug flex-1 min-h-0"
        :class="compact ? 'text-[13px] sm:text-sm line-clamp-3 mb-2 sm:mb-3' : 'text-sm sm:text-base mb-3 sm:mb-4'"
      >
        {{ project.description }}
      </p>

      <div class="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
        <span
          v-for="tech in project.technologies"
          :key="tech"
          class="px-2 py-0.5 rounded-md text-xs font-medium border border-white/10 text-white/70 bg-white/[0.03]"
        >
          {{ tech }}
        </span>
      </div>

      <footer v-if="project.link" class="mt-auto pt-1">
        <a
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 py-2 -mx-1 px-1 rounded-lg text-xs font-medium text-neon-cyan hover:text-neon-cyan/80 hover:bg-white/[0.04] transition-colors duration-200 min-h-[44px] sm:min-h-0 sm:py-0 sm:mx-0 sm:px-0 sm:rounded-none sm:hover:bg-transparent"
        >
          View project
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </footer>
    </div>
  </article>
</template>

<script setup>
defineProps({
  project: { type: Object, required: true },
  compact: { type: Boolean, default: false }
})
</script>

<style scoped>
.project-card:hover {
  z-index: 1;
}
</style>
