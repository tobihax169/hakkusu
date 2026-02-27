<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import BalanceBadge from './BalanceBadge.vue'

const router = useRouter()
const route = useRoute()
const isScrolled = ref(false)
const { userName, role } = useAuth()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20
  })
})
</script>

<template>
  <header :class="{ 'glass': isScrolled || isMobileMenuOpen }">
    <div class="header-content">
      <!-- Logo -->
      <router-link to="/" class="logo-text">
        <img src="/logo.png" alt="Hakkusu Logo" class="brand-logo" />
        Hakkusu
      </router-link>
      
      <!-- Right Section -->
      <div class="header-right">
        <!-- Nav -->
        <nav class="desktop-nav">
           <router-link to="/" :class="{ active: route.path === '/' }">Trang chủ</router-link>
           <router-link to="/about" :class="{ active: route.path === '/about' }">Giới thiệu</router-link>
           <router-link to="/services" :class="{ active: route.path === '/services' }">Dịch vụ</router-link>
           <router-link to="/pricing" :class="{ active: route.path === '/pricing' }">Bảng giá</router-link>
        </nav>
        
        <!-- Auth -->
        <div class="auth-buttons">
          <template v-if="userName">
            <router-link v-if="role === 'admin' || role === 'staff'" to="/dashboard" class="btn-text">
              <span class="material-symbols-outlined" style="font-size: 1.2rem; vertical-align: middle;">settings</span> <span class="hide-mobile" style="vertical-align: middle; margin-left: 5px;">Quản trị</span>
            </router-link>
            <BalanceBadge />
            <router-link to="/profile" class="avatar-circle" title="Tài khoản">
              <span class="material-symbols-outlined">person</span>
            </router-link>
          </template>
          <template v-else>
            <router-link to="/auth/login" class="btn-primary rounded-pill btn-glow btn-pulse px-4">Đăng nhập</router-link>
          </template>
        </div>
        
        <!-- Hamburger Button (Mobile) -->
        <button class="hamburger-btn" @click="toggleMobileMenu">
          <span class="material-symbols-outlined">{{ isMobileMenuOpen ? 'close' : 'menu' }}</span>
        </button>
      </div>
    </div>

    <!-- Mobile Nav Dropdown -->
    <transition name="mobile-menu-slide">
      <div v-if="isMobileMenuOpen" class="mobile-dropdown">
         <nav class="mobile-nav">
            <router-link to="/" @click="isMobileMenuOpen = false">Trang chủ</router-link>
            <router-link to="/about" @click="isMobileMenuOpen = false">Giới thiệu</router-link>
            <router-link to="/services" @click="isMobileMenuOpen = false">Dịch vụ</router-link>
            <router-link to="/pricing" @click="isMobileMenuOpen = false">Bảng giá</router-link>
         </nav>
      </div>
    </transition>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  max-width: 1200px;
  z-index: 1000;
  border-radius: 50px;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: rgba(11, 17, 32, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

header.glass {
  background: rgba(11, 17, 32, 0.85);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 90%;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.8rem 2.5rem;
}

.logo-text {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -1px;
  text-decoration: none;
  color: #fff;
}

.brand-logo {
  height: 40px;
  width: auto;
  border-radius: 8px;
  object-fit: contain;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.desktop-nav {
  display: flex;
  gap: 2.5rem;
}

.desktop-nav a {
  color: #cbd5e1;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s;
  position: relative;
  padding: 5px 0;
}

.desktop-nav a.active {
  color: #38bdf8;
}

.desktop-nav a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #38bdf8;
  transition: width 0.3s ease;
}

.desktop-nav a:hover, .desktop-nav a.active {
  color: #fff;
}

.desktop-nav a:hover::after, .desktop-nav a.active::after {
  width: 100%;
}

.auth-buttons {
  display: flex;
  align-items: center;
}

.btn-text {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.btn-text:hover {
  color: #38bdf8;
}

.avatar-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0ea5e9, #3b82f6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  text-decoration: none;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(14, 165, 233, 0.3);
}

.avatar-circle:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(14, 165, 233, 0.6);
}

.hamburger-btn {
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
}

.mobile-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  margin-top: 10px;
  border-radius: 20px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.mobile-nav a {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 10px;
  border-radius: 10px;
  transition: background 0.2s;
}

.mobile-nav a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.mobile-menu-slide-enter-active, .mobile-menu-slide-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-slide-enter-from, .mobile-menu-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 992px) {
  .hamburger-btn {
    display: block;
  }
  .desktop-nav {
    display: none;
  }
  .header-right {
    gap: 1.5rem;
  }
}

@media (max-width: 576px) {
  .header-content {
    padding: 0.8rem 1.5rem;
  }
  .hide-mobile {
    display: none;
  }
  .btn-text {
    margin-right: 15px;
  }
}
</style>
