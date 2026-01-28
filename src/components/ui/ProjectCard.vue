<template>
  <article
    class="project-card group relative h-full rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-neon-cyan/30 hover:bg-white/[0.04]"
    :class="compact ? 'p-4' : 'p-6'"
  >
    <!-- Left accent -->
    <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-cyan/60 to-neon-magenta/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    <div class="relative flex h-full flex-col">
      <header class="flex items-start justify-between gap-2 mb-2">
        <h3 class="font-display font-semibold text-white group-hover:text-neon-cyan/90 transition-colors duration-300" :class="compact ? 'text-base' : 'text-xl'">
          {{ project.title }}
        </h3>
        <span class="shrink-0 text-xs font-medium text-white/40 tabular-nums">{{ project.year }}</span>
      </header>

      <p
        class="text-white/60 leading-snug flex-1 min-h-0"
        :class="compact ? 'text-sm line-clamp-3 mb-3' : 'text-base mb-4'"
      >
        {{ project.description }}
      </p>

      <div class="flex flex-wrap gap-1.5 mb-3">
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
          class="inline-flex items-center gap-1.5 text-xs font-medium text-neon-cyan hover:text-neon-cyan/80 transition-colors duration-200"
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
