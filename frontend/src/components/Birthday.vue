
<template>
    <div class="min-h-screen relative overflow-block birthday-bg">
      <!-- Animated Glow Rays -->
      <div class="absolute inset-0 glow-rays pointer-events-none"></div>

      <!-- Floating Bubbles -->
      <div
        v-for="n in 20"
        :key="'bubble'+n"
        class="bubble"
        :style="{
          left: Math.random()*100+'%',
          animationDelay: (Math.random()*5)+'s',
          animationDuration: (8 + Math.random()*5)+'s'
        }"
      />

      <!-- Colored Bokeh Blobs -->
      <div class="bokeh b1"></div>
      <div class="bokeh b2"></div>
      <div class="bokeh b3"></div>

      <!-- Original gradient background + pulse -->
      <div class="absolute inset-0 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 animate-pulse opacity-60"></div>

      <!-- Rest of your original template content (unchanged logic) -->
      <div
        class="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 transition-all duration-1000"
        :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        <!-- Decorative floating icons -->
        <div class="block sm:block floating-icon top-20 left-20">
          <Sparkles class="w-9 h-9 text-pink-400 drop-glow" />
        </div>
        <div class="block sm:block floating-icon top-32 right-24 delay-300">
          <Star class="w-7 h-7 text-blue-400 drop-glow" />
        </div>
        <div class="block sm:block floating-icon bottom-32 left-32 bounce-slow">
          <Heart class="w-10 h-10 text-pink-500 drop-glow" />
        </div>
        <div class="block sm:block floating-icon bottom-24 right-20 delay-500 bounce-slow">
          <Gift class="w-8 h-8 text-purple-500 drop-glow" />
        </div>

        <!-- Card with neon glow, rainbow border & shine -->
        <div class="super-card group absolute bottom-6">
          <div class="shine"></div>

          <!-- Action Buttons - Top Right Corner -->
          <div class="absolute right-3 flex flex-col gap-3 z-50">
            <!-- Video Button -->
            <button
              @click="showVideoModal = true"
              class="action-button group/btn bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              title="Watch Special Video"
            >
              <svg class="w-6 h-6 text-white group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
              </svg>
              <div class="absolute inset-0 rounded-full bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity"></div>
            </button>

            <!-- Gallery Button -->
            <button
              @click="showPhotoGallery = true"
              class="action-button group/btn bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              title="View Photo Gallery"
            >
              <svg class="w-6 h-6 text-white group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <div class="absolute inset-0 rounded-full bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity"></div>
            </button>
          </div>

          <!-- Title -->
          <div class="text-center mb-8 title-wrap">
            <Cake class="w-10 h-10 mx-auto mb-4 text-pink-500 drop-glow" />
            <h1 class="title-text">
              Happy Birthday!
            </h1>

            <div class="flex justify-center gap-3 mt-2">
              <Sparkles
                v-for="i in 5"
                :key="i"
                class="w-4 h-4 text-yellow-500 animate-pulse"
                :style="{ animationDelay: (i * 0.15) + 's' }"
              />
            </div>
          </div>

          <!-- Photo Placeholder -->
          <div class="relative mb-4 photo-frame group-hover:scale-[1.02] transition">
            <div class="photo-inner">
              <div class="upload-box w-full max-w-md mx-auto overflow-hidden rounded-2xl relative">

                <!-- เบลอพื้นหลังของรูป -->
                <img 
                  src="../assets/Nerd.jpg" 
                  alt="Background Blur" 
                  class="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-40"
                />

                <!-- รูปหลัก -->
                <img 
                  src="../assets/Nerd.jpg" 
                  alt="Main Image" 
                  class="relative w-auto h-full max-h-[500px] mx-auto object-contain z-10 rounded-2xl"
                />

              </div>
            </div>
          </div>

          <!-- Message -->
          <div class="message-box text-center w-200 max-w-md mx-auto mb-6">
            <h2 class="msg-title">
              สุขสันต์วันเกิด! 🎉
            </h2>
            <p class="msg-text text-center">
              มีความสุขมาก ๆ นะดีเซ็ม<br />
              เจอแต่เรื่องดี ๆ สมหวังทุกอย่างจ้า<br />
            </p>
          </div>

          <button
            @click="showGiftSelection = true"
            class="gift-button w-full py-4 px-6 mb-6 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3"
          >
            <span class="text-2xl">🎁</span>
            เปิดของขวัญพิเศษ
            <span class="text-2xl">✨</span>
          </button>

          <!-- Icons -->
          <div class="flex justify-center gap-4 flex-wrap mt-6">
            <div
              v-for="(item, i) in decoItems"
              :key="i"
              class="icon-wrap"
              :style="{ animationDelay: i * 0.08 + 's' }"
            >
              <component :is="item.icon" :class="'w-8 h-8 '+item.color" />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Confetti Effect -->
      <div v-if="showConfetti" class="fixed inset-0 pointer-events-none z-100">
        <div
          v-for="i in 100"
          :key="i"
          class="absolute w-3 h-3 animate-fall"
          :style="{
            left: Math.random() * 100 + '%',
            top: '-20px',
            background: ['#ec4899', '#a855f7', '#60a5fa', '#fbbf24'][Math.floor(Math.random() * 4)],
            borderRadius: i % 2 === 0 ? '50%' : '0',
            animationDelay: Math.random() * 2 + 's',
            animationDuration: 3 + Math.random() * 2 + 's'
          }"
        ></div>
      </div>

      <!-- Modals -->
      <GiftSelection 
        v-if="showGiftSelection" 
        @close="showGiftSelection = false"
        @gift-selected="handleGiftSelected"
      />

      <VideoModal 
        v-if="showVideoModal" 
        @close="showVideoModal = false"
      />

      <PhotoGalleryModal 
        v-if="showPhotoGallery" 
        @close="showPhotoGallery = false"
      />
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Heart, Sparkles, Gift, Cake, Star } from 'lucide-vue-next'
import GiftSelection from './GiftSelection.vue'
import VideoModal from './VideoModal.vue'
import PhotoGalleryModal from './PhotoGalleryModal.vue'

