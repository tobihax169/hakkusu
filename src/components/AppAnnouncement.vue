<script setup>
import { onMounted } from 'vue'
import { useAnnouncement } from '../composables/useAnnouncement'

const announcementText = useAnnouncement().announcementText

onMounted(() => {
  // Logic if needed
})
</script>

<template>
  <div v-if="announcementText" class="marquee-bar bg-glass">
    <div class="marquee-content" :style="{ animationDuration: announcementText.length > 50 ? '35s' : '25s' }">
      <span class="material-symbols-outlined marquee-icon">campaign</span>
      <strong>{{ announcementText }}</strong>
      <!-- Mirror for seamless loop if needed, but the current css uses translateX(100vw) to -100% -->
    </div>
  </div>
</template>

<style scoped>
.marquee-bar {
  width: 100%;
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  color: #fff;
  padding: 8px 0;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  z-index: 90;
  margin-top: 80px; /* offset for header */
}

.marquee-content {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  animation: marquee-scroll linear infinite;
}

.marquee-icon {
  color: #fbbf24;
}

@keyframes marquee-scroll {
  0% { transform: translateX(100vw); }
  100% { transform: translateX(-100%); }
}

@media (max-width: 576px) {
  .marquee-bar {
    font-size: 0.85rem;
    margin-top: 70px;
  }
}
</style>
