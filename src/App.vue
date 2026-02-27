<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuth } from './composables/useAuth'
import ChatWidget from './components/ChatWidget.vue'
import ToastNotification from './components/ToastNotification.vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import AppAnnouncement from './components/AppAnnouncement.vue'

const { role } = useAuth()
const isLoading = ref(true)
const isMaintenance = ref(localStorage.getItem('sys_maintenance') === 'true')
const currentPush = ref(null)

const handleStorageChange = (e) => {
  if (e.key === 'sys_maintenance') {
    isMaintenance.value = (e.newValue === 'true')
  }
  if (e.key === 'global_push_notif') {
    try {
      if (!e.newValue) return;
      const data = JSON.parse(e.newValue);
      currentPush.value = data.message;
      const audio = new Audio('/notification.mp3')
      audio.play().catch(e => {})
      setTimeout(() => {
        if (currentPush.value === data.message) currentPush.value = null;
      }, 8000);
    } catch(err) {}
  }
}

onMounted(() => {
  window.addEventListener('storage', handleStorageChange)
  setTimeout(() => {
    isLoading.value = false
  }, 1200)
})

onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange)
})
</script>

<template>
  <div class="app-root">
    <!-- Animated Background Global -->
    <div class="animated-bg">
      <div class="grid-overlay"></div>
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="orb orb-4"></div>
    </div>

    <!-- Web Loading Overlay -->
    <transition name="fade">
      <div v-if="isLoading" class="global-loader-overlay">
        <div class="global-spinner"></div>
      </div>
    </transition>

    <ToastNotification />

    <!-- REUSABLE HEADER & ANNOUNCEMENT -->
    <AppHeader v-if="!isMaintenance || role === 'admin'" />
    <AppAnnouncement v-if="!isMaintenance || role === 'admin'" />

    <!-- Router View -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- REUSABLE FOOTER -->
    <AppFooter v-if="!isMaintenance || role === 'admin'" />

    <ChatWidget v-if="role === 'admin' || !isMaintenance" />

    <!-- Maintenance Overlay -->
    <div v-if="isMaintenance && role !== 'admin'" class="global-maintenance-wall">
      <div class="maintenance-box glass">
        <span class="material-symbols-outlined icon-spin">settings_applications</span>
        <h2>Hệ Thống Đang Bảo Trì</h2>
        <p>Chúng tôi đang tiến hành cập nhật hệ thống để mang lại trải nghiệm tốt nhất.<br/>Vui lòng quay lại sau ít phút, xin cảm ơn!</p>
        <div class="mt-4">
          <router-link v-if="!role" to="/auth/login" class="btn-login-small">Admin Login</router-link>
        </div>
      </div>
    </div>

    <!-- System Push Notify -->
    <transition name="push-slide">
      <div v-if="currentPush" class="global-push-alert bg-glass">
        <div class="push-icon">
          <span class="material-symbols-outlined text-warning">campaign</span>
        </div>
        <div class="push-content">
          <h4>THÔNG BÁO TỪ HỆ THỐNG</h4>
          <p>{{ currentPush }}</p>
        </div>
        <button class="push-close" @click="currentPush = null">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<style>
/* ... (existing global styles should stay here for background, etc.) ... */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Base layout spacing for main content to not be hidden under fixed header/announcement */
.app-wrapper {
  flex: 1;
}

.global-loader-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #0b1120;
  z-index: 999999;
  display: flex; justify-content: center; align-items: center;
}

.global-spinner {
  width: 50px; height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: #38bdf8;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

.global-maintenance-wall {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: #0b1120; z-index: 9999999;
  display: flex; justify-content: center; align-items: center; text-align: center; padding: 20px;
}
.maintenance-box {
  padding: 50px; border-radius: 20px; max-width: 600px;
  border: 1px solid rgba(239, 68, 68, 0.4);
  background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(12px);
}
.icon-spin { font-size: 5rem; color: #ef4444; animation: spin 3s linear infinite; margin-bottom: 20px; }

.global-push-alert {
  position: fixed; top: 30px; left: 50%; transform: translateX(-50%); z-index: 1000000;
  display: flex; align-items: center; padding: 15px 25px; border-radius: 15px;
  border: 1px solid rgba(245, 158, 11, 0.5); background: rgba(30, 41, 59, 0.9);
  width: 90%; max-width: 500px;
}
</style>
