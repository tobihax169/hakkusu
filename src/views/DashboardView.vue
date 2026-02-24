<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useToast } from '../composables/useToast';

const router = useRouter();
const { role, token, addToast } = useAuth();
// the useAuth addToast is not actually there! Let's import useToast

const { addToast: toast } = useToast();

const users = ref([]);
const tickets = ref([]);
const activeTab = ref(role.value === 'admin' ? 'users' : 'tickets');
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

</script>

<template>
  <div class="dashboard-page">
    <div class="container animate-slide-up">
      <div v-if="isLoading" class="loader-container">
        <div class="loader"></div>
      </div>

      <div v-else class="dashboard-card glass">
        <!-- Sidebar -->
        <div class="dashboard-sidebar">
          <div class="sidebar-header">
            <h3>{{ role === 'admin' ? 'Quản Trị Viên' : 'Nhân Viên Hỗ Trợ' }}</h3>
          </div>

          <nav class="dashboard-nav">
            <button v-if="role === 'admin'"
              @click="activeTab = 'users'" 
              :class="{ active: activeTab === 'users' }"
              class="nav-btn"
            >
              👥 Quản lý Người dùng
            </button>
            <button 
              @click="activeTab = 'tickets'" 
              :class="{ active: activeTab === 'tickets' }"
              class="nav-btn"
            >
              🎫 Quản lý Tickets
            </button>
            <button @click="router.push('/')" class="nav-btn btn-home mt-auto">
              🏠 Quay về
            </button>
          </nav>
        </div>

        <!-- Content Area -->
        <div class="dashboard-content">

          <!-- ADMIN: USERS -->
          <div v-if="activeTab === 'users' && role === 'admin'" class="tab-pane animate-fade-in">
            <h2 class="mb-3">Danh sách Người dùng</h2>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Quyền</th>
                    <th>Số dư (VNĐ)</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="u in users" :key="u._id">
                    <td>
                      <div class="d-flex align-items-center gap-2">
                        <img v-if="u.avatar" :src="u.avatar" class="mini-avatar" />
                        <span v-else class="mini-avatar-text">{{ u.name.charAt(0) }}</span>
                        <strong>{{ u.name }}</strong>
                      </div>
                    </td>
                    <td>{{ u.email }}</td>
                    <td>
                      <span class="role-badge" :class="u.role">{{ u.role }}</span>
                    </td>
                    <td class="text-success fw-bold">{{ u.balance.toLocaleString() }}đ</td>
                    <td>
                      <button @click="editBalance(u)" class="action-btn btn-money" title="Sửa Tiền">💰</button>
                      <button @click="toggleRole(u)" class="action-btn btn-rule" title="Đổi Quyền">🛡️</button>
                    </td>
                  </tr>
                  <tr v-if="users.length === 0">
                    <td colspan="5" class="text-center">Chưa có dữ liệu</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- STAFF / ADMIN: TICKETS -->
          <div v-if="activeTab === 'tickets'" class="tab-pane animate-fade-in">
            <h2 class="mb-3">Tickets Hỗ trợ Trực tuyến</h2>
            <div class="tickets-grid">
              <div v-for="t in tickets" :key="t.ticketId" class="ticket-card glass-panel" :class="t.status">
                <div class="ticket-header">
                  <span class="badge" :class="'badge-' + t.status">
                    {{ t.status === 'waiting' ? '⏳ Đang chờ' : (t.status === 'active' ? '🟢 Đang hỗ trợ' : 'Ngắt kết nối') }}
                  </span>
                  <strong class="ticket-id">{{ t.ticketId }}</strong>
                </div>
                <div class="ticket-body">
                  <p>👤 Khách Hàng: <strong>{{ t.customerName }}</strong></p>
                  <p v-if="t.supporterName">🛡️ Phụ trách: <strong>{{ t.supporterName }}</strong></p>
                </div>
                <div class="ticket-footer pt-3">
                  <span class="small-text text-muted">Ticket này do Discord quản lý. Vui lòng mở Discord để chat & phân công.</span>
                </div>
              </div>

              <div v-if="tickets.length === 0" class="empty-state">
                <p>Không có yêu cầu hỗ trợ nào đang hoạt động lúc này.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-page {
  flex: 1;
  display: flex;
  padding: 80px 20px 50px;
  background: var(--bg-main);
  justify-content: center;
}

