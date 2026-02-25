<script setup>
import { ref, onMounted } from 'vue'
import ChatWidget from './components/ChatWidget.vue'
import ToastNotification from './components/ToastNotification.vue'

const isLoading = ref(true)

onMounted(() => {
  // Giả lập Loading trang web toàn cầu trong 1.5s để tạo hiệu ứng mượt
  setTimeout(() => {
    isLoading.value = false
  }, 1200)
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
    <ChatWidget />
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
</style>
