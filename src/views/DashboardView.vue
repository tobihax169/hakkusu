<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useToast } from '../composables/useToast';
import { useAnnouncement } from '../composables/useAnnouncement';

const router = useRouter();
const { role, token, userName } = useAuth();
const { announcementText, setAnnouncement } = useAnnouncement();

const { addToast: toast } = useToast();

const users = ref([]);
const tickets = ref([]);
const activeTab = ref(role.value === 'admin' ? 'dashboard' : 'tickets');
const isLoading = ref(true);

const fetchUsers = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/admin/users`, {
      headers: { 'Authorization': `Bearer ${token.value}` }
    });
    const data = await res.json();
    if (data.success) {
      users.value = data.users;
    } else {
      toast(data.message, 'error');
    }
  } catch (err) {
    toast('Lỗi khi tải danh sách người dùng.', 'error');
  }
};

const fetchTickets = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/staff/tickets`, {
      headers: { 'Authorization': `Bearer ${token.value}` }
    });
    const data = await res.json();
    if (data.success) {
      tickets.value = data.tickets;
    } else {
      toast(data.message, 'error');
    }
  } catch (err) {
    toast('Lỗi tải danh sách Ticket.', 'error');
  }
};

onMounted(async () => {
  if (role.value === 'user' || !token.value) {
    toast('Bạn không có quyền truy cập trang này!', 'error');
    router.push('/');
    return;
  }

  if (role.value === 'admin') {
    await fetchUsers();
  }
  await fetchTickets();
  
  isLoading.value = false;
});

// Edit Balance Mode
const updateUserData = async (userId, field, value) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/admin/users/${userId}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ [field]: value })
    });
    const data = await res.json();
    if (data.success) {
      toast(data.message, 'success');
      fetchUsers(); // Refresh
    } else {
      toast(data.message, 'error');
    }
  } catch (err) {
    toast('Lỗi cập nhật. Hãy thử lại.', 'error');
  }
}

const toggleRole = (u) => {
   const confirm = window.confirm(`Bạn có chắc muốn đổi quyền của ${u.name} hiện tại là ${u.role}?`);
   if(confirm) {
       const newRole = prompt("Nhập quyền mới (user, staff, admin):", u.role);
       if(newRole && ['user','staff','admin'].includes(newRole)) {
           updateUserData(u._id, 'role', newRole);
       } else {
           toast('Quyền không hợp lệ!', 'error');
       }
   }
}

const editBalance = (u) => {
   const newBal = prompt(`Nhập số dư mới cho ${u.name}:`, u.balance);
   if(newBal !== null && !isNaN(newBal)) {
       updateUserData(u._id, 'balance', Number(newBal));
   }
}

// System Settings Logic
const editAnnouncementText = ref(announcementText.value);
const pushText = ref('');

const saveAnnouncement = () => {
    setAnnouncement(editAnnouncementText.value);
    toast('Đã cập nhật dòng thông báo chạy Marquee!', 'success');
};

const sendPushNotification = () => {
    if(!pushText.value.trim()) {
        toast('Vui lòng nhập nội dung Push Notification', 'error');
        return;
    }
    localStorage.setItem('global_push_notif', JSON.stringify({
        message: pushText.value,
        t: Date.now()
    }));
    toast('Đã phát Push Notification toàn hệ thống!', 'success');
    pushText.value = '';
};

// Computed Stats
const totalUsers = computed(() => users.value.length);
const totalBalance = computed(() => users.value.reduce((sum, u) => sum + (u.balance || 0), 0));
const totalTickets = computed(() => tickets.value.length);
const waitingTickets = computed(() => tickets.value.filter(t => t.status === 'waiting').length);

</script>

