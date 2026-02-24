<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  initialMode: {
    type: String,
    default: 'login' // 'login' or 'register'
  }
});

const emit = defineEmits(['update:modelValue']);

const mode = ref(props.initialMode);
const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// Khi prop thay đổi, reset lại mode
watch(() => props.initialMode, (newMode) => {
  mode.value = newMode;
});

const closeModal = () => {
  emit('update:modelValue', false);
};

const toggleMode = () => {
  mode.value = mode.value === 'login' ? 'register' : 'login';
};

const handleSubmit = () => {
  // TODO: Add real authentication logic
  console.log(`Bắt đầu ${mode.value} với:`, formData.value);
  alert(`Tính năng ${mode.value === 'login' ? 'Đăng nhập' : 'Đăng ký'} đang được xây dựng!`);
  closeModal();
};
</script>

<template>
  <div v-if="modelValue" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content glass animate-scale-in">
      <button @click="closeModal" class="close-btn">&times;</button>
      
      <div class="modal-header">
        <h2>{{ mode === 'login' ? 'Chào mừng trở lại' : 'Tạo tài khoản mới' }}</h2>
        <p class="subtitle">
          {{ mode === 'login' ? 'Đăng nhập để vào hệ thống PremiumWeb' : 'Tham gia cùng chúng tôi để trải nghiệm đỉnh cao' }}
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <!-- Field Tên (chỉ hiện khi Đăng ký) -->
        <div v-if="mode === 'register'" class="form-group slide-down">
          <label>Họ và tên</label>
          <input 
            v-model="formData.name" 
            type="text" 
            placeholder="Nhập họ và tên..." 
            required
          />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input 
            v-model="formData.email" 
            type="email" 
            placeholder="name@example.com" 
            required
          />
        </div>

        <div class="form-group">
          <label>Mật khẩu</label>
          <input 
            v-model="formData.password" 
            type="password" 
            placeholder="••••••••" 
            required
          />
        </div>

        <!-- Confirm password (chỉ hiện khi Đăng ký) -->
        <div v-if="mode === 'register'" class="form-group slide-down">
          <label>Xác nhận Mật khẩu</label>
          <input 
            v-model="formData.confirmPassword" 
            type="password" 
            placeholder="••••••••" 
            required
          />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-primary w-100">
            {{ mode === 'login' ? 'Đăng nhập' : 'Đăng ký ngay' }}
          </button>
        </div>
      </form>

      <div class="modal-footer">
        <p>
          {{ mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?' }}
          <a href="#" @click.prevent="toggleMode">
            {{ mode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập' }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.modal-content {
  width: 100%;
  max-width: 420px;
  padding: 40px;
  border-radius: 24px;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  font-family: 'Inter', sans-serif;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.8rem;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s;
}

.close-btn:hover {
  color: var(--text-main);
}

.modal-header {
  text-align: center;
  margin-bottom: 30px;
}

.modal-header h2 {
  margin: 0 0 10px 0;
  font-size: 1.75rem;
  font-weight: 700;
}

.subtitle {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin: 0;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 14px 16px;
  color: var(--text-main);
  font-size: 1rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
}

.form-group input:focus {
  border-color: var(--primary);
  background: rgba(255, 255, 255, 0.1);
}

.w-100 {
  width: 100%;
}

.btn-primary {
  padding: 14px;
  font-size: 1rem;
  border-radius: 12px;
  margin-top: 10px;
}

.modal-footer {
  margin-top: 25px;
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.modal-footer a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  margin-left: 5px;
  transition: color 0.2s;
}

.modal-footer a:hover {
  color: var(--primary-hover);
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95) translateY(-10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.animate-scale-in {
  animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); height: 0; margin-bottom: 0; }
  to { opacity: 1; transform: translateY(0); height: auto; margin-bottom: 20px; }
}

.slide-down {
  animation: slideDown 0.3s ease-out forwards;
}
</style>