.dashboard-card {
  display: flex;
  width: 100%;
  max-width: 1100px;
  min-height: 600px;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.loader-container {
  display: flex;  align-items: center; justify-content: center; width: 100%; height: 500px;
}
.loader {
  border: 4px solid rgba(255,255,255,0.1); border-top: 4px solid var(--primary);
  border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

/* Sidebar */
.dashboard-sidebar {
  width: 280px;
  background: rgba(15, 23, 42, 0.5);
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.sidebar-header h3 {
  color: var(--primary-light);
  font-size: 1.4rem;
  margin-bottom: 2rem;
  text-align: center;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 15px;
}

.dashboard-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
}

.nav-btn {
  background: transparent; border: none; color: var(--text-main); text-align: left;
  padding: 12px 20px; border-radius: 10px; cursor: pointer; transition: all 0.2s; font-size: 1.05rem;
}
.nav-btn:hover { background: rgba(255, 255, 255, 0.05); }
.nav-btn.active { background: var(--primary); color: white; box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3); }

.mt-auto { margin-top: auto; }
.mb-3 { margin-bottom: 1.5rem; }
.btn-home { color: var(--text-muted); }

/* Content Area */
.dashboard-content {
  flex: 1; padding: 40px; overflow-y: auto; max-height: 80vh;
}
.dashboard-content::-webkit-scrollbar { width: 6px; }
.dashboard-content::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

/* Table */
.table-container {
  overflow-x: auto; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);
}

.data-table {
  width: 100%; border-collapse: collapse; min-width: 700px;
}

.data-table th, .data-table td {
  padding: 15px 20px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.05);
}

.data-table th { color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px;}

.role-badge {
  padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; text-transform: uppercase;
}
.role-badge.user { background: rgba(148, 163, 184, 0.15); color: #cbd5e1; }
.role-badge.staff { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
.role-badge.admin { background: rgba(239, 68, 68, 0.15); color: #ef4444; }

.action-btn { background: rgba(255,255,255,0.1); border:none; padding: 8px; border-radius:8px; margin-right:5px; cursor: pointer; transition: 0.2s;}
.action-btn:hover { transform: scale(1.1); background: rgba(255,255,255,0.2) }

/* Mini avatar */
.d-flex { display: flex; }
.align-items-center { align-items: center; }
.gap-2 { gap: 10px; }
.mini-avatar { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; }
.mini-avatar-text { width: 32px; height: 32px; border-radius: 50%; background: var(--primary); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:0.9rem;}
.text-success { color: #10b981; }

/* Tickets */
.tickets-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;
}

.glass-panel { background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; }
.ticket-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;}
.ticket-id { font-family: monospace; font-size: 1.1rem; color: var(--primary-light);}

.badge { padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; }
.badge-waiting { background: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3);}
.badge-active { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3);}

.ticket-body p { margin: 5px 0; color: var(--text-main); }
.pt-3 { padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); margin-top:15px; }

.empty-state { grid-column: 1 / -1; text-align: center; padding: 50px; color: var(--text-muted); background: rgba(0,0,0,0.2); border-radius: 12px; }

@keyframes slideUp { from { opacity:0; transform: translateY(20px); } to { opacity: 1; transform:translateY(0); } }
.animate-slide-up { animation: slideUp 0.5s ease-out forwards; }
@keyframes fade { from { opacity: 0; } to { opacity: 1; } }
.animate-fade-in { animation: fade 0.4s ease forwards; }
</style>
