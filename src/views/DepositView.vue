<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useToast } from '../composables/useToast';

const router = useRouter();
const { token, userName } = useAuth();
const { addToast } = useToast();

const isLoading = ref(true);
const userBalance = ref(0);
const amount = ref(50000);
const quickAmounts = [20000, 50000, 100000, 200000, 500000, 1000000];

// SePay / VietQR Configuration
// Note: You should replace these with your actual SePay/Bank details
const bankConfig = {
  bin: '970405', // Agribank
  accountNo: '1805205159721',
  accountName: 'PHAM DINH LOC',
  template: 'qr_only' // or 'compact', 'qr_only'
};

const transferContent = computed(() => {
  // SePay needs a recognizable content, usually a prefix + user ID or username
  const prefix = 'HAK'; 
  const cleanName = userName.value ? userName.value.replace(/\s+/g, '').toUpperCase() : 'USER';
  return `${prefix} ${cleanName}`;
});

const qrCodeUrl = computed(() => {
  const info = encodeURIComponent(transferContent.value);
  const name = encodeURIComponent(bankConfig.accountName);
  return `https://img.vietqr.io/image/${bankConfig.bin}-${bankConfig.accountNo}-${bankConfig.template}.png?amount=${amount.value}&addInfo=${info}&accountName=${name}`;
});

