<template>
  <section
    id="contact"
    class="relative min-h-screen flex flex-col py-4 md:py-6 bg-[#06070a] overflow-visible last-section"
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

    <div class="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 flex-1 flex flex-col justify-between py-4">
      <div class="flex-1 flex flex-col justify-center">
        <!-- Title -->
        <div ref="titleRef" class="text-center mb-6 md:mb-8">
          <span class="text-sm font-medium text-neon-cyan/80 uppercase tracking-[0.2em]">Get in touch</span>
          <h2 class="font-display font-bold text-4xl md:text-5xl text-white mt-2">
            Contact
          </h2>
        </div>

        <!-- Content Grid - Compact Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 mb-6">
          <!-- Contact Information -->
          <div ref="infoRef" class="space-y-4">
          <div class="rounded-xl border border-white/10 bg-white/[0.02] p-4 md:p-5 transition-all duration-300 hover:border-neon-cyan/30 hover:bg-white/[0.04] h-full">
            <h3 class="font-display font-semibold text-base text-white mb-3">Let's Connect</h3>
            <p class="text-white/70 text-xs leading-relaxed mb-4">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            
            <!-- Contact Methods -->
            <div class="space-y-3">
              <a
                href="mailto:your.email@example.com"
                class="flex items-center gap-3 text-white/80 hover:text-neon-cyan transition-colors duration-300 group"
              >
                <div class="w-10 h-10 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center group-hover:border-neon-cyan/30 group-hover:bg-white/[0.04] transition-all duration-300 flex-shrink-0">
                  <svg class="w-4 h-4 text-neon-cyan" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="min-w-0">
                  <p class="text-xs text-white/40 mb-0.5">Email</p>
                  <p class="text-sm font-medium truncate">isankaerangahtc820@gmail.com</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/isanka-eranga-0155632a3/"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 text-white/80 hover:text-neon-cyan transition-colors duration-300 group"
              >
                <div class="w-10 h-10 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center group-hover:border-neon-cyan/30 group-hover:bg-white/[0.04] transition-all duration-300 flex-shrink-0">
                  <svg class="w-4 h-4 text-neon-cyan" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div class="min-w-0">
                  <p class="text-xs text-white/40 mb-0.5">LinkedIn</p>
                  <p class="text-sm font-medium truncate">linkedin.com/in/isanka-eranga-0155632a3/</p>
                </div>
              </a>

              <a
                href="https://github.com/Sanka43"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 text-white/80 hover:text-neon-cyan transition-colors duration-300 group"
              >
                <div class="w-10 h-10 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center group-hover:border-neon-cyan/30 group-hover:bg-white/[0.04] transition-all duration-300 flex-shrink-0">
                  <svg class="w-4 h-4 text-neon-cyan" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="min-w-0">
                  <p class="text-xs text-white/40 mb-0.5">GitHub</p>
                  <p class="text-sm font-medium truncate">github.com/Sanka43</p>
                </div>
              </a>
            </div>
          </div>
          </div>

          <!-- Contact Form -->
          <div ref="formRef" class="rounded-xl border border-white/10 bg-white/[0.02] p-4 md:p-5 transition-all duration-300 hover:border-neon-cyan/30 hover:bg-white/[0.04]">
          <h3 class="font-display font-semibold text-base text-white mb-3">Send a Message</h3>
          
          <form @submit.prevent="handleSubmit" class="space-y-3">
            <div ref="nameFieldRef" class="form-group">
              <label for="name" class="block text-xs font-medium text-white/70 mb-1">Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/[0.02] text-white text-sm placeholder-white/30 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-300"
                placeholder="Your Name"
              />
            </div>
            
            <div ref="emailFieldRef" class="form-group">
              <label for="email" class="block text-xs font-medium text-white/70 mb-1">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/[0.02] text-white text-sm placeholder-white/30 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-300"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div ref="messageFieldRef" class="form-group">
              <label for="message" class="block text-xs font-medium text-white/70 mb-1">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="3"
                class="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/[0.02] text-white text-sm placeholder-white/30 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-300 resize-none"
                placeholder="Your Message"
              ></textarea>
            </div>
            
            <div ref="submitButtonRef" class="form-group pt-0.5">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full px-5 py-2 bg-gradient-to-r from-neon-cyan to-neon-magenta text-white rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-neon-cyan/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
              >
                <span class="relative z-10 flex items-center justify-center gap-2">
                  <span v-if="!isSubmitting">Send Message</span>
                  <span v-else class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-neon-magenta to-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </form>
          
          <!-- Status Message -->
          <div 
            v-if="submitStatus" 
            class="mt-3 p-3 rounded-lg border text-sm transition-all duration-300"
            :class="submitStatus.type === 'success' ? 'border-neon-cyan/30 bg-neon-cyan/10' : 'border-red-500/30 bg-red-500/10'"
          >
            <p :class="submitStatus.type === 'success' ? 'text-neon-cyan' : 'text-red-400'">
              {{ submitStatus.message }}
            </p>
          </div>
          </div>
        </div>
      </div>

      <!-- Footer Copyright -->
      <footer class="text-center py-3 border-t border-white/10">
        <p class="text-white/60 text-sm">
          &copy; 2025 <span class="text-neon-cyan">Isanka Eranga</span>. All rights reserved.
        </p>
      </footer>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const titleRef = ref(null)
const infoRef = ref(null)
const formRef = ref(null)
const nameFieldRef = ref(null)
const emailFieldRef = ref(null)
const messageFieldRef = ref(null)
const submitButtonRef = ref(null)

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref(null)

const handleSubmit = async () => {
  isSubmitting.value = true
  submitStatus.value = null
  
  // Simulate form submission
  setTimeout(() => {
    isSubmitting.value = false
    submitStatus.value = {
      type: 'success',
      message: 'Thank you for your message! I\'ll get back to you soon.'
    }
    form.value = {
      name: '',
      email: '',
      message: ''
    }
    
    // Clear status after 5 seconds
    setTimeout(() => {
      submitStatus.value = null
    }, 5000)
  }, 1500)
}

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

  // Animate info card
  if (infoRef.value) {
    gsap.fromTo(infoRef.value,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: st(infoRef.value, 'top 85%')
      }
    )
  }

  // Animate form
  if (formRef.value) {
    gsap.fromTo(formRef.value,
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: st(formRef.value, 'top 85%')
      }
    )
  }

  // Animate form fields
  await nextTick()
  const formFields = [nameFieldRef.value, emailFieldRef.value, messageFieldRef.value, submitButtonRef.value]
  formFields.forEach((field, index) => {
    if (field) {
      gsap.fromTo(field,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: index * 0.08,
          ease: 'power3.out',
          scrollTrigger: st(formRef.value, 'top 85%')
        }
      )
    }
  })

  // Fallback: ensure visibility after a delay
  setTimeout(() => {
    if (titleRef.value) gsap.set(titleRef.value, { opacity: 1, y: 0 })
    if (infoRef.value) gsap.set(infoRef.value, { opacity: 1, x: 0 })
    if (formRef.value) gsap.set(formRef.value, { opacity: 1, x: 0 })
    formFields.forEach(field => {
      if (field) gsap.set(field, { opacity: 1, y: 0 })
    })
  }, 1000)
})
</script>

<style scoped>
.form-group {
  position: relative;
}

input:focus,
textarea:focus {
  transform: translateZ(2px);
}

.last-section {
  scroll-snap-stop: always;
}
</style>
