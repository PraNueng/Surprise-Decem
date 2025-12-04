<template>
  <div class="fixed inset-0 z-[200] flex items-center justify-center p-4 gift-modal-bg">
    <!-- Animated sparkles background -->
    <div class="sparkle-container">
      <div v-for="i in 30" :key="i" 
           class="sparkle" 
           :style="sparkleStyle(i)">
        ✨
      </div>
    </div>

    <!-- Main Container -->
    <div class="gift-container">
      <h2 class="gift-title">
        🎁 เลือกซักอัน! 🎁
      </h2>
      <p class="gift-subtitle">เอาอันไหนดีจ๊ะ</p>

      <!-- Gift Boxes -->
      <div class="boxes-grid">
        <div
          v-for="(box, index) in giftBoxes"
          :key="index"
          @click="selectGift(index)"
          class="gift-box"
          :class="{ 'selected': selectedBox === index, 'disabled': selectedBox !== null && selectedBox !== index }"
          :style="{ animationDelay: index * 0.15 + 's' }"
        >
          <!-- Gift Box Icon -->
          <div class="box-icon">
            {{ box.icon }}
          </div>
          
          <!-- Hover Glow -->
          <div class="box-glow"></div>
          
          <!-- Box Label -->
          <div class="box-label">{{ box.label }}</div>
        </div>
      </div>

      <!-- Close Button -->
      <button @click="$emit('close')" class="close-btn">
        ปิด
      </button>
    </div>

    <!-- Selected Gift Display -->
    <transition name="gift-reveal">
      <div v-if="revealGift" class="gift-reveal-modal">
        <div class="reveal-content">
          <div class="reveal-icon-big animate-bounce">
            {{ giftBoxes[selectedBox].icon }}
          </div>
          <h3 class="reveal-title">
            {{ giftBoxes[selectedBox].surprise.title }}
          </h3>
          <p class="reveal-message">
            {{ giftBoxes[selectedBox].surprise.message }}
          </p>
          <div class="reveal-emoji">
            {{ giftBoxes[selectedBox].surprise.emoji }}
          </div>
          <button @click="closeReveal" class="reveal-close-btn">
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close', 'gift-selected'])

const selectedBox = ref(null)
const revealGift = ref(false)

const giftBoxes = [
  {
    icon: '🎀',
    label: 'โบว์สีชมพูสุดน่ารัก',
    surprise: {
      title: 'โบว์สีชมพูสุดน่ารัก 🎀',
      message: 'เลิกพูดถึงอะไรเก่า ๆ ได้ละ ชีวิตต้องเดินหน้าจ่ะป้า',
      emoji: '🎊🎉🎈'
    }
  },
  {
    icon: '💝',
    label: 'หัวใจผูกโบว์รักพ่อ',
    surprise: {
      title: 'หัวใจผูกโบว์รักพ่อ 💝',
      message: 'ขอให้สมหวังในทุก ๆ เรื่องนะจ๊ะ มีอะไรมาเมาท์อีกบอกด้วย อยากฟัง',
      emoji: '💙💗💜'
    }
  },
    {
    icon: '🎁',
    label: 'กล่องของขวัญธรรมดา',
    surprise: {
      title: 'กล่องของขวัญธรรมดา 🎁',
      message: 'พี่ไม่มีอะไรเป็นชิ้นเป็นอันให้ แต่หวังว่าจะชอบของขวัญอันนี้นะ 55755685',
      emoji: '🌸💖🦋'
    }
  },
]

const sparkleStyle = (i) => ({
  left: Math.random() * 100 + '%',
  top: Math.random() * 100 + '%',
  animationDelay: Math.random() * 3 + 's',
  animationDuration: 2 + Math.random() * 2 + 's',
  fontSize: 15 + Math.random() * 15 + 'px'
})

const selectGift = (index) => {
  if (selectedBox.value !== null) return
  
  selectedBox.value = index
  
  setTimeout(() => {
    revealGift.value = true
  }, 800)
}

const closeReveal = () => {
  revealGift.value = false
  setTimeout(() => {
    emit('gift-selected', giftBoxes[selectedBox.value])
    emit('close')
  }, 300)
}
</script>

<style scoped>
.gift-modal-bg {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.95), rgba(168, 85, 247, 0.95), rgba(96, 165, 250, 0.95));
  backdrop-filter: blur(10px);
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Sparkles */
.sparkle-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.sparkle {
  position: absolute;
  animation: twinkle 3s infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
}

/* Main Container */
.gift-container {
  transform: scale(0.9);
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(30px);
  border-radius: 40px;
  padding: 3rem;
  max-width: 800px;
  width: 100%;
  border: 3px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes scaleIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.gift-title {
  font-size: 2.5rem;
  font-weight: 900;
  text-align: center;
  background: linear-gradient(to right, #fff, #ffd4f4, #fff);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
  animation: glow 2s ease-in-out infinite alternate;
}

.gift-subtitle {
  text-align: center;
  color: white;
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  font-weight: 600;
}

/* Boxes Grid */
.boxes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.gift-box {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(15px);
  border-radius: 25px;
  padding: 2rem 1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.4);
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  animation: slideUp 0.6s ease backwards;
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.gift-box:hover:not(.disabled) {
  transform: translateY(-15px) scale(1.05);
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 20px 40px rgba(255, 255, 255, 0.3);
}

.gift-box.selected {
  transform: scale(1.1);
  border-color: #fbbf24;
  box-shadow: 0 0 40px rgba(251, 191, 36, 0.6);
  animation: pulse 0.6s ease;
}

@keyframes pulse {
  0%, 100% { transform: scale(1.1); }
  50% { transform: scale(1.15); }
}

.gift-box.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  filter: grayscale(0.8);
}

.box-icon {
  font-size: 5rem;
  text-align: center;
  margin-bottom: 1rem;
  filter: drop-shadow(0 5px 15px rgba(255, 255, 255, 0.5));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.box-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent 70%);
  opacity: 0;
  transition: opacity 0.4s;
}

