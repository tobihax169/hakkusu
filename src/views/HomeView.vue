<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useI18n } from 'vue-i18n'
import { useAnnouncement } from '../composables/useAnnouncement'

const router = useRouter()
const isScrolled = ref(false)
const { userName, role } = useAuth()
const { t, locale } = useI18n()
const { announcementText } = useAnnouncement()

const toggleLang = () => {
  locale.value = locale.value === 'vi' ? 'en' : 'vi'
  localStorage.setItem('lang', locale.value)
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
            <a href="#services">{{ $t('nav.services') }}</a>
            <a href="#pricing">{{ $t('nav.pricing') }}</a>
          </nav>
          
          <!-- Auth -->
          <div class="auth-buttons">
            <template v-if="userName">
              <router-link v-if="role === 'admin' || role === 'staff'" to="/dashboard" class="btn-text" style="display: flex; align-items: center; gap: 4px;">
                <span class="material-symbols-outlined" style="font-size: 1.2rem;">settings</span> {{ $t('nav.admin') }}
              </router-link>
              <router-link to="/profile" class="avatar-circle" :title="$t('nav.profile')">
                <span class="material-symbols-outlined">person</span>
              </router-link>
            </template>
            <template v-else>
              <router-link to="/login" class="btn-primary rounded-pill btn-glow px-4">{{ $t('nav.login') }}</router-link>
            </template>
            <!-- Lang Switch -->
            <div class="lang-switch ms-3" @click="toggleLang">
              {{ locale === 'vi' ? '🇻🇳' : '🇺🇸' }}
            </div>
          </div>
        </div>
      </div>
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
                <a href="#services" class="btn-action rounded-pill btn-glow">
                  {{ $t('hero.btn_explore') }} <span class="material-symbols-outlined arrow">arrow_forward</span>
                </a>
            </template>
            <template v-else>
               <router-link to="/login" class="btn-action rounded-pill btn-glow">
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

    <footer class="container">
      <p>&copy; 2026 Hakkusu. All Rights Reserved.</p>
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
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: 15px;
  user-select: none;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
}
.lang-switch:hover {
  transform: scale(1.1);
}
/* 2. Header Styles */
header {
  position: fixed;
  top: 0; width: 100%;
  z-index: 100;
  transition: background 0.3s;
}
header.glass {
  background: rgba(11, 17, 32, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.2rem 8%;
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
}
.desktop-nav a:hover { color: #38bdf8; }

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

footer {
  text-align: center;
  padding: 3rem 0;
  color: #64748b;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  z-index: 10;
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
  .hero-actions { justify-content: center; }
}
</style>
