<template>
  <div class="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fadeIn">
    <!-- Backdrop with blur -->
    <div 
      class="absolute inset-0 bg-black/70 backdrop-blur-md"
      @click="$emit('close')"
    ></div>
    
    <!-- Modal Container -->
    <div class="relative w-full max-w-5xl animate-scaleIn">
      <!-- Glowing Border Effect -->
      <div class="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
      
      <!-- Main Modal Card -->
      <div class="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
        
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-white/10">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white">Secret Video 🎬</h3>
              <p class="text-sm text-gray-400">ใส่หูฟัง! แต่น่าจะใส่อยู่แล้วแหละ</p>
            </div>
          </div>
          
          <!-- Close Button -->
          <button
            @click="$emit('close')"
            class="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group border border-white/20 hover:border-white/40"
          >
            <svg class="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <!-- Video Container -->
        <div class="p-6">
          <div class="relative aspect-video w-full rounded-2xl overflow-hidden bg-black/50 shadow-2xl border-4 border-white/10">
            <!-- Decorative corners -->
            <div class="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-pink-500 rounded-tl-2xl"></div>
            <div class="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-purple-500 rounded-tr-2xl"></div>
            <div class="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-blue-500 rounded-bl-2xl"></div>
            <div class="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-pink-500 rounded-br-2xl"></div>
            
            <!-- Video Element -->
            <video
              ref="videoRef"
              class="w-full h-full object-contain"
              controls
              autoplay
              @loadedmetadata="onVideoLoad"
            >
              <source src="/src/assets/Thousand_Year_Real.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
          
          <!-- Video Info -->
          <div class="mt-6 flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30">
                <svg class="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
                </svg>

              </div>
              
              <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                <svg class="w-5 h-5 text-blue-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span class="text-sm font-medium text-white" v-if="duration">{{ formatTime(duration) }}</span>
              </div>
            </div>
            
            <!-- Sparkle Effect -->
            <div class="flex gap-1">
              <span v-for="i in 5" :key="i" class="text-yellow-400 animate-pulse" :style="{animationDelay: i * 0.1 + 's'}">✨</span>
            </div>
          </div>
        </div>
        
        <!-- Footer Message -->
        <div class="px-6 pb-6">
          <div class="p-4 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 border border-white/10">
            <p class="text-center text-white/80 text-sm">
              หวังว่าจะชอบนะจ๊ะ พี่แกะเพลงนี้มาอย่างดี 555
            </p>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineEmits(['close'])

// Add touch event handlers
onMounted(() => {
  const videoContainer = document.querySelector('.aspect-video')
  if (videoContainer) {
    videoContainer.addEventListener('touchstart', handleTouchStart, false)
    videoContainer.addEventListener('touchend', handleTouchEnd, false)
  }
})

const videoRef = ref(null)
const duration = ref(0)
let touchStartX = 0
let touchEndX = 0

const handleTouchStart = (e) => {
  touchStartX = e.changedTouches[0].screenX
}

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].screenX
}

const onVideoLoad = () => {
  if (videoRef.value) {
    duration.value = videoRef.value.duration
  }
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-scaleIn {
  animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>