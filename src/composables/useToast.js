import { ref } from 'vue';

const toasts = ref([]);

export const useToast = () => {
  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    toasts.value.push({ id, message, type });
    setTimeout(() => removeToast(id), 3500);
  };
  
  const removeToast = (id) => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  };
  
  return { toasts, addToast, removeToast };
};
