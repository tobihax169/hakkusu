<script setup>
import ChatWidget from './components/ChatWidget.vue'
</script>

<template>
  <div class="app-root">
    <!-- Router View for Pages (Home, Login, Register) -->
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
</style>
