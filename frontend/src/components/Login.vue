<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 animate-pulse"></div>

    <!-- Floating Hearts & Stars -->
    <div
      v-for="p in floatingItems"
      :key="p.id"
      class="absolute animate-float"
      :style="{
        left: p.left + '%',
        top: p.top + '%',
        animationDelay: p.delay + 's',
        animationDuration: p.duration + 's',
        fontSize: p.size + 'px'
      }"
    >
      {{ p.icon }}
    </div>

    <!-- Main Content -->
    <div
      class="relative z-10 min-h-screen flex items-center justify-center p-4"
      :class="mounted ? 'opacity-100' : 'opacity-0'"
      style="transition: opacity 1s"
    >
      <!-- Login Card -->
      <div 
        class="bg-white/20 backdrop-blur-xl rounded-3xl p-8 sm:p-12 max-w-md w-full shadow-2xl border border-white/30 transform transition-all duration-500"
        :class="shake ? 'animate-shake' : ''"
      >
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="inline-block animate-bounce mb-4" style="animation-duration: 2s">
          </div>
          <h1 class="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
            ยินดีต้อนรับจ้า
          </h1>
          <p class="text-white/90 text-lg">ล็อคอินก่อน ดีเซ็ม! 🎉</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Username Input -->
          <div class="relative group">
            <label class="block text-white font-semibold mb-2 text-sm">
              👤 Username
            </label>
            <input
              v-model="username"
              type="text"
              placeholder="พิมพ์คำว่า 'ดีเซ็ม'"
              class="w-full px-4 py-3 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-pink-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 scale-80"
              :class="error ? 'border-red-400' : ''"
            />
          </div>

<!-- Password Input -->
<div class="relative group">
  <label class="block text-white font-semibold mb-2 text-sm">
    🔐 Password
  </label>
  <div class="relative">
    <input
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      placeholder="พิมพ์ชื่อเล่นคนที่หน้าตาดีที่สุด"
      :key="'password-input'"
      class="w-full px-4 py-3 pr-12 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-pink-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 scale-80"
      :class="error ? 'border-red-400' : ''"
    />
    <button
      type="button"
      @click="showPassword = !showPassword"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors p-1"
    >
      <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      </svg>
    </button>
  </div>
</div>
          
          <!-- Error Message -->
          <div v-if="error" class="bg-red-100 border-2 border-red-300 rounded-xl p-3 animate-bounce">
            <p class="text-red-600 text-center font-semibold text-xs">❌ {{ error }}</p>
          </div>

          <!-- Success Message -->
          <div v-if="success" class="bg-green-100 border-2 border-green-300 rounded-xl p-3">
            <p class="text-green-600 text-center font-semibold">✨ {{ success }}</p>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            class="w-full py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            :disabled="loading"
          >
            <span v-if="!loading" class="flex items-center justify-center gap-2">
              ล็อคอิน
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              <span class="animate-spin">⏳</span> กำลังตรวจสอบ...
            </span>
          </button>
        </form>

        <!-- Hint -->
        <div class="mt-6 text-center">
          <p class="text-white/70 text-sm">
            💡 คำใบ้รหัสผ่าน: ชื่อเล่นของคนที่หน้าตาดีที่สุด
          </p>
        </div>

        <!-- Decorative Icons -->
        <div class="flex justify-center gap-3 mt-8">
          <div 
            v-for="i in 5" 
            :key="i"
            class="animate-bounce"
            :style="{ animationDelay: i * 0.1 + 's', animationDuration: '1.5s' }"
          >
            <span class="text-2xl">{{ ['🎈', '✨', '🎀', '💝', '🌟'][i - 1] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const mounted = ref(false)
const username = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)
const shake = ref(false)
const showConfetti = ref(false)
const floatingItems = ref([])
const showPassword = ref(false)

// ตั้งค่า Username และ Password ที่ถูกต้อง
const CORRECT_USERNAME = 'ดีเซ็ม'
const CORRECT_PASSWORD = 'หนึ่ง'
const CORRECT_PASSWORD_ALT = '1'
const CORRECT_PASSWORD_ALT2 = 'ดีเซ็ม'

const handleLogin = async () => {
  error.value = ''
  success.value = ''
  loading.value = true

  // จำลองการโหลด
  await new Promise(resolve => setTimeout(resolve, 1500))

  // ตรวจสอบ username และ password
  if (username.value === CORRECT_USERNAME && (password.value === CORRECT_PASSWORD || password.value === CORRECT_PASSWORD_ALT)) {
        localStorage.setItem('shouldPlayMusic', 'true')
        router.push('/birthday')
  } else if (password.value === CORRECT_PASSWORD_ALT2 ) {
    error.value = 'ฮันแน่ หลงตัวเองไปเปล่า!'
    shake.value = true
    setTimeout(() => {
      shake.value = false
    }, 500)
  }
  else {
    error.value = 'คิดดี ๆ เซ็ม มีไม่กี่คนหรอกที่หน้าตาดีอะ!'
    shake.value = true
    setTimeout(() => {
      shake.value = false
    }, 500)
  }

  loading.value = false
}

onMounted(() => {
  mounted.value = true

  // สร้าง floating items
  floatingItems.value = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: 20 + Math.random() * 20,
    icon: ['💕', '⭐', '🎈', '🎀', '✨', '💝'][Math.floor(Math.random() * 6)]
  }))
})
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-30px) rotate(180deg);
    opacity: 0.8;
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}

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

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-shake {
  animation: shake 0.5s;
}

.animate-fall {
  animation: fall 4s linear infinite;
}
</style>