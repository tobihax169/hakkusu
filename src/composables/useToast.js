import { ref } from 'vue';

const toasts = ref([]);
// Âm thanh Ting nhẹ khi có Push Notification
const tingAudio = typeof Audio !== 'undefined' ? new Audio('https://raw.githubusercontent.com/IONAudio/ion-sound/master/sounds/button_tiny.mp3') : null;

// Lắng nghe sự kiện thông báo đẩy từ các tab khác (cross-tab Push Notification)
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === 'global_push_notif' && event.newValue) {
      const data = JSON.parse(event.newValue);
      const id = Date.now() + Math.random();
      toasts.value.push({ id, message: data.message, type: 'info' });
      if (tingAudio) {
        tingAudio.currentTime = 0;
        tingAudio.play().catch(() => { });
      }
      setTimeout(() => { toasts.value = toasts.value.filter(t => t.id !== id) }, 5000);
    }
  });
}

export const useToast = () => {
  const addToast = (message, type = 'info', playSound = false) => {
    const id = Date.now() + Math.random();
    toasts.value.push({ id, message, type });

    if (playSound && tingAudio) {
      tingAudio.currentTime = 0;
      tingAudio.play().catch(e => console.log('Audio play error:', e));
    }

    setTimeout(() => removeToast(id), 3500);
  };

  const removeToast = (id) => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  };

  return { toasts, addToast, removeToast };
};