.gift-box:hover .box-glow {
  opacity: 1;
}

.box-label {
  text-align: center;
  font-weight: 700;
  font-size: 1.1rem;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* Close Button */
.close-btn {
  display: block;
  margin: 0 auto;
  padding: 0.8rem 2rem;
  background: rgba(255, 255, 255, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: scale(1.05);
}

/* Gift Reveal Modal */
.gift-reveal-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(15px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
  padding: 2rem;
}

.reveal-content {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 240, 255, 0.95));
  border-radius: 35px;
  padding: 3rem;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 30px 80px rgba(255, 255, 255, 0.4);
  border: 4px solid rgba(255, 255, 255, 0.8);
  animation: revealPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes revealPop {
  0% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
  70% { transform: scale(1.1) rotate(5deg); }
  100% { transform: scale(1) rotate(0); opacity: 1; }
}

.reveal-icon-big {
  font-size: 6rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 10px 25px rgba(236, 72, 153, 0.4));
}

.reveal-title {
  font-size: 2rem;
  font-weight: 900;
  background: linear-gradient(to right, #ec4899, #a855f7, #60a5fa);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
}

.reveal-message {
  font-size: 1.2rem;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.reveal-emoji {
  font-size: 3rem;
  margin-bottom: 2rem;
}

.reveal-close-btn {
  padding: 1rem 2.5rem;
  background: linear-gradient(to right, #ec4899, #a855f7, #60a5fa);
  border: none;
  border-radius: 20px;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 25px rgba(168, 85, 247, 0.4);
}

.reveal-close-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 35px rgba(168, 85, 247, 0.6);
}

/* Transition */
.gift-reveal-enter-active, .gift-reveal-leave-active {
  transition: opacity 0.3s ease;
}

.gift-reveal-enter-from, .gift-reveal-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 640px) {
  .gift-container { padding: 2rem 1.5rem; }
  .boxes-grid { grid-template-columns: 1fr; gap: 1rem; }
  .gift-title { font-size: 1.8rem; }
  .reveal-content { padding: 2rem 1.5rem; }
  .reveal-icon-big { font-size: 4rem; }
}

/* -----------------------------------------
   MOBILE RESPONSIVE LIKE Birthday.vue
------------------------------------------*/
@media (max-width: 640px) {

  /* fade background softer */
  .gift-modal-bg {
    backdrop-filter: blur(6px);
    padding: 1rem;
  }

  /* reduce sparkles on mobile */
  .sparkle {
    font-size: 10px !important;
    animation-duration: 2.5s !important;
    opacity: 0.7;
  }

  /* container */
  .gift-container {
    padding: 1.5rem 1.2rem;
    max-width: 92%;
    border-radius: 25px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.18);
    backdrop-filter: blur(12px);
  }

  /* title text */
  .gift-title {
    font-size: clamp(1.3rem, 6vw, 1.9rem);
    margin-bottom: 0.3rem;
    text-shadow: 0 0 10px rgba(255,255,255,0.7);
  }

  .gift-subtitle {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }

  /* gift box layout — stacked column */
  .boxes-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  /* box size */
  .gift-box {
    padding: 1.4rem 1rem;
    border-radius: 20px;
    backdrop-filter: blur(10px);
  }

  .box-icon {
    font-size: 3.2rem;
    margin-bottom: 0.6rem;
  }

  .box-label {
    font-size: 1rem;
  }

  /* glow softer */
  .box-glow {
    opacity: 0.3;
  }

  /* close button */
  .close-btn {
    margin-top: 1.2rem;
    padding: 0.6rem 1.6rem;
    border-radius: 12px;
    font-size: 0.95rem;
  }

  /* reveal modal */
  .gift-reveal-modal {
    padding: 1rem;
  }

  .reveal-content {
    padding: 1.8rem 1.2rem;
    border-radius: 24px;
    max-width: 90%;
  }

  .reveal-icon-big {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .reveal-title {
    font-size: clamp(1.2rem, 6vw, 1.7rem);
    margin-bottom: 0.5rem;
  }

  .reveal-message {
    font-size: 1rem;
    line-height: 1.45;
    margin-bottom: 1rem;
  }

  .reveal-emoji {
    font-size: 2.2rem;
    margin-bottom: 1.2rem;
  }

  .reveal-close-btn {
    padding: 0.8rem 2rem;
    border-radius: 16px;
    font-size: 1rem;
  }
}

/* -----------------------------------------
   TABLET SIZE — more comfortable layout
------------------------------------------*/
@media (min-width: 641px) and (max-width: 1024px) {

  .gift-container {
    padding: 2rem;
    max-width: 600px;
  }

  .boxes-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .gift-title {
    font-size: 2.2rem;
  }

  .box-icon {
    font-size: 4rem;
  }

  .reveal-content {
    max-width: 420px;
    padding: 2.5rem 2rem;
  }
}

</style>