<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { userName, role } = useAuth()
const { t } = useI18n()

// Handle opening chat / support
const handleContact = () => {
  if (!userName.value) {
    router.push('/auth/login')
  } else {
    window.dispatchEvent(new CustomEvent('open-chat'))
  }
}

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="services-page app-wrapper">
    <!-- Navbar (Basic clone from Home for standalone page, but with back link) -->
    <header>
      <div class="header-content">
        <router-link to="/" class="logo-text">
          <img src="/logo.png" alt="Hakkusu Logo" class="brand-logo" />
          Hakkusu
        </router-link>
        <div class="header-right">
          <nav class="desktop-nav">
             <router-link to="/">Trang chủ</router-link>
             <router-link to="/services" class="active">Dịch vụ</router-link>
          </nav>
          <div class="auth-buttons">
            <template v-if="userName">
              <router-link to="/dashboard" class="btn-primary btn-pulse" v-if="role === 'admin' || role === 'staff'">Mở Panel</router-link>
              <router-link to="/profile" class="btn-primary" v-else>Client Panel</router-link>
            </template>
            <template v-else>
              <router-link to="/auth/login" class="btn-primary btn-pulse">Đăng nhập</router-link>
            </template>
          </div>
        </div>
      </div>
    </header>

    <main class="services-content">
      <!-- Page Header -->
      <section class="page-hero text-center container">
        <div class="animate-fade-up">
          <span class="badge text-uppercase tracking-widest text-cyan mb-3">Premium Solutions</span>
          <h1 class="gradient-text blue-cyan-gradient title-huge">Khám Phá Dịch Vụ Của Hakkusu</h1>
          <p class="subtitle mt-3">Chúng tôi cung cấp các giải pháp tối ưu và chuyên nghiệp nhất cho Server Discord & Minecraft của bạn.</p>
        </div>
      </section>

      <!-- Services List -->
      <section class="container mt-5 pt-3">
        <!-- Service 1: Discord Bot -->
        <div class="service-row">
          <div class="s-info animate-fade-in-left">
            <div class="s-icon-box"><span class="material-symbols-outlined">smart_toy</span></div>
            <h2>Lập Trình Bot Discord Theo Yêu Cầu</h2>
            <p>Sở hữu một chú Bot Discord mang đậm dấu ấn riêng của Server bạn. Từ tính năng quản lý, minigame, nền kinh tế (Economy), cho tới các hệ thống phức tạp như liên kết API bên ngoài.</p>
            <ul class="feature-list">
              <li><span class="material-symbols-outlined text-success">check_circle</span> Code tối ưu bằng Node.js / Python mới nhất.</li>
              <li><span class="material-symbols-outlined text-success">check_circle</span> Hỗ trợ Slash Commands & UI Component hiện đại.</li>
              <li><span class="material-symbols-outlined text-success">check_circle</span> Tích hợp Database MongoDB / MySQL bảo mật.</li>
            </ul>
            <div class="mt-4">
              <span class="price-tag">Chỉ từ 200.000đ</span>
              <button @click="handleContact" class="btn-glow btn-action ml-3">Nhận Tư Vấn <span class="material-symbols-outlined arr">arrow_forward</span></button>
            </div>
          </div>
          <div class="s-image animate-fade-in-right">
             <div class="mockup-card glass text-center">
                <span class="material-symbols-outlined bot-avatar">robot_2</span>
                <div class="chat-bubble">Xin chào! Tôi có thể giúp gì cho Server?</div>
                <div class="chat-bubble right">/ban @user spam</div>
             </div>
          </div>
        </div>

        <!-- Service 2: Discord Setup -->
        <div class="service-row row-reverse mt-5 pt-5">
          <div class="s-info animate-fade-in-right">
            <div class="s-icon-box purple"><span class="material-symbols-outlined">build</span></div>
            <h2>Setup & Trang Trí Server Discord</h2>
            <p>Hô biến một server trống trơn thành một cộng đồng chuyên nghiệp, an toàn, với cấu trúc kênh khoa học, phân quyền rõ ràng, hệ thống Roles và Emojis đẹp mắt.</p>
            <ul class="feature-list">
              <li><span class="material-symbols-outlined text-purple">check_circle</span> Thiết lập Rule, Auto-Mod tự động chống Spam/Raid.</li>
              <li><span class="material-symbols-outlined text-purple">check_circle</span> Hệ thống Ticket, Verify, Leveling.</li>
              <li><span class="material-symbols-outlined text-purple">check_circle</span> Thiết kế Banner, Icon, Emojis độc quyền.</li>
            </ul>
             <div class="mt-4">
              <span class="price-tag purple-tag">Chỉ từ 150.000đ</span>
              <button @click="handleContact" class="btn-glow btn-action ml-3 btn-purple">Liên Hệ Ngay <span class="material-symbols-outlined arr">arrow_forward</span></button>
            </div>
          </div>
          <div class="s-image animate-fade-in-left">
             <div class="mockup-card glass server-mockup">
                <div class="sidebar"></div>
                <div class="channel-list">
                   <div class="ch text-success"># 📜・luật-lệ</div>
                   <div class="ch"># 💬・trò-chuyện</div>
                   <div class="ch text-warning"># 🎵・âm-nhạc</div>
                </div>
                <div class="main-chat">
                   <div class="line"></div>
                   <div class="line short"></div>
                </div>
             </div>
          </div>
        </div>

        <!-- Service 3: Minecraft Setup -->
        <div class="service-row mt-5 pt-5 pb-5">
          <div class="s-info animate-fade-in-left">
            <div class="s-icon-box orange"><span class="material-symbols-outlined">dns</span></div>
            <h2>Xây Dựng Server Minecraft</h2>
            <p>Thiết lập mạng lưới BungeeCord xịn xò, các thể loại Towny, Skyblock, hay RPG cực rạch ròi tỉ mỉ. Đảm bảo cấu hình không giật lag, tối ưu hóa Economy & Permission.</p>
            <ul class="feature-list">
              <li><span class="material-symbols-outlined text-orange">check_circle</span> Setup Plugin, việt hóa config.</li>
              <li><span class="material-symbols-outlined text-orange">check_circle</span> Xây Hub/Spawn, tạo NPC, Hologram.</li>
              <li><span class="material-symbols-outlined text-orange">check_circle</span> Tối ưu Paper/Purpur mới nhất.</li>
            </ul>
             <div class="mt-4">
              <span class="price-tag orange-tag">Chỉ từ 300.000đ</span>
              <button @click="handleContact" class="btn-glow btn-action ml-3 btn-orange">Yêu Cầu Báo Giá <span class="material-symbols-outlined arr">arrow_forward</span></button>
            </div>
          </div>
          <div class="s-image animate-fade-in-right">
             <div class="mockup-card glass mc-mockup">
                <div class="block-3d dirt"></div>
                <div class="block-3d grass"></div>
                <span class="material-symbols-outlined pickaxe">hardware</span>
             </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-section container">
         <div class="cta-box glass animate-scale-in">
            <h2>Bạn Cần Một Giải Pháp Tùy Chỉnh Khác?</h2>
            <p>Chúng tôi luôn sẵn sàng lắng nghe mọi ý tưởng của bạn và biến nó thành hiện thực với chi phí tối ưu nhất.</p>
            <button @click="handleContact" class="btn-glow btn-action cta-btn">Chat Với Chăm Sóc Khách Hàng</button>
         </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="modern-footer">
      <div class="container footer-content">
        <div class="footer-brand animate-fade-up">
          <a href="/" class="logo-text">
            <img src="/logo.png" alt="Hakkusu Logo" class="brand-logo" />
            Hakkusu
          </a>
          <p class="footer-desc mt-3">Cung cấp giải pháp toàn diện về thiết lập Server Discord chuyên nghiệp, lập trình Bot Discord theo yêu cầu và xây dựng Server Minecraft đỉnh cao.</p>
        </div>
        <div class="footer-links animate-fade-up" style="animation-delay: 0.1s">
          <h4>Về chúng tôi</h4>
          <ul>
            <li><router-link to="/">Trang chủ</router-link></li>
            <li><router-link to="/services">Dịch vụ</router-link></li>
          </ul>
        </div>
        <div class="footer-links animate-fade-up" style="animation-delay: 0.2s">
          <h4>Hỗ trợ</h4>
          <ul>
            <li><a href="#" @click.prevent="handleContact">Liên hệ</a></li>
            <li><a href="#">Điều khoản</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Hakkusu. Coded with <span class="material-symbols-outlined text-danger" style="font-size: 1rem; vertical-align: middle;">favorite</span>.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.services-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  position: fixed;
  top: 15px; 
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  max-width: 1200px;
  z-index: 100;
  border-radius: 50px;
  background: rgba(11, 17, 32, 0.85);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
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
.desktop-nav a:hover, .desktop-nav a.active { color: #fff; }
.desktop-nav a:hover::after, .desktop-nav a.active::after { width: 100%; }

.auth-buttons {
  display: flex;
  align-items: center;
}

/* Page content */
.page-hero {
  padding-top: 150px;
  padding-bottom: 40px;
}

.title-huge {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 10px;
}

.blue-cyan-gradient {
  background: -webkit-linear-gradient(0deg, #38bdf8, #818cf8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-cyan { color: #22d3ee; }
.tracking-widest { letter-spacing: 0.1em; }
.text-uppercase { text-transform: uppercase; font-weight: 700; }
.subtitle { color: #94a3b8; font-size: 1.1rem; max-width: 600px; margin: 0 auto; line-height: 1.6;}

/* Services Rows */
.service-row {
  display: flex;
  align-items: center;
  gap: 50px;
  margin-bottom: 40px;
}
.service-row.row-reverse {
  flex-direction: row-reverse;
}

.s-info, .s-image {
  flex: 1;
}

.s-info h2 {
  font-size: 2rem;
  color: #f8fafc;
  margin-bottom: 15px;
  font-weight: 700;
}
.s-info p {
  color: #94a3b8;
  line-height: 1.7;
  font-size: 1.05rem;
  margin-bottom: 20px;
}

.s-icon-box {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 20px;
  border: 1px solid rgba(56, 189, 248, 0.3);
}
.s-icon-box.purple { background: rgba(168, 85, 247, 0.15); color: #a855f7; border-color: rgba(168, 85, 247, 0.3); }
.s-icon-box.orange { background: rgba(249, 115, 22, 0.15); color: #f97316; border-color: rgba(249, 115, 22, 0.3); }

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.feature-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  color: #e2e8f0;
  font-weight: 500;
}

.text-success { color: #10b981; }
.text-purple { color: #a855f7; }
.text-orange { color: #f97316; }

.price-tag {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  font-weight: 700;
  border: 1px solid rgba(56, 189, 248, 0.3);
}
.price-tag.purple-tag { background: rgba(168, 85, 247, 0.1); color: #a855f7; border-color: rgba(168, 85, 247, 0.3); }
.price-tag.orange-tag { background: rgba(249, 115, 22, 0.1); color: #f97316; border-color: rgba(249, 115, 22, 0.3); }

/* Buttons */
.btn-action {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(90deg, #0ea5e9, #3b82f6);
  padding: 10px 24px;
  font-size: 1rem;
  border-radius: 24px;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
  transition: all 0.3s;
}
.btn-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(14, 165, 233, 0.6);
}
.btn-purple { background: linear-gradient(90deg, #a855f7, #c084fc); box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4); }
.btn-purple:hover { box-shadow: 0 6px 20px rgba(168, 85, 247, 0.6); }
.btn-orange { background: linear-gradient(90deg, #f97316, #fb923c); box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4); }
.btn-orange:hover { box-shadow: 0 6px 20px rgba(249, 115, 22, 0.6); }

.btn-primary {
  background: linear-gradient(90deg, #0ea5e9, #3b82f6);
  border: none;
  color: white;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  padding: 8px 20px;
}
.btn-primary:hover {
  box-shadow: 0 6px 20px rgba(14, 165, 233, 0.6);
  transform: translateY(-2px);
  color: white;
}

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

.ml-3 { margin-left: 1rem; }
.arr { font-size: 1rem; margin-left: 8px; }

/* Mockups */
.mockup-card {
  padding: 40px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(30, 41, 59, 0.3);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bot-avatar {
  font-size: 5rem;
  color: #38bdf8;
  margin-bottom: 20px;
  animation: float 3s ease-in-out infinite;
}

.chat-bubble {
  background: rgba(56, 189, 248, 0.2);
  color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
  border-bottom-left-radius: 0;
  margin-right: auto;
  margin-bottom: 10px;
  font-size: 0.95rem;
}
.chat-bubble.right {
  background: rgba(255, 255, 255, 0.1);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 0;
  margin-right: 0;
  margin-left: auto;
  border: 1px solid rgba(255,255,255,0.05);
}

.server-mockup {
  flex-direction: row;
  padding: 20px;
  align-items: stretch;
  gap: 15px;
}
.sidebar { width: 50px; background: rgba(0,0,0,0.3); border-radius: 12px; }
.channel-list { width: 120px; background: rgba(0,0,0,0.2); border-radius: 12px; padding: 15px 10px; display: flex; flex-direction: column; gap: 10px; }
.ch { font-size: 0.8rem; font-weight: bold; background: rgba(255,255,255,0.05); padding: 5px; border-radius: 5px; }
.main-chat { flex: 1; background: rgba(0,0,0,0.1); border-radius: 12px; padding: 20px; }
.line { height: 10px; background: rgba(255,255,255,0.1); border-radius: 5px; width: 100%; margin-bottom: 10px;}
.line.short { width: 60%; }

.mc-mockup {
  gap: 20px;
  flex-direction: row;
}

.block-3d {
  width: 60px;
  height: 60px;
  background: #4ade80;
  border-radius: 8px;
  box-shadow: inset -10px -10px 20px rgba(0,0,0,0.3), 5px 5px 15px rgba(0,0,0,0.4);
  transform: rotateX(45deg) rotateZ(45deg);
}
.block-3d.dirt { background: #8b5cf6; }
.pickaxe { font-size: 4rem; color: #f97316; transform: rotate(45deg); animation: mine 2s infinite ease-in-out; }

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

@keyframes mine {
  0% { transform: rotate(45deg); }
  50% { transform: rotate(0deg); }
  100% { transform: rotate(45deg); }
}

/* Utils */
.glass {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* CTA Box Details */
.cta-section {
  margin-bottom: 4rem;
  margin-top: 2rem;
}

.cta-box {
  padding: 3rem;
  border-radius: 24px;
  text-align: center;
}

.cta-box h2 {
  font-size: 2rem;
  color: white;
  margin-bottom: 15px;
  font-weight: 700;
}

.cta-box p {
  color: #94a3b8;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.cta-btn {
  padding: 14px 30px;
  font-size: 1.1rem;
  font-weight: 600;
}

/* Modern Footer Clone */
.modern-footer {
  margin-top: 5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: radial-gradient(ellipse at bottom, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0) 100%);
  padding-top: 4rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.footer-brand .logo-text { font-size: 1.5rem; }
.footer-desc { color: #94a3b8; line-height: 1.6; font-size: 0.95rem; }
.footer-links h4 { font-size: 1.1rem; color: #f8fafc; margin-bottom: 1.2rem; font-weight: 600; text-transform: uppercase;}
.footer-links ul { list-style: none; padding: 0; margin: 0; }
.footer-links li { margin-bottom: 0.8rem; }
.footer-links a { color: #94a3b8; text-decoration: none; transition: all 0.2s; }
.footer-links a:hover { color: #38bdf8; transform: translateX(5px); display: inline-block;}
.footer-bottom { text-align: center; padding: 2rem 0; border-top: 1px solid rgba(255, 255, 255, 0.05); color: #64748b; font-size: 0.9rem; }

/* Responsive */
@media (max-width: 992px) {
  .service-row, .service-row.row-reverse { flex-direction: column; text-align: center; }
  .s-icon-box { margin: 0 auto 20px; }
  .feature-list li { justify-content: center; }
  .title-huge { font-size: 2.5rem; }
}

@media (max-width: 576px) {
  .footer-content { grid-template-columns: 1fr; text-align: center; }
  .desktop-nav { display: none; }
  .btn-action span { display: none; }
  .ml-3 { margin-left: 0; margin-top: 10px; display: block;}
}

/* Animations */
.animate-fade-up { animation: fadeUp 0.8s ease forwards; }
.animate-fade-in-left { animation: fadeInLeft 0.8s ease forwards; opacity: 0;}
.animate-fade-in-right { animation: fadeInRight 0.8s ease forwards; opacity: 0;}
.animate-scale-in { animation: scaleIn 0.8s ease forwards; }

@keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
@keyframes fadeInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
</style>