<template>
  <div class="vision-dashboard">
    <div v-if="isLoading" class="loader-container">
      <div class="loader"></div>
    </div>

    <div v-else class="vision-layout">
      <!-- Sidebar -->
      <aside class="vision-sidebar">
        <div class="sidebar-brand" @click="router.push('/')">
          <img src="/logo.png" alt="Logo" class="brand-logo" />
          <span>Hakkusu UI</span>
        </div>
        
        <hr class="sidebar-divider" />
        
        <div class="sidebar-menu">
          <button v-if="role === 'admin'" @click="activeTab = 'dashboard'" :class="{ active: activeTab === 'dashboard' }" class="v-nav-item">
            <span class="v-icon-box"><span class="material-symbols-outlined">home</span></span>
            <span class="v-nav-text">Dashboard</span>
          </button>
          
          <button v-if="role === 'admin'" @click="activeTab = 'users'" :class="{ active: activeTab === 'users' }" class="v-nav-item">
            <span class="v-icon-box"><span class="material-symbols-outlined">group</span></span>
            <span class="v-nav-text">Người dùng</span>
          </button>
          
          <button @click="activeTab = 'tickets'" :class="{ active: activeTab === 'tickets' }" class="v-nav-item">
            <span class="v-icon-box"><span class="material-symbols-outlined">confirmation_number</span></span>
            <span class="v-nav-text">Tickets</span>
          </button>
          
          <button v-if="role === 'admin'" @click="activeTab = 'settings'" :class="{ active: activeTab === 'settings' }" class="v-nav-item">
            <span class="v-icon-box"><span class="material-symbols-outlined">settings</span></span>
            <span class="v-nav-text">Hệ thống</span>
          </button>
          
          <div class="sidebar-title">ACCOUNT PAGES</div>
          <button @click="router.push('/profile')" class="v-nav-item">
            <span class="v-icon-box"><span class="material-symbols-outlined">person</span></span>
            <span class="v-nav-text">Profile</span>
          </button>
        </div>
        
        <div class="sidebar-help">
          <div class="help-box">
            <div class="help-icon"><span class="material-symbols-outlined">help</span></div>
            <h4>Cần hỗ trợ?</h4>
            <p>Vui lòng xem docs</p>
            <button class="btn-help">DOCUMENTATION</button>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="vision-main">
        <header class="vision-header">
          <div class="header-breadcrumb">
            <span class="light-text">Pages / </span> <span class="fw-bold">{{ activeTab }}</span>
            <h2 class="page-title">{{ activeTab.charAt(0).toUpperCase() + activeTab.slice(1) }}</h2>
          </div>
          <div class="header-actions">
            <div class="search-box">
              <span class="material-symbols-outlined">search</span>
              <input type="text" placeholder="Type here..." />
            </div>
            <button class="header-btn" @click="router.push('/')">
              <span class="material-symbols-outlined">logout</span> Thoát
            </button>
          </div>
        </header>

        <div class="vision-content animate-fade-in">
          
          <!-- DASHBOARD OVERVIEW TAB -->
          <div v-if="activeTab === 'dashboard' && role === 'admin'" class="tab-content">
            <!-- Top Stats -->
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-info">
                  <p class="stat-label">Tổng Doanh Thu</p>
                  <h3 class="stat-value">{{ totalBalance.toLocaleString() }}đ <span class="text-success">+55%</span></h3>
                </div>
                <div class="stat-icon bg-blue"><span class="material-symbols-outlined">account_balance_wallet</span></div>
              </div>
              <div class="stat-card">
                <div class="stat-info">
                  <p class="stat-label">Tổng Người Dùng</p>
                  <h3 class="stat-value">{{ totalUsers }} <span class="text-success">+5%</span></h3>
                </div>
                <div class="stat-icon bg-blue"><span class="material-symbols-outlined">language</span></div>
              </div>
              <div class="stat-card">
                <div class="stat-info">
                  <p class="stat-label">Tickets Chờ</p>
                  <h3 class="stat-value">{{ waitingTickets }} <span class="text-danger">-14%</span></h3>
                </div>
                <div class="stat-icon bg-blue"><span class="material-symbols-outlined">description</span></div>
              </div>
              <div class="stat-card">
                <div class="stat-info">
                  <p class="stat-label">Tổng Tickets</p>
                  <h3 class="stat-value">{{ totalTickets }} <span class="text-success">+8%</span></h3>
                </div>
                <div class="stat-icon bg-blue"><span class="material-symbols-outlined">shopping_cart</span></div>
              </div>
            </div>

            <!-- Dashboard Banners -->
            <div class="banners-grid mt-4">
              <div class="welcome-card">
                <div class="welcome-content">
                  <p class="w-subtitle">Welcome back,</p>
                  <h2 class="w-title">{{ userName }}</h2>
                  <p class="w-text">Glad to see you again!<br>Ask me anything.</p>
                  <a href="#" class="w-link">Tap to record →</a>
                </div>
                <!-- CSS glowing ring on the right -->
                <div class="welcome-bg-graphic"></div>
              </div>

              <div class="satisfaction-card">
                <h3 class="card-title">Satisfaction Rate</h3>
                <p class="card-subtitle">From all projects</p>
                <div class="circle-chart">
                  <div class="circle-inner">
                    <span class="material-symbols-outlined icon-smile">sentiment_satisfied</span>
                  </div>
                  <div class="circle-text">
                    <h2>95%</h2>
                    <p>Based on likes</p>
                  </div>
                </div>
              </div>

              <div class="referral-card">
                <h3 class="card-title">Referral Tracking</h3>
                <div class="ref-content">
                  <div class="ref-stats">
                    <div class="ref-box">
                      <p>Invited</p>
                      <h4>145 people</h4>
                    </div>
                    <div class="ref-box">
                      <p>Bonus</p>
                      <h4>1,465</h4>
                    </div>
                  </div>
                  <div class="ref-score">
                    <div class="score-circle">
                      <p>Safety</p>
                      <h2>9.3</h2>
                      <p>Total Score</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Chart placeholder -->
            <div class="chart-section mt-4">
              <div class="chart-card">
                <h3 class="card-title">Sales overview</h3>
                <p class="card-subtitle"><span class="text-success">(+5) more</span> in 2026</p>
                <div class="chart-placeholder">
                  <!-- CSS wave graphic placeholder -->
                  <div class="wave wave1"></div>
                  <div class="wave wave2"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- USERS TAB -->
          <div v-if="activeTab === 'users' && role === 'admin'" class="tab-content">
            <div class="v-card">
              <h3 class="card-title">Danh sách Người dùng</h3>
              <div class="table-responsive mt-3">
                <table class="v-table">
                  <thead>
                    <tr>
                      <th>AUTHOR</th>
                      <th>ROLE</th>
                      <th>BALANCE</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="u in users" :key="u._id">
                      <td>
                        <div class="td-author">
                          <div class="td-avatar">{{ (u.name || '?').charAt(0) }}</div>
                          <div class="td-author-info">
                            <h4>{{ u.name || 'Người dùng' }}</h4>
                            <p>{{ u.email }}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="v-badge" :class="u.role">{{ u.role }}</span>
                      </td>
                      <td>
                        <span class="td-money">{{ (u.balance || 0).toLocaleString() }}đ</span>
                      </td>
                      <td>
                        <button class="v-action-btn edit" @click="editBalance(u)">💰</button>
                        <button class="v-action-btn config" @click="toggleRole(u)">🛡️</button>
                      </td>
                    </tr>
                    <tr v-if="users.length === 0">
                      <td colspan="4" class="text-center">No users found.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- TICKETS TAB -->
          <div v-if="activeTab === 'tickets'" class="tab-content">
            <div class="v-card">
              <h3 class="card-title">Tickets Hỗ trợ Trực tuyến</h3>
              <div class="tickets-grid mt-4">
                <div v-for="t in tickets" :key="t.ticketId" class="t-card">
                  <div class="t-header">
                    <span class="v-badge" :class="'badge-' + t.status">
                      {{ t.status === 'waiting' ? 'Waiting' : (t.status === 'active' ? 'Active' : 'Closed') }}
                    </span>
                    <span class="t-id">{{ t.ticketId }}</span>
                  </div>
                  <div class="t-body">
                    <h4>{{ t.customerName }}</h4>
                    <p v-if="t.supporterName">Supporter: <span>{{ t.supporterName }}</span></p>
                  </div>
                  <div class="t-footer">
                    Manage in Discord
                  </div>
                </div>
                <div v-if="tickets.length === 0" class="empty-text">No tickets available.</div>
              </div>
            </div>
          </div>

          <!-- SETTINGS TAB -->
          <div v-if="activeTab === 'settings' && role === 'admin'" class="tab-content">
            <div class="v-card">
              <h3 class="card-title">Cấu hình Hệ thống Tùy chỉnh</h3>
              
              <div class="setting-block mt-4">
                <h4>1. Dòng thông báo nổi (Marquee Banner)</h4>
                <p>Chạy dọc dưới thanh Header ở Trang chủ.</p>
                <div class="setting-input-group mt-2">
                  <input v-model="editAnnouncementText" class="v-input" placeholder="Type banner message..." />
                  <button @click="saveAnnouncement" class="v-btn">Save Setting</button>
                </div>
              </div>

              <div class="setting-block mt-4">
                <h4>2. Phát Push Notification Khẩn cấp</h4>
                <p>Gửi thông báo âm thanh nổi toàn hệ thống tới tất cả Client.</p>
                <div class="setting-input-group mt-2">
                  <input v-model="pushText" class="v-input" placeholder="Type push message..." />
                  <button @click="sendPushNotification" class="v-btn btn-danger">Broadcast</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.vision-dashboard {
  min-height: 100vh;
  background-color: #0b1437;
  color: #fff;
  font-family: 'Plus Jakarta Sans', sans-serif;
  overflow-x: hidden;
}

