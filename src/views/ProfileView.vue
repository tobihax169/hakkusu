<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from '../composables/useToast';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const { addToast } = useToast();
const { token: authStateToken, clearAuth } = useAuth();

const user = ref({
  name: '',
  email: '',
  balance: 0
});

const activeTab = ref('info'); // 'info', 'deposit'
const isLoading = ref(true);

onMounted(async () => {
  const token = authStateToken.value;
  if (!token) {
    addToast('Vui lòng đăng nhập để truy cập!', 'error');
    router.push('/login');
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    
    if (data.success) {
      user.value = data.user;
    } else {
      clearAuth();
      addToast('Phiên đăng nhập hết hạn!', 'error');
      router.push('/login');
    }
  } catch (error) {
    addToast('Lỗi tải dữ liệu cá nhân', 'error');
  } finally {
    isLoading.value = false;
  }
});

const copySyntax = () => {
    navigator.clipboard.writeText(`NAP ${user.value.name}`);
    addToast('Đã copy cú pháp nạp!', 'success');
}
</script>

<template>
  <div class="profile-page">
    <div class="container animate-slide-up">
      <div v-if="isLoading" class="loader-container">
        <div class="loader"></div>
      </div>
      
      <div v-else class="profile-card glass">
        <!-- Sidebar -->
        <div class="profile-sidebar">
          <div class="user-avatar">
            <span class="avatar-text">{{ user.name.charAt(0).toUpperCase() }}</span>
          </div>
          <h2 class="user-name">{{ user.name }}</h2>
          <p class="user-email text-muted">{{ user.email }}</p>
          
          <div class="balance-badge">
            <span class="currency">Số dư:</span>
            <span class="amount">{{ user.balance.toLocaleString('vi-VN') }} VNĐ</span>
          </div>

          <nav class="profile-nav">
            <button 
              @click="activeTab = 'info'" 
              :class="{ active: activeTab === 'info' }"
              class="nav-btn"
            >
              👤 Thông tin tài khoản
            </button>
            <button 
              @click="activeTab = 'deposit'" 
              :class="{ active: activeTab === 'deposit' }"
              class="nav-btn"
            >
              💳 Nạp tiền (Banking)
            </button>
            <button @click="router.push('/')" class="nav-btn btn-home">
              🏠 Về trang chủ
            </button>
          </nav>
        </div>

        <!-- Content Area -->
        <div class="profile-content">
          <!-- Tab Info -->
          <div v-if="activeTab === 'info'" class="tab-pane animate-fade-in">
            <h3>Hồ sơ cá nhân</h3>
            <div class="info-group">
              <label>Họ và tên</label>
              <div class="info-value">{{ user.name }}</div>
            </div>
            <div class="info-group">
              <label>Email đăng ký</label>
              <div class="info-value">{{ user.email }}</div>
            </div>
            <div class="info-group">
              <label>Ngày tham gia</label>
              <div class="info-value text-muted">Vừa mới gia nhập</div>
            </div>
          </div>

          <!-- Tab Deposit -->
          <div v-if="activeTab === 'deposit'" class="tab-pane animate-fade-in">
            <h3>Nạp tiền tự động 24/7</h3>
            <p class="text-muted">Tính năng giả lập, chuyển khoản sẽ được cộng tự động nếu có API thật.</p>
            
            <div class="bank-card">
              <div class="bank-info">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Vietcombank_logo.svg/1024px-Vietcombank_logo.svg.png" 
                     class="bank-logo" alt="Vietcombank" />
                <div class="bank-details">
                  <h4>Ngân hàng Vietcombank</h4>
                  <p>Chi nhánh Thăng Long</p>
                  <p class="acc-num">Số tài khoản: <strong>0123456789</strong></p>
                  <p class="acc-name">Chủ TK: NGUYEN VAN A</p>
                </div>
              </div>
              
              <div class="qr-placeholder">
                <div class="qr-box">
                  MÃ QR Ở ĐÂY
                </div>
              </div>
            </div>

            <div class="syntax-box">
              <p>Nội dung chuyển khoản (Bắt buộc ghi đúng):</p>
              <div class="syntax-code" @click="copySyntax">
                <span>NAP {{ user.name }}</span>
                <button class="btn-copy">Copy</button>
              </div>
              <small class="text-warning">Giao dịch sẽ được xử lý tự động trong vòng 3 phút.</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 20px 50px;
  background: var(--bg-main);
}

.profile-card {
  display: flex;
  width: 100%;
  max-width: 900px;
  min-height: 500px;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 400px;
}

.loader {
  border: 4px solid rgba(255,255,255,0.1);
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

/* Sidebar */
.profile-sidebar {
  width: 300px;
  background: rgba(15, 23, 42, 0.5);
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
}

.avatar-text {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
}

.user-name { margin: 0 0 5px 0; font-size: 1.5rem; }
.user-email { margin: 0 0 20px 0; font-size: 0.9rem; }
.text-muted { color: var(--text-muted); }

.balance-badge {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  padding: 12px 20px;
  border-radius: 12px;
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
}

.currency { display: block; font-size: 0.8rem; color: #10b981; margin-bottom: 5px;}
.amount { display: block; font-size: 1.5rem; font-weight: 700; color: #10b981;}

.profile-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.nav-btn {
  background: transparent;
  border: none;
  color: var(--text-main);
  text-align: left;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
}

.nav-btn:hover { background: rgba(255, 255, 255, 0.05); }
.nav-btn.active {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.btn-home { color: var(--text-muted); margin-top: auto; }

/* Content Area */
.profile-content {
  flex: 1;
  padding: 40px;
}

.tab-pane h3 {
  font-size: 1.8rem;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 15px;
}

.info-group { margin-bottom: 25px; }
.info-group label {
  display: block;
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 8px;
}
.info-value {
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1);
}

/* Bank UI */
.bank-card {
  display: flex;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 25px;
  margin-top: 25px;
  gap: 30px;
}

.bank-info { flex: 1; }
.bank-logo { height: 40px; object-fit: contain; margin-bottom: 20px; filter: brightness(10) drop-shadow(0 0 1px white); }
.bank-details h4 { margin: 0 0 10px 0; color: var(--primary-light); }
.bank-details p { margin: 5px 0; color: var(--text-muted); }
.acc-num strong { color: white; font-size: 1.2rem; }

.qr-box {
  width: 150px;
  height: 150px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-weight: bold;
  font-size: 0.9rem;
}

.syntax-box {
  background: rgba(239, 68, 68, 0.05);
  border: 1px dashed rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  padding: 20px;
  margin-top: 25px;
  text-align: center;
}

.syntax-code {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0,0,0,0.3);
  padding: 15px 25px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ef4444;
  margin: 15px 0;
  cursor: pointer;
}

.btn-copy {
  background: var(--text-main);
  color: var(--bg-main);
  border: none;
  padding: 5px 15px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
}

.text-warning { color: #f59e0b; }

@keyframes fade { from { opacity: 0; } to { opacity: 1; } }
.animate-fade-in { animation: fade 0.4s ease forwards; }
@keyframes slideUp { from { opacity:0; transform: translateY(20px); } to { opacity: 1; transform:translateY(0); } }
.animate-slide-up { animation: slideUp 0.5s ease-out forwards; }
</style>
