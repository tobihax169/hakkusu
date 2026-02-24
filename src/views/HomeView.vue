<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const isScrolled = ref(false)
const { userName, clearAuth } = useAuth()

const handleLogout = () => {
  clearAuth()
  router.push('/')
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20
  })
})
</script>

<template>
  <div class="app-wrapper">
    <header :class="{ 'glass': isScrolled }">
      <div class="container header-content">
        <!-- Logo bên trái, bấm vào về trang chủ -->
        <a href="/" class="logo-text">Premium<span>Web</span></a>
        
          <!-- Các liên kết và nút bên phải -->
        <div class="header-right">
          <nav class="desktop-nav">
            <a href="#services">Dịch vụ</a>
            <a href="#portfolio">Dự án</a>
            <a href="#pricing">Bảng giá</a>
            <a href="#about">Về chúng tôi</a>
          </nav>
          
          <div class="auth-buttons desktop-nav">
            <template v-if="userName">
              <router-link to="/profile" class="btn-text">
                Xin chào, <strong style="color: #6366f1;">{{ userName }}</strong>
              </router-link>
              <a href="#" @click.prevent="handleLogout" class="btn-primary btn-small" style="background: rgba(239, 68, 68, 0.8);">Đăng xuất</a>
            </template>
            <template v-else>
              <router-link to="/login" class="btn-text">Đăng nhập</router-link>
              <router-link to="/register" class="btn-primary btn-small">Đăng ký</router-link>
            </template>
          </div>
        </div>
      </div>
    </header>

    <main>
      <section class="hero animate-fade">
        <div class="container">
          <h1>Xây dựng Website <br/> Đẳng cấp & Hiện đại</h1>
          <p class="subtitle">
            Chúng tôi giúp bạn hiện thực hóa ý tưởng với những công nghệ web hàng đầu, 
            mang lại trải nghiệm người dùng tuyệt vời và giao diện tinh tế.
          </p>
          <div class="hero-actions">
            <a href="#portfolio" class="btn-primary">Xem dự án</a>
            <a href="#about" class="btn-secondary">Tìm hiểu thêm</a>
          </div>
        </div>
      </section>

      <section id="services" class="features container">
        <div class="feature-card glass">
          <div class="icon">🚀</div>
          <h3>Hiệu năng cực cao</h3>
          <p>Tối ưu hóa tốc độ tải trang, mang lại trải nghiệm mượt mà nhất cho khách hàng của bạn.</p>
        </div>
        <div class="feature-card glass">
          <div class="icon">🎨</div>
          <h3>Thiết kế hiện đại</h3>
          <p>Giao diện đẹp mắt, chuẩn UX/UI và hoàn toàn tương thích với mọi thiết bị di động.</p>
        </div>
        <div class="feature-card glass">
          <div class="icon">🛠️</div>
          <h3>Dễ dàng tùy chỉnh</h3>
          <p>Mã nguồn sạch, dễ hiểu giúp bạn có thể tự do chỉnh sửa và mở rộng theo ý muốn.</p>
        </div>
      </section>
    </main>

    <footer class="container">
      <p>&copy; 2026 Hakkusu.</p>
    </footer>
  </div>
</template>

<style scoped>
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -1px;
  text-decoration: none;
  color: var(--text-main);
  transition: transform 0.3s ease;
}

.logo-text:hover {
  transform: scale(1.05);
}

.logo-text span {
  color: var(--primary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.desktop-nav {
  display: flex;
  gap: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.btn-secondary {
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 99px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
}

.auth-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 1rem;
  padding-left: 1.5rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-text {
  color: var(--text-main);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.btn-text:hover {
  color: var(--primary);
}

.btn-small {
  padding: 0.5rem 1.2rem;
  font-size: 0.9rem;
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

footer {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-muted);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  margin-top: 4rem;
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  .header-right {
    gap: 1rem;
  }
}
</style>
