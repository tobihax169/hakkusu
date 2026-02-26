<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useToast } from '../composables/useToast';

const router = useRouter();
const { setAuth } = useAuth();
const { addToast } = useToast();
const formData = ref({
  email: '',
  password: ''
});

const errorMessage = ref('');

const handleLogin = async () => {
  errorMessage.value = '';
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value)
    });
    const data = await response.json();

    if (data.success) {
      setAuth(data.token, data.user.name, data.user.role);
      addToast('Đăng nhập thành công!', 'success');
      router.push('/');
    } else {
      errorMessage.value = data.message;
      addToast(data.message, 'error');
    }
  } catch (error) {
    console.error('Login error:', error);
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
          <h2>Chào mừng trở lại</h2>
          <p class="subtitle">Đăng nhập để vào hệ thống PremiumWeb</p>
        </div>

        <form @submit.prevent="handleLogin" class="auth-form">
          <div class="form-group">
            <label>Email</label>
            <input v-model="formData.email" type="email" placeholder="name@example.com" required />
          </div>

          <div class="form-group">
            <label>Mật khẩu</label>
            <input v-model="formData.password" type="password" placeholder="••••••••" required />
            <div class="text-right mt-2">
              <router-link to="/auth/forgot-password" class="forgot-link">Bạn quên mật khẩu?</router-link>
            </div>
          </div>

          <div v-if="errorMessage" class="error-msg">
            {{ errorMessage }}
          </div>

          <button type="submit" class="btn-primary w-100">Đăng nhập</button>
        </form>

        <div class="auth-footer">
          <p>Chưa có tài khoản? <router-link to="/auth/register">Đăng ký ngay</router-link></p>
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
  background: transparent; /* Changed from var(--bg-dark) */
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

.text-right { text-align: right; }
.mt-2 { margin-top: 8px; }

.forgot-link {
  font-size: 0.85rem;
  color: var(--primary-light);
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-link:hover {
  text-decoration: underline;
  color: var(--primary);
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

@media (max-width: 576px) {
  .auth-container {
    padding: 24px;
  }
  .auth-header h2 {
    font-size: 1.5rem;
  }
}
</style>