/* Loader */
.loader-container { display: flex; align-items: center; justify-content: center; height: 100vh; }
.loader { border: 4px solid rgba(255,255,255,0.1); border-top: 4px solid #0075ff; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

.vision-layout {
  display: flex;
  min-height: 100vh;
}

/* Sidebar */
.vision-sidebar {
  width: 260px;
  background: linear-gradient(180deg, rgba(17,28,68,0.8) 0%, rgba(17,28,68,0.4) 100%);
  border-right: 1px solid rgba(255,255,255,0.05);
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  backdrop-filter: blur(20px);
  position: fixed;
  height: 100vh;
  z-index: 100;
}

.sidebar-brand { display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer; }
.brand-logo { height: 32px; }
.sidebar-brand span { font-weight: 700; font-size: 1.2rem; letter-spacing: 0.5px; }

.sidebar-divider { border: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); margin: 25px 0; }

.sidebar-menu { display: flex; flex-direction: column; gap: 8px; flex: 1; }
.v-nav-item {
  display: flex; align-items: center; gap: 15px; background: transparent; border: none;
  color: #a0aec0; padding: 12px 16px; border-radius: 15px; cursor: pointer; transition: all 0.3s;
}
.sidebar-title { font-size: 0.75rem; font-weight: 700; color: #fff; margin: 20px 0 10px 10px; letter-spacing: 0.5px; }

.v-icon-box {
  width: 30px; height: 30px; background: #1a2035; border-radius: 10px;
  display: flex; justify-content: center; align-items: center; color: #0075ff; transition: 0.3s;
}
.v-icon-box span { font-size: 1.1rem; }
.v-nav-text { font-weight: 600; font-size: 0.95rem; }

.v-nav-item:hover { color: #fff; }
.v-nav-item.active { background: #1a2035; color: #fff; }
.v-nav-item.active .v-icon-box { background: #0075ff; color: #fff; }

.sidebar-help { margin-top: auto; }
.help-box {
  background: linear-gradient(135deg, #0075ff 0%, #1a2035 100%);
  border-radius: 15px; padding: 20px; text-align: left; position: relative; overflow: hidden;
}
.help-icon {
  width: 35px; height: 35px; background: #fff; color: #0075ff; border-radius: 10px;
  display: flex; justify-content: center; align-items: center; margin-bottom: 15px;
}
.help-box h4 { margin: 0; font-size: 1rem; color: #fff; font-weight: 700; }
.help-box p { font-size: 0.8rem; color: #e2e8f0; margin: 5px 0 15px; }
.btn-help { width: 100%; padding: 8px; background: #fff; color: #0f172a; border: none; border-radius: 8px; font-weight: 700; font-size: 0.75rem; cursor: pointer; }

/* Main Content */
.vision-main {
  flex: 1;
  margin-left: 260px;
  padding: 30px 40px;
}

.vision-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;
}
.header-breadcrumb { color: #a0aec0; font-size: 0.9rem; }
.light-text { opacity: 0.7; }
.fw-bold { font-weight: 600; color: #fff; }
.page-title { margin: 5px 0 0; font-size: 1.8rem; font-weight: 700; color: #fff; }

.header-actions { display: flex; align-items: center; gap: 20px; }
.search-box {
  display: flex; align-items: center; gap: 10px; background: #0f1535; border: 1px solid rgba(255,255,255,0.1);
  padding: 10px 15px; border-radius: 20px;
}
.search-box input { background: transparent; border: none; color: #fff; outline: none; font-family: inherit; }
.search-box span { color: #a0aec0; font-size: 1.2rem; }
.header-btn {
  display: flex; align-items: center; gap: 5px; background: transparent; border: none; color: #fff;
  font-weight: 600; cursor: pointer; font-size: 0.95rem; font-family: inherit;
}

/* Common Card */
.v-card {
  background: linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%);
  border-radius: 20px; padding: 25px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 25px;
}
.card-title { font-size: 1.2rem; font-weight: 700; margin: 0 0 5px; }
.card-subtitle { font-size: 0.9rem; color: #a0aec0; margin: 0; }
.text-success { color: #01b574; font-weight: 700; font-size: 0.9rem;}
.text-danger { color: #e53e3e; font-weight: 700; font-size: 0.9rem;}

/* Stats Grid */
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.stat-card {
  background: linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%);
  border-radius: 20px; padding: 20px; display: flex; justify-content: space-between; align-items: center;
  border: 1px solid rgba(255,255,255,0.05);
}
.stat-label { color: #a0aec0; font-size: 0.85rem; font-weight: 700; margin: 0 0 5px; }
.stat-value { margin: 0; font-size: 1.3rem; font-weight: 700; }
.stat-icon { width: 45px; height: 45px; border-radius: 12px; display: flex; justify-content: center; align-items: center; color: #fff; }
.bg-blue { background: #0075ff; }

/* Banners Grid */
.banners-grid { display: grid; grid-template-columns: 2fr 1fr 1.5fr; gap: 20px; }

.welcome-card {
  background: linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%);
  border-radius: 20px; padding: 30px; position: relative; overflow: hidden;
  border: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: space-between;
}
.w-subtitle { color: #a0aec0; font-weight: 600; margin: 0 0 5px; }
.w-title { font-size: 2rem; font-weight: 700; margin: 0 0 10px; }
.w-text { color: #a0aec0; font-size: 0.95rem; line-height: 1.5; margin: 0 0 20px; }
.w-link { color: #fff; font-weight: 600; text-decoration: none; font-size: 0.9rem; }
.welcome-bg-graphic {
  position: absolute; right: -50px; top: -50px; width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(0,117,255,0.4) 0%, rgba(0,0,0,0) 70%); border-radius: 50%;
}

.satisfaction-card {
  background: linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%);
  border-radius: 20px; padding: 25px; border: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column;
}
.circle-chart {
  flex: 1; display: flex; justify-content: center; align-items: center; position: relative; margin-top: 20px;
}
.circle-inner { width: 120px; height: 120px; border-radius: 50%; border: 10px solid #0075ff; border-top-color: #1a2035; display: flex; justify-content: center; align-items: center; }
.icon-smile { font-size: 2rem; color: #fff; background: #0075ff; border-radius: 50%; padding: 5px; transform: translateY(45px); }
.circle-text { position: absolute; text-align: center; }
.circle-text h2 { margin: 0; font-size: 1.8rem; }
.circle-text p { margin: 0; font-size: 0.7rem; color: #a0aec0; }

.referral-card {
  background: linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%);
  border-radius: 20px; padding: 25px; border: 1px solid rgba(255,255,255,0.05);
}
.ref-content { display: flex; justify-content: space-between; align-items: center; height: 100%; margin-top: 15px;}
.ref-stats { display: flex; flex-direction: column; gap: 20px;}
.ref-box p { color: #a0aec0; margin: 0 0 5px; font-size: 0.85rem;}
.ref-box h4 { margin: 0; font-size: 1.2rem;}
.score-circle {
  width: 130px; height: 130px; border-radius: 50%; border: 8px solid #01b574;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
}
.score-circle p { margin: 0; font-size: 0.8rem; color: #a0aec0;}
.score-circle h2 { margin: 5px 0; font-size: 2rem;}

/* Chart placeholder */
.chart-card {
  background: linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%);
  border-radius: 20px; padding: 25px; border: 1px solid rgba(255,255,255,0.05); min-height: 300px;
}
.chart-placeholder {
  height: 200px; width: 100%; position: relative; overflow: hidden; margin-top: 20px;
  background: linear-gradient(rgba(0,117,255,0.1), transparent); border-radius: 10px;
}
.wave {
  position: absolute; bottom: 0; width: 200%; height: 100px; background: rgba(0, 117, 255, 0.3);
  border-top: 3px solid #0075ff; border-radius: 50% 50% 0 0; animation: moveWave 10s linear infinite;
}
.wave2 { background: rgba(0, 117, 255, 0.1); border-top: 2px solid #0075ff; animation-duration: 7s; bottom: 20px;}
@keyframes moveWave { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

/* Table styling for Uses Tab */
.table-responsive { overflow-x: auto; }
.v-table { width: 100%; border-collapse: collapse; }
.v-table th { color: #a0aec0; font-size: 0.8rem; text-align: left; padding: 15px 10px; border-bottom: 1px solid rgba(255,255,255,0.05); }
.v-table td { padding: 15px 10px; border-bottom: 1px solid rgba(255,255,255,0.05); }
.td-author { display: flex; align-items: center; gap: 15px; }
.td-avatar { width: 40px; height: 40px; border-radius: 12px; background: #0075ff; display: flex; justify-content: center; align-items: center; font-weight: bold; font-size: 1.2rem;}
.td-author-info h4 { margin: 0; font-size: 0.95rem; }
.td-author-info p { margin: 5px 0 0; font-size: 0.8rem; color: #a0aec0; }
.v-badge { padding: 5px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
.v-badge.user { background: rgba(160, 174, 192, 0.2); color: #cbd5e1; }
.v-badge.admin { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
.v-badge.staff { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
.td-money { font-weight: 700; color: #fff; }
.v-action-btn { background: transparent; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 6px; cursor: pointer; color:#fff; margin-right: 5px;}
.v-action-btn:hover { background: rgba(255,255,255,0.1); }

/* Tickets Grid */
.tickets-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;}
.t-card { background: rgba(15,21,53,0.8); border: 1px solid rgba(255,255,255,0.05); border-radius: 15px; padding: 20px;}
.t-header { display: flex; justify-content: space-between; margin-bottom: 15px;}
.badge-waiting { color: #f59e0b; } .badge-active { color: #10b981; }
.t-id { color: #a0aec0; font-family: monospace; }
.t-body h4 { margin: 0 0 5px; }
.t-body p { margin: 0; color: #a0aec0; font-size: 0.85rem;}
.t-body span { color: #fff;}
.t-footer { margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.05); font-size: 0.8rem; color: #a0aec0;}

/* Settings */
.setting-block { background: rgba(15,21,53,0.8); border: 1px solid rgba(255,255,255,0.05); padding: 20px; border-radius: 15px; }
.setting-block h4 { margin: 0 0 5px; }
.setting-block p { margin: 0; color: #a0aec0; font-size: 0.9rem;}
.setting-input-group { display: flex; gap: 10px; }
.v-input { flex:1; background: #0f1535; border: 1px solid rgba(255,255,255,0.1); color:#fff; padding: 12px 15px; border-radius: 10px; outline:none; font-family:inherit;}
.v-input:focus { border-color: #0075ff; }
.v-btn { background: #0075ff; color: #fff; border: none; padding: 12px 25px; border-radius: 10px; font-weight: 600; cursor: pointer; font-family:inherit;}
.v-btn.btn-danger { background: #ef4444; }

.mt-2 { margin-top: 10px; }
.mt-3 { margin-top: 15px; }
.mt-4 { margin-top: 25px; }

</style>
