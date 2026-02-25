<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from '../composables/useToast';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const { addToast } = useToast();
const { token: authStateToken, clearAuth } = useAuth();

const user = ref({
  name: '',
  email: '',
  balance: 0,
  avatar: '',
  lastUsernameChange: null
});

const editState = ref({
  isEditingName: false,
  newName: '',
  isEditingAvatar: false,
  newAvatar: ''
});

const activeTab = ref('info'); // 'info', 'deposit'
const isLoading = ref(true);

const depositAmount = ref(50000); // Mặc định 50K
// Tạo đường link VietQR tự động dựa trên số tiền. (Agribank BIN = 970405)
// Định dạng: https://img.vietqr.io/image/BIN-STK-TEMPLATE.png?amount=XXX&addInfo=YYY&accountName=ZZZ
const qrCodeUrl = computed(() => {
  const bin = "970405"; // Mã BIN của Agribank
  const accountNo = "1805205159721"; // STK của bạn
  const template = "compact"; // Giao diện QR code
  const amount = depositAmount.value || 0;
  const description = `NAP ${user.value.name.replace(/\s+/g, '')}`; // Nội dung CK, xóa dấu cách
  const accountName = "PHAM DINH LOC";
  
  return `https://img.vietqr.io/image/${bin}-${accountNo}-${template}.png?amount=${amount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(accountName)}`;
});

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

const isUploading = ref(false);

const handleAvatarUpload = (event) => {
  const file = event.target.files[0];
  if (!file) {
    editState.value.newAvatar = '';
    return;
  }
  
  if (file.size > 5 * 1024 * 1024) {
    addToast('Kích thước ảnh không được vượt quá 5MB.', 'error');
    event.target.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    editState.value.newAvatar = e.target.result;
  };
  reader.readAsDataURL(file);
};

const cancelAvatarEdit = () => {
  editState.value.isEditingAvatar = false;
  editState.value.newAvatar = '';
};

