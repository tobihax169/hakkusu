<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useI18n } from 'vue-i18n'
import { useAnnouncement } from '../composables/useAnnouncement'

const router = useRouter()
const isScrolled = ref(false)
const { userName, role, token } = useAuth()
const { t, locale } = useI18n()
const announcementText = useAnnouncement().announcementText
const userBalance = ref(null)
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const toggleLang = () => {
  locale.value = locale.value === 'vi' ? 'en' : 'vi'
  localStorage.setItem('lang', locale.value)
}

const fetchBalance = async () => {
  if (!token.value) return;
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${token.value}` }
    });
    const data = await res.json();
    if (data.success && data.user) {
      userBalance.value = data.user.balance;
    }
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20
    
    // Parallax effect cho đám mây
    const cloud = document.querySelector('.floating-illustration')
    if (cloud) {
      cloud.style.transform = `translateY(${window.scrollY * 0.2}px)`
    }
  })
  fetchBalance()
})
</script>

<template>
  <div class="app-wrapper">
    <header :class="{ 'glass': isScrolled }">
      <div class="header-content">
        <!-- Logo -->
        <a href="/" class="logo-text">
          <img src="/logo.png" alt="Hakkusu Logo" class="brand-logo" />
          Hakkusu
        </a>
        
        <!-- Right Section -->
        <div class="header-right">
          <!-- Nav -->
          <nav class="desktop-nav">
            <a href="#about">{{ $t('nav.about') }}</a>
            <a href="#team">{{ $t('nav.team') }}</a>
            <router-link to="/services">{{ $t('nav.services') }}</router-link>
            <a href="#pricing">{{ $t('nav.pricing') }}</a>
          </nav>
          
          <!-- Auth -->
          <div class="auth-buttons">
            <template v-if="userName">
              <router-link v-if="role === 'admin' || role === 'staff'" to="/dashboard" class="btn-text">
                <span class="material-symbols-outlined" style="font-size: 1.2rem; vertical-align: middle;">settings</span> <span style="vertical-align: middle;">{{ $t('nav.admin') }}</span>
              </router-link>
              <router-link to="/profile" class="balance-badge" v-if="userBalance !== null" title="Nạp tiền">
                <span>{{ userBalance.toLocaleString('vi-VN') }}đ</span>
                <span class="material-symbols-outlined plus-icon">add_circle</span>
              </router-link>
              <router-link to="/profile" class="avatar-circle" :title="$t('nav.profile')">
                <span class="material-symbols-outlined">person</span>
              </router-link>
            </template>
            <template v-else>
              <router-link to="/auth/login" class="btn-primary rounded-pill btn-glow btn-pulse px-4">{{ $t('nav.login') }}</router-link>
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
            <a href="#about" @click="isMobileMenuOpen = false">{{ $t('nav.about') }}</a>
            <a href="#team" @click="isMobileMenuOpen = false">{{ $t('nav.team') }}</a>
            <router-link to="/services" @click="isMobileMenuOpen = false">{{ $t('nav.services') }}</router-link>
            <a href="#pricing" @click="isMobileMenuOpen = false">{{ $t('nav.pricing') }}</a>
          </nav>
        </div>
      </transition>
    </header>

    <!-- Marquee Announcement Bar -->
    <div v-if="announcementText" class="marquee-bar bg-glass">
      <div class="marquee-content">
        <span class="material-symbols-outlined marquee-icon">campaign</span>
        <strong>{{ announcementText }}</strong>
      </div>
    </div>

    <main>
      <!-- Hero Section -->
      <section class="hero-split container">
        <!-- Left Side: Text -->
        <div class="hero-left animate-fade-up">
          <h1 class="cyan-text">{{ $t('hero.title1') }}</h1>
          <h1 class="blue-text">{{ $t('hero.title2') }}</h1>
          <p class="subtitle mt-4">{{ $t('hero.subtitle') }}</p>
          <p class="subtitle-small">{{ $t('hero.subtext') }}</p>
          
          <div class="hero-actions mt-5">
            <template v-if="userName">
                <router-link to="/services" class="btn-action rounded-pill btn-glow">
                  {{ $t('hero.btn_explore') }} <span class="material-symbols-outlined arrow">arrow_forward</span>
                </router-link>
            </template>
            <template v-else>
               <router-link to="/auth/login" class="btn-action rounded-pill btn-glow">
                 {{ $t('hero.btn_login') }} <span class="material-symbols-outlined arrow">arrow_forward</span>
               </router-link>
            </template>
          </div>
        </div>
        
        <!-- Right Side: Floating Isometric Art -->
        <div class="hero-right">
          <div class="floating-illustration">
             <!-- An inline SVG graphic representing an isometric cloud and server node to match the prompt's aesthetic -->
             <svg width="100%" height="auto" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
                <!-- Glowing Server Base -->
                <path d="M 100 250 L 250 170 L 400 250 L 250 330 Z" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" stroke-width="2" />
                <path d="M 100 250 L 100 270 L 250 350 L 250 330 Z" fill="rgba(30, 64, 175, 0.6)" stroke="#3b82f6" stroke-width="1" />
                <path d="M 400 250 L 400 270 L 250 350 L 250 330 Z" fill="rgba(30, 58, 138, 0.4)" stroke="#3b82f6" stroke-width="1" />
                
                <!-- Database Cylinders -->
                <ellipse cx="180" cy="200" rx="30" ry="15" fill="#ec4899" />
                <path d="M 150 200 L 150 230 A 30 15 0 0 0 210 230 L 210 200 Z" fill="#be185d" />
                <ellipse cx="180" cy="230" rx="30" ry="15" fill="none" stroke="#ec4899" stroke-width="2" />
                
                <!-- Cloud Node -->
                <g transform="translate(250, 100)">
                    <ellipse cx="0" cy="0" rx="70" ry="40" fill="url(#cloudGrad)" filter="drop-shadow(0 10px 15px rgba(6,182,212,0.4))" />
                    <ellipse cx="-30" cy="-20" rx="40" ry="30" fill="url(#cloudGrad)" />
                    <ellipse cx="30" cy="-10" rx="35" ry="25" fill="url(#cloudGrad)" />
                    <!-- Arrows in cloud -->
                    <path d="M -15 5 L 15 5 L 5 -5 M 15 5 L 5 15" stroke="#fff" stroke-width="3" fill="none" transform="rotate(-30) scale(0.8)"  />
                    <path d="M 15 5 L -15 5 L -5 -5 M -15 5 L -5 15" stroke="#ec4899" stroke-width="3" fill="none" transform="rotate(30) translate(0, 10) scale(0.8)"  />
                </g>

                <!-- Data Lines -->
                <path d="M 250 140 L 250 210 L 180 250" stroke="#06b6d4" stroke-width="3" fill="none" stroke-dasharray="5,5" class="data-flow"/>
                <path d="M 320 200 L 320 280 M 315 270 L 320 280 L 325 270" stroke="#ec4899" stroke-width="3" fill="none" class="data-flow-fast"/>

                <defs>
                  <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#3b82f6" />
                    <stop offset="100%" stop-color="#06b6d4" />
                  </linearGradient>
                </defs>
             </svg>
          </div>
        </div>
      </section>

      <!-- Services -->
      <section id="services" class="features container mt-5">
        <div class="feature-card glass">
          <div class="icon"><span class="material-symbols-outlined" style="font-size: inherit;">smart_toy</span></div>
          <h3>{{ $t('services.bot_title') }}</h3>
          <p>{{ $t('services.bot_desc') }}</p>
        </div>
        <div class="feature-card glass">
          <div class="icon"><span class="material-symbols-outlined" style="font-size: inherit;">build</span></div>
          <h3>{{ $t('services.setup_title') }}</h3>
          <p>{{ $t('services.setup_desc') }}</p>
        </div>
        <div class="feature-card glass">
          <div class="icon"><span class="material-symbols-outlined" style="font-size: inherit;">dns</span></div>
          <h3>{{ $t('services.mc_title') }}</h3>
          <p>{{ $t('services.mc_desc') }}</p>
        </div>
      </section>
    </main>

    <!-- Floating Lang Switch at Bottom Left -->
    <div class="floating-lang-switch" @click="toggleLang" title="Change Language">
      <span>{{ locale === 'vi' ? '🇻🇳' : '🇺🇸' }}</span>
      <span class="lang-text">{{ locale === 'vi' ? 'VI' : 'EN' }}</span>
    </div>

    <footer class="modern-footer">
      <div class="container footer-content">
        <!-- Brand / Intro -->
        <div class="footer-brand animate-fade-up">
          <a href="/" class="logo-text">
            <img src="/logo.png" alt="Hakkusu Logo" class="brand-logo" />
            Hakkusu
          </a>
          <p class="footer-desc mt-3">Cung cấp giải pháp toàn diện về thiết lập Server Discord chuyên nghiệp, lập trình Bot Discord theo yêu cầu và xây dựng Server Minecraft đỉnh cao.</p>
          <div class="social-links mt-4">
            <a href="#" class="social-icon" title="Discord"><span class="material-symbols-outlined">forum</span></a>
            <a href="#" class="social-icon" title="Facebook"><span class="material-symbols-outlined">thumb_up</span></a>
            <a href="#" class="social-icon" title="YouTube"><span class="material-symbols-outlined">smart_display</span></a>
          </div>
        </div>

        <!-- Links Group 1 -->
        <div class="footer-links animate-fade-up" style="animation-delay: 0.1s">
          <h4>Về chúng tôi</h4>
          <ul>
            <li><a href="#about">Giới thiệu</a></li>
            <li><a href="#team">Đội ngũ</a></li>
            <li><router-link to="/services">Dịch vụ</router-link></li>
            <li><a href="#pricing">Bảng giá</a></li>
          </ul>
        </div>

        <!-- Links Group 2 -->
        <div class="footer-links animate-fade-up" style="animation-delay: 0.2s">
          <h4>Hỗ trợ</h4>
          <ul>
            <li><a href="#">Trung tâm trợ giúp</a></li>
            <li><a href="#">Điều khoản dịch vụ</a></li>
            <li><a href="#">Chính sách bảo mật</a></li>
            <li><a href="#">Liên hệ</a></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="footer-newsletter animate-fade-up" style="animation-delay: 0.3s">
          <h4>Đăng ký nhận tin</h4>
          <p>Nhận các ưu đãi mới nhất và thông tin cập nhật từ Hakkusu.</p>
          <form class="newsletter-form mt-3" @submit.prevent>
            <input type="email" placeholder="Email của bạn..." required />
            <button type="submit" class="btn-glow"><span class="material-symbols-outlined">send</span></button>
          </form>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2026 Hakkusu. Coded with <span class="material-symbols-outlined text-danger" style="font-size: 1rem; vertical-align: middle;">favorite</span> and <span class="material-symbols-outlined text-info" style="font-size: 1rem; vertical-align: middle;">coffee</span>.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Marquee Bar */
.marquee-bar {
  width: 100%;
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  color: var(--text-main);
  padding: 8px 0;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  z-index: 90;
  margin-top: 80px; /* offset for header */
}

.marquee-content {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  animation: marquee-scroll 25s linear infinite;
}

.marquee-icon {
  color: #fbbf24;
}

@keyframes marquee-scroll {
  0% { transform: translateX(100vw); }
  100% { transform: translateX(-100%); }
}

.lang-switch {
  display: none;
}
/* 2. Header Styles */
header {
  position: fixed;
  top: 15px; 
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  max-width: 1200px;
  z-index: 100;
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
  transition: color 0.3s;
  position: relative;
  padding: 5px 0;
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
.desktop-nav a:hover { color: #fff; }
.desktop-nav a:hover::after { width: 100%; }

.auth-buttons {
  display: flex;
  align-items: center;
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
  color: white;
}

.btn-text {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  margin-right: 20px;
}
.btn-text:hover { color: #38bdf8; }

.rounded-pill {
  border-radius: 9999px;
}
.px-4 {
  padding: 8px 20px;
}

.btn-glow {
  background: linear-gradient(90deg, #0ea5e9, #3b82f6);
  border: none;
  color: white;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
  transition: all 0.3s ease;
}
.btn-glow:hover {
  box-shadow: 0 6px 20px rgba(14, 165, 233, 0.6);
  transform: translateY(-2px);
}

/* Shine button */
.btn-pulse {
  position: relative;
  overflow: hidden;
}
.btn-pulse::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
  transform: rotate(30deg) translateX(-100%);
  animation: shine 3s infinite;
}
@keyframes shine {
  0% { transform: rotate(30deg) translateX(-100%); }
  15%, 100% { transform: rotate(30deg) translateX(100%); }
}

/* Floating Lang Switch */
.floating-lang-switch {
  position: fixed;
  bottom: 30px;
  left: 30px;
  background: rgba(30, 41, 59, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 16px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  z-index: 9999; /* Below chat widget 10000 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.floating-lang-switch:hover {
  transform: translateY(-5px);
  background: rgba(56, 189, 248, 0.2);
  border-color: rgba(56, 189, 248, 0.4);
  box-shadow: 0 8px 25px rgba(56, 189, 248, 0.3);
}

.floating-lang-switch span:first-child {
  font-size: 1.2rem;
}

.lang-text {
  font-weight: 700;
  font-size: 0.9rem;
  color: #f8fafc;
}

/* Balance Badge */
.balance-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  padding: 6px 14px;
  border-radius: 20px;
  color: #10b981 !important;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  margin-right: 15px;
  transition: all 0.3s;
}
.balance-badge:hover {
  background: rgba(16, 185, 129, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}
.plus-icon {
  font-size: 1.1rem;
}

/* 3. Hero Split Layout */
.hero-split {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: calc(100vh - 100px);
  padding: 120px 0 40px 0;
  gap: 40px;
  position: relative;
  z-index: 10;
}

.hero-left {
  flex: 1;
  max-width: 600px;
}

.cyan-text {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin: 0;
  color: #22d3ee;
}
.blue-text {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin: 0;
  color: #3b82f6;
  margin-bottom: 20px;
}

.subtitle {
  color: #fff;
  font-size: 1.1rem;
  line-height: 1.6;
  font-weight: 500;
}

.subtitle-small {
  color: #94a3b8;
  font-size: 0.95rem;
  margin-top: 10px;
}
.mt-4 { margin-top: 1.5rem; }
.mt-5 { margin-top: 3rem; }

.btn-action {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(90deg, #ec4899, #be185d);
  padding: 12px 28px;
  font-size: 1rem;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);
}
.btn-action:hover {
  background: linear-gradient(90deg, #f472b6, #db2777);
  box-shadow: 0 6px 20px rgba(236, 72, 153, 0.6);
  transform: translateY(-2px);
  color: white;
}
.arrow {
  margin-left: 10px;
  font-size: 0.8rem;
}

/* Right Illustration */
.hero-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.floating-illustration {
  width: 100%;
  max-width: 500px;
  animation: hover-bob 4s ease-in-out infinite;
  transition: transform 0.1s linear; /* Smooth parallax */
  will-change: transform;
}

@keyframes hover-bob {
  0% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
  100% { transform: translateY(0); }
}

.data-flow {
  stroke-dashoffset: 100;
  animation: dash 2s linear infinite;
}
.data-flow-fast {
  animation: slideDown 1.5s linear infinite;
}

@keyframes dash {
  to { stroke-dashoffset: 0; }
}
@keyframes slideDown {
  0% { transform: translateY(-10px); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(20px); opacity: 0; }
}

/* Animations */
.animate-fade-up {
  animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Services */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding-bottom: 80px;
  position: relative;
  z-index: 10;
}
.feature-card {
  padding: 40px 30px;
  border-radius: 20px;
  transition: transform 0.3s ease, background 0.3s;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(255,255,255,0.05);
  backdrop-filter: blur(10px);
}
.feature-card:hover {
  transform: translateY(-10px);
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(56, 189, 248, 0.5);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.icon {
  font-size: 3rem;
  margin-bottom: 20px;
  background: -webkit-linear-gradient(90deg, #38bdf8, #818cf8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}
.feature-card h3 {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #f8fafc;
}
.feature-card p {
  color: #94a3b8;
  line-height: 1.6;
}

/* Modern Footer */
.modern-footer {
  margin-top: 5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: radial-gradient(ellipse at bottom, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0) 100%);
  position: relative;
  z-index: 10;
  padding-top: 4rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.footer-brand .logo-text {
  font-size: 1.5rem;
}

.footer-desc {
  color: #94a3b8;
  line-height: 1.6;
  font-size: 0.95rem;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.social-icon:hover {
  background: linear-gradient(135deg, #0ea5e9, #3b82f6);
  color: #fff;
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 5px 15px rgba(14, 165, 233, 0.4);
}

.footer-links h4, .footer-newsletter h4 {
  font-size: 1.1rem;
  color: #f8fafc;
  margin-bottom: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.8rem;
}

.footer-links a {
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.2s;
  display: inline-block;
}

.footer-links a:hover {
  color: #38bdf8;
  transform: translateX(5px);
}

.footer-newsletter p {
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.5;
}

.newsletter-form {
  display: flex;
  gap: 10px;
}

.newsletter-form input {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 10px 15px;
  color: #fff;
  outline: none;
  transition: all 0.3s;
}

.newsletter-form input:focus {
  border-color: #38bdf8;
  background: rgba(255, 255, 255, 0.1);
}

.newsletter-form button {
  padding: 10px 15px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
}

.footer-bottom {
  text-align: center;
  padding: 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  color: #64748b;
  font-size: 0.9rem;
}

/* Mobile Hamburger Menu Styles */
.hamburger-btn {
  display: none;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 5px;
  margin-left: 15px;
}

.mobile-dropdown {
  position: absolute;
  top: calc(100% + 15px);
  left: 0;
  width: 100%;
  background: rgba(11, 17, 32, 0.95);
  backdrop-filter: blur(15px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
}

.mobile-nav a {
  padding: 16px 25px;
  color: #f8fafc;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.05rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.mobile-nav a:hover, .mobile-nav a:active {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  padding-left: 32px;
}

.mobile-nav a:last-child {
  border-bottom: none;
}

.mobile-menu-slide-enter-active,
.mobile-menu-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: top;
}
.mobile-menu-slide-enter-from,
.mobile-menu-slide-leave-to {
  opacity: 0;
  transform: scaleY(0);
}

@media (max-width: 992px) {
  .hero-split {
    flex-direction: column;
    text-align: center;
    padding-top: 120px;
  }
  .cyan-text, .blue-text { font-size: 3rem; }
  .floating-illustration { margin-top: 40px; }
  .desktop-nav { display: none; }
  .hamburger-btn { display: block; }
  .hero-actions { justify-content: center; }
  .footer-content {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 576px) {
  .floating-lang-switch {
    bottom: 20px;
    left: 20px;
    padding: 8px 12px;
  }
  .lang-text {
    font-size: 0.8rem;
  }
  .header-content {
    padding: 1rem 4%;
  }
  .header-right {
    gap: 1rem;
  }
  .btn-text {
    display: none !important; /* Hide admin text on very small screens, keep only avatar */
  }
  .avatar-circle {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
  .lang-switch {
    font-size: 1.2rem;
    margin-left: 5px;
  }
  .logo-text {
    font-size: 1.2rem;
  }
  .brand-logo {
    height: 30px;
  }
  .marquee-bar {
    font-size: 0.85rem;
  }
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .social-links {
    justify-content: center;
  }
}
</style>