const mounted = ref(false)
const showConfetti = ref(false)
const particles = ref([])
const showGiftSelection = ref(false)
const showVideoModal = ref(false)
const showPhotoGallery = ref(false)
const audio = ref(null)
const showPlayButton = ref(false)

// เพิ่ม function fade
const fadeAudioOut = () => {
  if (!audio.value) return
  
  const fadeTime = 500 // 0.5 วินาที
  const fadeSteps = 20
  const volumeStep = audio.value.volume / fadeSteps
  const stepTime = fadeTime / fadeSteps
  
  const fade = setInterval(() => {
    if (audio.value.volume > volumeStep) {
      audio.value.volume -= volumeStep
    } else {
      audio.value.volume = 0
      audio.value.pause()
      clearInterval(fade)
    }
  }, stepTime)
}

const fadeAudioIn = () => {
  if (!audio.value) return
  
  const fadeTime = 500 // 0.5 วินาที
  const fadeSteps = 20
  const targetVolume = 0.7
  const volumeStep = targetVolume / fadeSteps
  const stepTime = fadeTime / fadeSteps
  
  audio.value.volume = 0
  audio.value.play()
  
  const fade = setInterval(() => {
    if (audio.value.volume < targetVolume - volumeStep) {
      audio.value.volume += volumeStep
    } else {
      audio.value.volume = targetVolume
      clearInterval(fade)
    }
  }, stepTime)
}

const handleGiftSelected = (gift) => {
  showGiftSelection.value = false
}

const decoItems = [
  { icon: Heart, color: 'text-pink-500' },
  { icon: Sparkles, color: 'text-purple-500' },
  { icon: Gift, color: 'text-blue-500' },
  { icon: Star, color: 'text-pink-400' },
  { icon: Cake, color: 'text-purple-400' }
]

const confettiColor = (i) => {
  return i % 3 === 0 ? '#ec4899' : i % 3 === 1 ? '#a855f7' : '#60a5fa'
}

// ฟังก์ชันเล่นเพลง
const playMusic = () => {
  try {
    audio.value = new Audio('/Polycat.mp3')
    audio.value.volume = 0.7
    audio.value.loop = true
    
    audio.value.play().catch(error => {
      console.log('Autoplay prevented:', error)
      showPlayButton.value = true
    })
  } catch (error) {
    console.error('Error playing music:', error)
  }
}

// ฟังก์ชันสำหรับกดเล่นเพลงเอง
const manualPlay = () => {
  if (audio.value) {
    audio.value.play()
    showPlayButton.value = false
  }
}

onMounted(() => {
  showConfetti.value = true
  mounted.value = true

  particles.value = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4
  }))
  
  const shouldPlay = localStorage.getItem('shouldPlayMusic')
  if (shouldPlay === 'true') {
    setTimeout(() => {
      playMusic()
      localStorage.removeItem('shouldPlayMusic')
    }, 100)
  }
})

