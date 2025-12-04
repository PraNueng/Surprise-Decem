<template>
  <div class="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fadeIn">
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-black/80 backdrop-blur-lg"
      @click="$emit('close')"
    ></div>
    
    <!-- Modal Container -->
    <div class="relative w-full max-w-4xl animate-scaleIn">
      <!-- Animated Gradient Border -->
      <div class="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-pink-500 rounded-3xl blur-2xl opacity-60 animate-gradient"></div>
      
      <!-- Main Card -->
      <div class="relative bg-gradient-to-br from-slate-900/98 to-slate-800/98 backdrop-blur-2xl rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
        
        <!-- Header -->
        <div class="relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 animate-shimmer"></div>
          <div class="relative flex items-center justify-between p-6 border-b border-white/10">
            <div class="flex items-center gap-3">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg rotate-3 hover:rotate-0 transition-transform duration-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Secret Pic ✨
                </h3>
                <p class="text-sm text-gray-400">{{ currentIndex + 1 }} of {{ photos.length }} photos</p>
              </div>
            </div>
            
            <!-- Close Button -->
            <button
              @click="$emit('close')"
              class="w-12 h-12 rounded-full bg-white/10 hover:bg-red-500/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group border border-white/20 hover:border-red-500/50"
            >
              <svg class="w-6 h-6 text-white group-hover:text-red-400 group-hover:rotate-90 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Photo Display Area -->
        <div class="relative p-8">
          <!-- Main Photo Container -->
          <div class="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl">
            
            <!-- Decorative Gradient Corners -->
            <div class="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-pink-500/30 to-transparent blur-2xl"></div>
            <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/30 to-transparent blur-2xl"></div>
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/30 to-transparent blur-2xl"></div>
            <div class="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-pink-500/30 to-transparent blur-2xl"></div>
            
            <!-- Photo with Transition -->
            <div 
              v-for="(photo, index) in photos" 
              :key="index"
              class="absolute inset-0 transition-all duration-500 ease-out"
              :class="index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
            >
              <img 
                :src="photo.src" 
                :alt="photo.caption"
                class="w-full h-full object-contain p-4"
              />
            </div>
            
            <!-- Navigation Buttons -->
            <button
              @click="prevPhoto"
              class="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 group border-2 border-white/20 hover:border-white/40 hover:scale-110"
            >
              <svg class="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            
            <button
              @click="nextPhoto"
              class="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 group border-2 border-white/20 hover:border-white/40 hover:scale-110"
            >
              <svg class="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
            
            <!-- Photo Counter Badge -->
            <div class="absolute top-4 right-4 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20">
              <span class="text-white font-medium">{{ currentIndex + 1 }}/{{ photos.length }}</span>
            </div>
          </div>
          
          <!-- Caption -->
          <div class="mt-6 text-center animate-fadeIn" :key="currentIndex">
            <div class="inline-block px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 border border-white/10 backdrop-blur-sm">
              <p class="text-white text-lg font-medium">{{ photos[currentIndex].caption }}</p>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="px-8 pb-8">
          <div class="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 border border-white/10">
            <div class="flex items-center gap-2">
              <span class="text-white/80 text-sm">Swipe to see more</span>
            </div>
            <div class="flex gap-1">
              <span v-for="i in 3" :key="i" class="text-yellow-400 animate-pulse" :style="{animationDelay: i * 0.15 + 's'}">⭐</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineEmits(['close'])

const currentIndex = ref(0)

// รูปภาพ 4 รูป - เปลี่ยน path ตามรูปจริงของคุณ
const photos = ref([
  {
    src: '/src/assets/Decem1.jpg',
    caption: '10 อันดับคนที่ขยันที่สุด'
  },
  {
    src: '/src/assets/Decem2.jpg',
    caption: 'เรียน 2 ชม. เมาท์ไปละครึ่งคาบ'
  },
  {
    src: '/src/assets/Decem3.jpg',
    caption: 'วอนหน่วยงานมาเก็บป้า'
  }
])

const nextPhoto = () => {
  currentIndex.value = (currentIndex.value + 1) % photos.value.length
}

const prevPhoto = () => {
  currentIndex.value = (currentIndex.value - 1 + photos.value.length) % photos.value.length
}

// Touch swipe support
let touchStartX = 0
let touchEndX = 0

const handleTouchStart = (e) => {
  touchStartX = e.changedTouches[0].screenX
}

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
}

const handleSwipe = () => {
  if (touchStartX - touchEndX > 50) {
    nextPhoto()
  }
  if (touchEndX - touchStartX > 50) {
    prevPhoto()
  }
}

// Add touch event listeners
onMounted(() => {
  const photoContainer = document.querySelector('.aspect-\\[4\\/3\\]')
  if (photoContainer) {
    photoContainer.addEventListener('touchstart', handleTouchStart, false)
    photoContainer.addEventListener('touchend', handleTouchEnd, false)
  }
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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

@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-scaleIn {
  animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

/* Smooth scrollbar for thumbnails */
.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, #ec4899, #a855f7);
  border-radius: 10px;
}
</style>