const updateAvatar = async () => {
  if (!editState.value.newAvatar.trim()) return;
  isUploading.value = true;
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/profile/avatar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStateToken.value}`
      },
      body: JSON.stringify({ avatar: editState.value.newAvatar })
    });
    const data = await res.json();
    if (data.success) {
      user.value.avatar = data.avatar;
      editState.value.isEditingAvatar = false;
      editState.value.newAvatar = '';
      addToast('Cập nhật avatar thành công', 'success');
    } else {
      addToast(data.message, 'error');
    }
  } catch (err) {
    addToast('Lỗi kết nối', 'error');
  } finally {
    isUploading.value = false;
  }
};

const updateName = async () => {
  if (editState.value.newName.trim().length < 3) {
    addToast('Tên phải có ít nhất 3 ký tự', 'error');
    return;
  }
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/profile/username`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStateToken.value}`
      },
      body: JSON.stringify({ newName: editState.value.newName })
    });
    const data = await res.json();
    if (data.success) {
      user.value.name = data.name;
      editState.value.isEditingName = false;
      // update global auth state
      localStorage.setItem('userName', data.name); 
      // reload page to sync or just let composable handle it (but composable is reactive)
      addToast('Cập nhật tên thành công', 'success');
      setTimeout(()=> window.location.reload(), 1500);
    } else {
      addToast(data.message, 'error');
    }
  } catch (err) {
    addToast('Lỗi kết nối', 'error');
  }
};

const copySyntax = () => {
    navigator.clipboard.writeText(`NAP ${user.value.name.replace(/\s+/g, '')}`);
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
          <div class="user-avatar-wrapper" @click="editState.isEditingAvatar = true">
            <div class="user-avatar" :style="user.avatar ? `background-image: url('${user.avatar}'); background-size: cover; background-position: center;` : ''">
              <span v-if="!user.avatar" class="avatar-text">{{ user.name.charAt(0).toUpperCase() }}</span>
            </div>
            <div class="avatar-overlay">🖼️ Đổi ảnh</div>
          </div>
          
          <div v-if="editState.isEditingAvatar" class="edit-avatar-box">
            <input type="file" accept="image/*" @change="handleAvatarUpload" class="custom-input p-1" />
            
            <div v-if="editState.newAvatar" class="preview-avatar mt-2 text-center">
              <img :src="editState.newAvatar" alt="Preview" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary);" />
            </div>

            <div class="edit-actions mt-2 justify-center">
              <button @click="updateAvatar" class="btn-primary btn-sm" :disabled="!editState.newAvatar || isUploading">
                {{ isUploading ? 'Đang Lưu...' : 'Lưu' }}
              </button>
              <button @click="cancelAvatarEdit" class="btn-cancel btn-sm">Hủy</button>
            </div>
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
              
              <div v-if="!editState.isEditingName" class="info-value d-flex-between">
                <span>{{ user.name }}</span>
                <button @click="editState.isEditingName = true; editState.newName = user.name" class="btn-edit">✏️ Thay đổi (7 ngày/lần)</button>
              </div>

              <div v-else class="edit-name-box">
                <input v-model="editState.newName" type="text" class="custom-input w-100 mb-2" />
                <div class="edit-actions">
                  <button @click="updateName" class="btn-primary btn-sm">Lưu tên mới</button>
                  <button @click="editState.isEditingName = false" class="btn-cancel btn-sm">Hủy</button>
                </div>
                <small class="text-warning mt-2 d-block">Lưu ý: Bạn chỉ được đổi tên 1 lần mỗi tuần.</small>
              </div>

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

          <!-- Tab Deposit (Agribank) -->
          <div v-if="activeTab === 'deposit'" class="tab-pane animate-fade-in">
            <h3>Nạp tiền Tự động 24/7 qua Agribank</h3>
            <p class="text-muted">Tính năng tự động cộng tiền siêu tốc ngay sau khi bạn thanh toán thành công.</p>

            <div class="deposit-controls mb-4">
              <label style="color: var(--text-main); display: block; margin-bottom: 10px; font-weight: bold;">Nhập số tiền muốn nạp:</label>
              <div style="display: flex; gap: 10px; align-items: center;">
                <input v-model="depositAmount" type="number" min="10000" step="10000" class="custom-input" style="font-size: 1.2rem; font-weight: bold; width: 200px;" />
                <span style="font-size: 1.2rem; font-weight: bold; color: #10b981;">VNĐ</span>
              </div>
            </div>
            
            <div class="bank-card">
              <div class="bank-info">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Agribank_logo.png" 
                     class="bank-logo" alt="Agribank" style="filter: brightness(1.2);" />
                <div class="bank-details">
                  <h4 style="color: #ed1c24;">Agribank - Ngân hàng Nông nghiệp</h4>
                  <p class="acc-num">Số tài khoản: <strong>1805205159721</strong></p>
                  <p class="acc-name">Chủ TK: <strong>PHẠM ĐÌNH LỘC</strong></p>
                </div>
              </div>
              
              <div class="qr-placeholder" style="background: white; border-radius: 12px; padding: 10px;">
                 <!-- Nơi hiển thị Ảnh QR động từ máy chủ VietQR -->
                 <img :src="qrCodeUrl" alt="VietQR Agribank" style="width: 200px; height: 200px; object-fit: contain; border-radius: 8px;" />
              </div>
            </div>

            <div class="syntax-box">
              <p>Nội dung chuyển khoản (Bắt buộc ghi MÃ này để được cộng Tự Động):</p>
              <div class="syntax-code" @click="copySyntax">
                <span>NAP {{ user.name.replace(/\s+/g, '') }}</span>
                <button class="btn-copy">Copy</button>
              </div>
              <small class="text-warning">Giao dịch sẽ được cập nhật số dư trong vài giây sau khi chuyển thành công.</small>
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

.profile-sidebar {
  width: 300px;
  background: rgba(15, 23, 42, 0.5);
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.user-avatar-wrapper {
  position: relative;
  cursor: pointer;
  margin-bottom: 20px;
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
  overflow: hidden;
}

.avatar-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.user-avatar-wrapper:hover .avatar-overlay {
  opacity: 1;
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
.w-100 { width: 100%; }
.text-center { text-align: center; }
.justify-center { justify-content: center; }
.p-1 { padding: 5px; cursor: pointer; }

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
.d-flex-between { display: flex; justify-content: space-between; align-items: center; }
.d-block { display: block; }
.mb-2 { margin-bottom: 0.5rem; }
.mt-2 { margin-top: 0.5rem; }

.btn-edit {
  background: none; border: none; color: var(--primary); font-size: 0.85rem; cursor: pointer;
}
.btn-edit:hover { text-decoration: underline; }

.custom-input {
  background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: white;
  padding: 10px; border-radius: 6px; width: 100%; font-family: inherit;
}
.custom-input:focus { border-color: var(--primary); outline: none; }

.edit-actions { display: flex; gap: 10px; }
.btn-sm { padding: 6px 12px; font-size: 0.9rem; border-radius: 6px; cursor: pointer; }
.btn-cancel { background: transparent; color: white; border: 1px solid rgba(255,255,255,0.2); }
.btn-cancel:hover { background: rgba(255,255,255,0.1); }

.edit-avatar-box { width: 100%; margin-bottom: 20px; }

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