watch(showVideoModal, (newVal) => {
  if (newVal) {
    fadeAudioOut()
  } else {
    fadeAudioIn()
  }
})
</script>

<style>
/* Background light rays */
.glow-rays {
  background: radial-gradient(circle at center, rgba(255,255,255,0.4), transparent 70%);
  mix-blend-mode: soft-light;
  animation: rays 6s ease-in-out infinite alternate;
}
@keyframes rays {
  0% { transform: scale(1); opacity: .4; }
  100% { transform: scale(1.4); opacity: .7; }
}

/* Bubbles */
.bubble {
  position: absolute;
  bottom: -80px;
  width: 25px;
  height: 25px;
  background: rgba(255,255,255,0.5);
  border-radius: 50%;
  filter: blur(2px);
  animation: bubble 10s linear infinite;
}
@keyframes bubble {
  0% { transform: translateY(0) scale(1); opacity: .8; }
  100% { transform: translateY(-120vh) scale(1.6); opacity: 0; }
}

/* Bokeh blobs */
.bokeh {
  position: absolute;
  width: 300px;
  height: 300px;
  filter: blur(120px);
  opacity: 0.45;
}
.b1 { background:#ff8dcf; top:10%; left:5%; animation: move1 12s infinite alternate; }
.b2 { background:#a689ff; top:55%; right:10%; animation: move2 14s infinite alternate; }
.b3 { background:#7cc4ff; bottom:0; left:40%; animation: move3 10s infinite alternate; }

@keyframes move1 { from{transform:translateX(0);} to{transform:translateX(40px);} }
@keyframes move2 { from{transform:translateY(0);} to{transform:translateY(-40px);} }
@keyframes move3 { from{transform:translateX(0);} to{transform:translateX(-40px);} }

/* Floating icons */
.floating-icon {
  position: absolute;
  animation: float 4s ease-in-out infinite;
}
.floating-icon.delay-300 {
  animation-delay: .3s;
}
.floating-icon.delay-500 {
  animation-delay: .5s;
}
.bounce-slow {
  animation: bounceSlow 3.5s infinite;
}
@keyframes bounceSlow {
  0%,100% { transform:translateY(0); }
  50% { transform:translateY(-12px); }
}

/* Neon + Rainbow card */
.super-card {
  background: rgba(255,255,255,0.22);
  backdrop-filter: blur(25px);
  padding: 3rem;
  border-radius: 30px;
  border: 3px solid rgba(255,255,255,0.4);
  position: relative;
  overflow: block;
  max-width: 900px;
  width: 100%;
  box-shadow: 0 0 40px rgba(255,255,255,0.5), 0 0 90px rgba(255,120,255,0.4);
}
.super-card::before {
  content: '';
  position:absolute;
  inset:0;
  border-radius:inherit;
  padding:3px;
  background: conic-gradient(from 45deg, #ff7ce5, #a688ff, #6bbaff, #ff7ce5);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  animation: spin 10s linear infinite;
}
@keyframes spin {
  0% { transform:rotate(0deg); }
  100% { transform:rotate(360deg); }
}

/* Action Buttons */
.action-button {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid rgba(255,255,255,0.3);
  box-shadow: 
    0 10px 25px rgba(0,0,0,0.3),
    0 0 20px rgba(255,255,255,0.2),
    inset 0 0 15px rgba(255,255,255,0.1);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  backdrop-filter: blur(10px);
  animation: floatButton 3s ease-in-out infinite;
}

.action-button:hover {
  transform: scale(1.15) rotate(10deg);
  box-shadow: 
    0 15px 35px rgba(0,0,0,0.4),
    0 0 30px rgba(255,255,255,0.4),
    inset 0 0 20px rgba(255,255,255,0.2);
  border-color: rgba(255,255,255,0.6);
}

.action-button:active {
  transform: scale(1.05);
}

@keyframes floatButton {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(5deg); }
}

.action-button:nth-child(2) {
  animation-delay: 0.5s;
}

/* Shine sweep */
.shine {
  position:absolute;
  inset:0;
  background:linear-gradient(120deg, transparent,
      rgba(255,255,255,0.5), transparent);
  transform: translateX(-100%);
  animation: shineMove 4s infinite ease-in-out;
}
@keyframes shineMove {
  0% { transform:translateX(-100%); }
  60% { transform:translateX(120%); }
  100%{ transform:translateX(120%); }
}

/* Title text */
.title-text {
  font-size: 4rem;
  font-weight: 900;
  background: linear-gradient(to right, #ff5dbb, #9b5fff, #5aaaff);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 0 40px rgba(255,255,255,0.9);
  animation: glow 2.5s ease-in-out infinite alternate;
}
@keyframes glow {
  0% { filter:drop-shadow(0 0 8px rgba(255,255,255,0.6)); }
  100% { filter:drop-shadow(0 0 22px rgba(255,255,255,1)); }
}

/* Drop glow for icons */
.drop-glow {
  filter: drop-shadow(0 0 12px rgba(255,255,255,0.9));
}

/* Photo frame */
.photo-frame {
  background: linear-gradient(135deg, #ffb6e6, #aee0ff);
  padding: 6px;
  border-radius: 25px;
  box-shadow: 0 0 25px rgba(255,255,255,0.4);
}
.photo-inner {
  background:rgba(255,255,255,0.7);
  border-radius:20px;
  padding:20px;
}
.upload-box {
  height: 330px;
  border:4px dashed #ff8bcf;
  border-radius:20px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
  background:rgba(255,255,255,0.5);
}

/* Message box */
.message-box {
  background:rgba(255,255,255,0.45);
  padding: 2rem;
  border-radius:20px;
  border:2px solid rgba(255,255,255,0.5);
  box-shadow:0 0 20px rgba(255,255,255,0.3);
}
.msg-title {
  font-size:2rem;
  font-weight:900;
  background:linear-gradient(to right,#ff5fc8,#5fbaff);
  -webkit-background-clip:text;
  color:transparent;
}
.msg-text {
  font-size:1.2rem;
  color:#4b4b4b;
  font-weight:500;
}

/* Icon bubble */
.icon-wrap {
  background:rgba(255,255,255,0.55);
  padding:15px;
  border-radius:50%;
  backdrop-filter:blur(10px);
  animation:bounceSmall 1.4s infinite ease-in-out;
}
@keyframes bounceSmall {
  0%,100% { transform:translateY(0); }
  50% { transform:translateY(-8px); }
}

/* Responsive */
@media (max-width: 640px) {
  .birthday-bg .bokeh { display: none; }
  .glow-rays { opacity: 0.25; filter: blur(6px); }

  .super-card {
    padding: 1.25rem;
    border-radius: 18px;
    backdrop-filter: blur(12px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  }

  .action-button {
    width: 48px;
    height: 48px;
  }

  .action-button svg {
    width: 20px;
    height: 20px;
  }

  .title-text {
    font-size: clamp(1.6rem, 7vw, 2.5rem);
    line-height: 1.1;
    text-shadow: 0 0 10px rgba(255,255,255,0.7);
  }

  .msg-title {
    font-size: 1.2rem;
  }

  .msg-text {
    font-size: 0.9rem;
  }

  .icon-wrap {
    padding: 8px;
  }

  .icon-wrap svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  .upload-box {
    height: 25vh;
    padding: 8px;
  }

  .photo-inner {
    padding: 8px;
  }

  .upload-box img:last-child {
    object-fit: cover;
    max-height: 100%;
    border-radius: 16px;
  }

  .bubble {
    width: 12px;
    height: 12px;
    filter: blur(1px);
    opacity: .6;
  }

  .shine {
    opacity: 0.6;
    animation-duration: 5s;
  }

  .floating-icon.top-20.left-20 {
    left: 6% !important;
    top: 4% !important;
    transform: scale(0.9);
  }

  .floating-icon.top-32.right-24 {
    right: 6% !important;
    top: 8% !important;
    transform: scale(0.9);
  }

  .relative.z-10.min-h-screen {
    padding-top: 2.5rem;
    padding-bottom: 3rem;
  }

  .photo-inner, .message-box {
    backdrop-filter: none;
    background: rgba(255,255,255,0.85);
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .super-card {
    padding: 2rem;
    border-radius: 22px;
  }

  .title-text {
    font-size: clamp(2.2rem, 6vw, 4rem);
  }

  .upload-box {
    height: 280px;
  }
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden !important;
  touch-action: none;
}

.super-card::before {
  z-index: 0;
}

.super-card {
  position: relative;
  z-index: 1;
}

.message-box {
  position: relative;
  z-index: 1;
}

/* Confetti */
@keyframes fall {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

.animate-fall {
  animation: fall 4s linear forwards;
}

.z-100 {
  z-index: 100;
}
</style>