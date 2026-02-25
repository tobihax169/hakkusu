<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from '../composables/useToast';

const router = useRouter();
const { addToast } = useToast();
const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const errorMessage = ref('');
const successMessage = ref('');

const handleRegister = async () => {
  errorMessage.value = '';
  successMessage.value = '';
  
  if (formData.value.password !== formData.value.confirmPassword) {
    errorMessage.value = 'Mật khẩu xác nhận không khớp!';
    addToast('Mật khẩu xác nhận không khớp!', 'error');
    return;
  }
  
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.value.name,
        email: formData.value.email,
        password: formData.value.password
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      successMessage.value = 'Đăng ký thành công! Hãy đăng nhập.';
      addToast('Đăng ký thành công! Đang chuyển hướng...', 'success');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } else {
      errorMessage.value = data.message;
      addToast(data.message, 'error');
    }
  } catch (error) {
    console.error('Register error:', error);
    errorMessage.value = 'Không thể kết nối đến server.';
    addToast('Không thể kết nối đến server.', 'error');
  }
};
</script>

<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-container glass animate-scale-in">
        <router-link to="/" class="back-link">&larr; Quay lại trang chủ</router-link>
        
        <div class="auth-header">
          <h2>Tạo tài khoản mới</h2>
          <p class="subtitle">Tham gia cùng chúng tôi để trải nghiệm đỉnh cao</p>
        </div>

        <form @submit.prevent="handleRegister" class="auth-form">
          <div class="form-group">
            <label>Họ và tên</label>
            <input v-model="formData.name" type="text" placeholder="Nhập họ và tên..." required />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input v-model="formData.email" type="email" placeholder="name@example.com" required />
          </div>

          <div class="form-group">
            <label>Mật khẩu</label>
            <input v-model="formData.password" type="password" placeholder="••••••••" required />
          </div>
          
          <div class="form-group">
            <label>Xác nhận Mật khẩu</label>
            <input v-model="formData.confirmPassword" type="password" placeholder="••••••••" required />
          </div>

          <div v-if="errorMessage" class="error-msg">
            {{ errorMessage }}
          </div>
          <div v-if="successMessage" class="success-msg">
            {{ successMessage }}
          </div>

          <button type="submit" class="btn-primary w-100">Đăng ký ngay</button>
        </form>

        <div class="auth-footer">
          <p>Đã có tài khoản? <router-link to="/login">Đăng nhập</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: transparent;
}

.auth-container {
  width: 100%;
  max-width: 450px;
  padding: 40px;
  border-radius: 24px;
  margin: 0 auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  font-family: 'Inter', sans-serif;
  position: relative;
}

.back-link {
  display: inline-block;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  transition: color 0.3s;
}

.back-link:hover {
  color: var(--primary);
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.auth-header h2 {
  margin: 0 0 10px 0;
  font-size: 2rem;
  font-weight: 700;
}

.subtitle {
  color: var(--text-muted);
}

.form-group {
  margin-bottom: 20px;
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
  transition: all 0.2s;
}

.form-group input:focus {
  border-color: var(--primary);
  background: rgba(255, 255, 255, 0.1);
}

.w-100 { width: 100%; }

.btn-primary {
  padding: 14px;
  font-size: 1rem;
  border-radius: 12px;
  margin-top: 10px;
}

.auth-footer {
  margin-top: 25px;
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.auth-footer a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  margin-left: 5px;
  transition: color 0.2s;
}

.auth-footer a:hover {
  color: var(--primary-hover);
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.animate-scale-in {
  animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.error-msg {
  color: #ef4444;
  font-size: 0.9rem;
  margin-bottom: 15px;
  text-align: center;
  background: rgba(239, 68, 68, 0.1);
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.success-msg {
  color: #10b981;
  font-size: 0.9rem;
  margin-bottom: 15px;
  text-align: center;
  background: rgba(16, 185, 129, 0.1);
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(16, 185, 129, 0.2);
}
</style>
