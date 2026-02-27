<script setup>
const handleContact = () => {
  window.dispatchEvent(new CustomEvent('open-chat'))
}
</script>

<template>
  <footer class="modern-footer">
    <div class="container footer-content">
      <div class="footer-grid">
        <!-- Brand / Intro -->
        <div class="footer-brand animate-fade-up">
          <router-link to="/" class="logo-text">
            <img src="/logo.png" alt="Hakkusu Logo" class="brand-logo" />
            Hakkusu
          </router-link>
          <p class="footer-desc mt-3">
            Cung cấp giải pháp toàn diện về thiết lập Server Discord chuyên nghiệp, 
            lập trình Bot Discord theo yêu cầu và xây dựng Server Minecraft đỉnh cao.
          </p>
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
            <li><a href="/" @click.prevent="() => { $router.push('/'); window.scrollTo(0,0); }">Trang chủ</a></li>
            <li><router-link to="/about">Giới thiệu</router-link></li>
            <li><router-link to="/services">Dịch vụ</router-link></li>
            <li><router-link to="/pricing">Bảng giá</router-link></li>
          </ul>
        </div>

        <!-- Links Group 2 -->
        <div class="footer-links animate-fade-up" style="animation-delay: 0.2s">
          <h4>Hỗ trợ</h4>
          <ul>
            <li><router-link to="/help">Trung tâm trợ giúp</router-link></li>
            <li><router-link to="/terms">Điều khoản dịch vụ</router-link></li>
            <li><router-link to="/privacy">Chính sách bảo mật</router-link></li>
            <li><a href="#" @click.prevent="handleContact">Liên hệ</a></li>
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
        <p>
          &copy; 2026 Hakkusu. Được code với 
          <span class="material-symbols-outlined text-danger" style="font-size: 1rem; vertical-align: middle;">favorite</span> và 
          <span class="material-symbols-outlined text-info" style="font-size: 1rem; vertical-align: middle;">coffee</span>.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.modern-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: radial-gradient(ellipse at bottom, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0) 100%);
  padding-top: 4rem;
  margin-top: auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 40px;
  margin-bottom: 4rem;
}

.logo-text {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  text-decoration: none;
}

.brand-logo {
  height: 40px;
  width: auto;
  border-radius: 8px;
}

.footer-desc {
  color: #94a3b8;
  font-size: 1rem;
  line-height: 1.6;
}

.footer-links h4, .footer-newsletter h4 {
  color: #fff;
  font-weight: 700;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.3s;
  font-size: 1rem;
}

.footer-links a:hover {
  color: #38bdf8;
  padding-left: 5px;
}

.newsletter-form {
  display: flex;
  gap: 10px;
}

.newsletter-form input {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 15px;
  border-radius: 12px;
  color: #fff;
  outline: none;
}

.newsletter-form input:focus {
  border-color: #38bdf8;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 30px 0;
  text-align: center;
  color: #64748b;
  font-size: 0.95rem;
}

.text-danger { color: #ef4444; }
.text-info { color: #38bdf8; }

.social-links {
  display: flex;
  gap: 15px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.3s;
  text-decoration: none;
}

.social-icon:hover {
  background: #38bdf8;
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(56, 189, 248, 0.4);
}

@media (max-width: 992px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 576px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
