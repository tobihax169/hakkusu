<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuth } from './composables/useAuth'
import ChatWidget from './components/ChatWidget.vue'
import ToastNotification from './components/ToastNotification.vue'

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
      // Audio notification
      const audio = new Audio('/notification.mp3')
      audio.play().catch(e => {}) // Ignore if browser blocks auto-play
      setTimeout(() => {
        if (currentPush.value === data.message) currentPush.value = null;
      }, 8000);
    } catch(err) {}
  }
}

onMounted(() => {
  window.addEventListener('storage', handleStorageChange)
  // Giả lập Loading trang web toàn cầu trong 1.5s để tạo hiệu ứng mượt
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

    <!-- Hiệu ứng Web Loading Toàn Tòa Khốc -->
    <transition name="fade">
      <div v-if="isLoading" class="global-loader-overlay">
        <div class="global-spinner"></div>
      </div>
    </transition>

    <!-- Biến Toasts thành component thường trú -->
    <ToastNotification />

    <!-- Router View cho các Trang -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- Global Floating Chat Widget -->
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

    <!-- Global Push Notification Alert -->
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
/* Global page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Global Loader System */
.global-loader-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: var(--bg-main);
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.global-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Maintenance Wall */
.global-maintenance-wall {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: var(--bg-main);
  z-index: 9999999;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
}
.maintenance-box {
  padding: 50px;
  border-radius: 20px;
  max-width: 600px;
  border-color: rgba(239, 68, 68, 0.4) !important;
  box-shadow: 0 10px 40px rgba(239, 68, 68, 0.15) !important;
}
.icon-spin {
  font-size: 5rem;
  color: #ef4444;
  animation: spin 3s linear infinite;
  margin-bottom: 20px;
}
.maintenance-box h2 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #f8fafc;
}
.maintenance-box p {
  color: #94a3b8;
  line-height: 1.5;
}
.btn-login-small {
  display: inline-block;
  color: #ef4444;
  text-decoration: none;
  border: 1px solid #ef4444;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.2s;
}
.btn-login-small:hover {
  background: #ef4444;
  color: #fff;
}

/* Global Push Notification Alert */
.global-push-alert {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000000;
  display: flex;
  align-items: center;
  padding: 15px 25px;
  border-radius: 15px;
  border: 1px solid rgba(245, 158, 11, 0.5);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(245, 158, 11, 0.2);
  width: 90%;
  max-width: 500px;
}
.push-icon {
  margin-right: 15px;
}
.push-icon span {
  font-size: 2.5rem;
  color: #f59e0b;
  animation: pulse 1.5s infinite;
}
.push-content h4 {
  margin: 0 0 5px 0;
  color: #f59e0b;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 1px;
}
.push-content p {
  margin: 0;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.4;
}
.push-close {
  margin-left: auto;
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
}
.push-close:hover {
  color: #fff;
}

.push-slide-enter-active,
.push-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.push-slide-enter-from,
.push-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, -100px) scale(0.9);
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
</style>