const fetchUserData = async () => {
  if (!token.value) {
    router.push('/auth/login');
    return;
  }
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${token.value}` }
    });
    const data = await res.json();
    if (data.success) {
      userBalance.value = data.user.balance;
    }
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const copyContent = () => {
  navigator.clipboard.writeText(transferContent.value);
  addToast('Đã sao chép nội dung chuyển khoản!', 'success');
};

onMounted(() => {
  fetchUserData();
  // Listen for storage events (if backend updates balance via webhook and notifies client)
  window.addEventListener('storage', (e) => {
    if (e.key === 'userBalance') {
       userBalance.value = parseInt(e.newValue);
       addToast('Nạp tiền thành công! Số dư đã được cập nhật.', 'success');
    }
  });
});
</script>

<template>
  <div class="deposit-page app-wrapper">
    <div class="container py-5 mt-5">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="deposit-container glass animate-fade-up">
            <!-- Header -->
            <div class="header-section text-center mb-5">
              <h1 class="gradient-text title-huge">Trung Tâm Nạp Tiền</h1>
              <p class="text-muted">Hệ thống nạp tiền tự động qua VietQR & SePay (Xử lý trong 30s)</p>
              <div class="current-balance mt-3">
                <span>Số dư hiện tại: </span>
                <strong class="text-success">{{ userBalance.toLocaleString('vi-VN') }}đ</strong>
              </div>
            </div>

            <div class="deposit-grid">
              <!-- Left: Configuration -->
              <div class="deposit-setup">
                <h3 class="section-title">1. Chọn số tiền muốn nạp</h3>
                <div class="amount-input-wrapper mt-3">
                  <input 
                    v-model="amount" 
                    type="number" 
                    class="custom-input amount-field" 
                    placeholder="Nhập số tiền..."
                  />
                  <span class="currency-label">VNĐ</span>
                </div>
                
                <div class="quick-amounts-grid mt-3">
                  <button 
                    v-for="a in quickAmounts" 
                    :key="a"
                    @click="amount = a"
                    class="btn-amount"
                    :class="{ active: amount === a }"
                  >
                    +{{ (a/1000) }}K
                  </button>
                </div>

                <div class="instructions mt-5 p-4 glass-dark">
                  <h3 class="section-title">2. Hướng dẫn thanh toán</h3>
                  <ul class="step-list">
                    <li>
                      <span class="step-num">1</span>
                      <p>Mở ứng dụng Ngân hàng hoặc Ví điện tử (Momo, ZaloPay...)</p>
                    </li>
                    <li>
                      <span class="step-num">2</span>
                      <p>Chọn chức năng <strong>Quét mã QR</strong></p>
                    </li>
                    <li>
                      <span class="step-num">3</span>
                      <p>Quét mã QR bên cạnh và thực hiện chuyển khoản</p>
                    </li>
                    <li class="important">
                      <span class="step-num">!</span>
                      <p>Giữ nguyên nội dung chuyển khoản để hệ thống tự động cộng tiền</p>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Right: QR Code -->
              <div class="qr-display text-center">
                <div class="qr-card glass-light p-4">
                  <div class="bank-logo-row mb-3">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Agribank_logo.png" alt="Agribank" class="bank-logo-top" />
                  </div>
                  
                  <div class="qr-image-wrapper">
                    <img :src="qrCodeUrl" alt="VietQR Pay" class="qr-image" />
                    <div class="qr-scan-line"></div>
                  </div>

                  <div class="transfer-details mt-4 text-left">
                    <div class="detail-item">
                      <label>Chủ tài khoản:</label>
                      <span>{{ bankConfig.accountName }}</span>
                    </div>
                    <div class="detail-item">
                      <label>Số tài khoản:</label>
                      <span>{{ bankConfig.accountNo }}</span>
                    </div>
                    <div class="detail-item highlight">
                      <label>Nội dung chuyển khoản:</label>
                      <div class="copy-box" @click="copyContent">
                        <strong>{{ transferContent }}</strong>
                        <span class="material-symbols-outlined">content_copy</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="waiting-status mt-4">
                  <div class="spinner-small"></div>
                  <span>Đang chờ hệ thống SePay xác nhận...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.deposit-page { padding-top: 40px; min-height: 100vh; }
.deposit-container { padding: 50px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.05); }

.gradient-text { 
  background: linear-gradient(90deg, #38bdf8, #818cf8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.title-huge { font-size: 3rem; font-weight: 800; }

.current-balance {
  font-size: 1.2rem;
  background: rgba(16, 185, 129, 0.1);
  padding: 10px 25px;
  border-radius: 20px;
  display: inline-block;
}

.deposit-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 50px;
  margin-top: 40px;
}

.section-title { font-size: 1.3rem; font-weight: 700; color: #fff; margin-bottom: 20px; }

.amount-input-wrapper {
  position: relative;
  max-width: 400px;
}
.amount-field {
  font-size: 2rem;
  font-weight: 800;
  padding: 15px 80px 15px 25px;
  color: #38bdf8;
  border-radius: 20px;
  background: rgba(0,0,0,0.3);
}
.currency-label {
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  font-weight: 700;
  color: #94a3b8;
}

.quick-amounts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  max-width: 400px;
}
.btn-amount {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 12px;
  border-radius: 12px;
  color: #fff;
  font-weight: 600;
  transition: all 0.3s;
}
.btn-amount:hover, .btn-amount.active {
  background: var(--primary);
  border-color: #38bdf8;
  box-shadow: 0 5px 15px rgba(56, 189, 248, 0.3);
}

.glass-dark { background: rgba(0,0,0,0.2); border-radius: 20px; }

.step-list { list-style: none; padding: 0; }
.step-list li { display: flex; gap: 15px; margin-bottom: 20px; align-items: flex-start; }
.step-num {
  width: 28px; height: 28px;
  background: #38bdf8;
  color: #000;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 0.9rem; flex-shrink: 0;
}
.step-list p { color: #cbd5e1; margin: 0; line-height: 1.4; }
.step-list li.important .step-num { background: #f59e0b; }
.step-list li.important p { color: #f59e0b; font-weight: 600; }

.qr-card { border-radius: 24px; background: #fff; color: #1e293b; position: relative; overflow: hidden; }
.bank-logo-top { height: 35px; filter: contrast(1.2); }

.qr-image-wrapper { 
  position: relative; 
  background: #fff; 
  padding: 15px; 
  border-radius: 15px; 
  display: inline-block;
  border: 1px solid #e2e8f0;
}
.qr-image { width: 250px; height: 250px; object-fit: contain; }

.qr-scan-line {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: rgba(56, 189, 248, 0.6);
  box-shadow: 0 0 10px #38bdf8;
  animation: scan 3s ease-in-out infinite;
}
@keyframes scan {
  0% { top: 15px; }
  100% { top: 265px; }
}

.transfer-details { font-size: 0.95rem; }
.detail-item { margin-bottom: 12px; display: flex; flex-direction: column; }
.detail-item label { color: #64748b; font-weight: 600; font-size: 0.85rem; margin-bottom: 3px; text-transform: uppercase; }
.detail-item span { color: #1e293b; font-weight: 700; font-size: 1.1rem; }

.copy-box {
  display: flex; justify-content: space-between; align-items: center;
  background: #f1f5f9; padding: 10px 15px; border-radius: 10px; cursor: pointer;
  border: 1px solid #38bdf8; color: #020617;
}
.copy-box:hover { background: #e2e8f0; }
.copy-box strong { font-size: 1.3rem; letter-spacing: 1px; color: #0ea5e9; }

.waiting-status { display: flex; align-items: center; justify-content: center; gap: 10px; color: #94a3b8; font-size: 0.9rem; }
.spinner-small {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.1);
  border-top-color: #38bdf8;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 992px) {
  .deposit-grid { grid-template-columns: 1fr; }
  .deposit-container { padding: 30px 20px; }
  .title-huge { font-size: 2.2rem; }
}
</style>
