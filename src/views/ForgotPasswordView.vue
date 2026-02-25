<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from '../composables/useToast';

const router = useRouter();
const { addToast } = useToast();

const step = ref('request'); // 'request' or 'reset'
const email = ref('');
const code = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const isSubmitting = ref(false);

const requestReset = async () => {
  if (!email.value) return;
  isSubmitting.value = true;
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value })
    });
    const data = await res.json();
    if (data.success) {
      addToast(data.message, 'success');
      step.value = 'reset';
    } else {
      addToast(data.message, 'error');
    }
  } catch (err) {
    addToast('Lỗi kết nối máy chủ', 'error');
  } finally {
    isSubmitting.value = false;
  }
};

const handleReset = async () => {
  if (newPassword.value !== confirmPassword.value) {
    addToast('Mật khẩu xác nhận không khớp', 'error');
    return;
  }
  isSubmitting.value = true;
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        code: code.value,
        newPassword: newPassword.value
      })
    });
    const data = await res.json();
    if (data.success) {
      addToast('Khôi phục mật khẩu thành công! Hãy đăng nhập.', 'success');
      setTimeout(() => router.push('/login'), 1500);
    } else {
      addToast(data.message, 'error');
    }
  } catch (err) {
    addToast('Lỗi kết nối máy chủ', 'error');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-container glass animate-scale-in">
        <router-link to="/login" class="back-link">&larr; Quay lại đăng nhập</router-link>
        
        <div class="auth-header">
          <h2>Quên mật khẩu?</h2>
          <p class="subtitle" v-if="step === 'request'">Hãy nhập email, chúng tôi sẽ cấp mã khôi phục cho bạn.</p>
          <p class="subtitle" v-else>Nhập mã OTP và mật khẩu mới của bạn.</p>
        </div>

        <!-- Step 1: Request Code -->
        <form v-if="step === 'request'" @submit.prevent="requestReset" class="auth-form">
          <div class="form-group">
            <label>Email Của Bạn</label>
            <input v-model="email" type="email" placeholder="name@example.com" required />
          </div>
          <button type="submit" class="btn-primary w-100" :disabled="isSubmitting">
            {{ isSubmitting ? 'Đang gửi...' : 'Nhận mã xác nhận' }}
          </button>
        </form>

        <!-- Step 2: Reset Password -->
        <form v-else @submit.prevent="handleReset" class="auth-form">
          <div class="alert-info mb-4">
            Mã OTP đã được tạo và gửi đến bộ phận quản trị. Vui lòng kiểm tra email hoặc liên hệ CSKH (Support).
          </div>
          
          <div class="form-group">
            <label>Mã Xác Nhận (OTP)</label>
            <input v-model="code" type="text" placeholder="Gồm 6 chữ số..." required />
          </div>

          <div class="form-group">
            <label>Mật khẩu mới</label>
            <input v-model="newPassword" type="password" placeholder="••••••••" required />
          </div>
          
          <div class="form-group">
            <label>Xác nhận mật khẩu mới</label>
            <input v-model="confirmPassword" type="password" placeholder="••••••••" required />
          </div>

          <button type="submit" class="btn-primary w-100" :disabled="isSubmitting">
            {{ isSubmitting ? 'Đang xử lý...' : 'Cập nhật mật khẩu' }}
          </button>
        </form>
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

.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

.alert-info {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #60a5fa;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
}
.mb-4 { margin-bottom: 1.5rem; }

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.animate-scale-in {
  animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
