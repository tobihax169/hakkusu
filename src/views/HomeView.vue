<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  window.addEventListener('scroll', () => {
    // Parallax effect for cloud
    const cloud = document.querySelector('.floating-illustration')
    if (cloud) {
      cloud.style.transform = `translateY(${window.scrollY * 0.2}px)`
    }
  })
})
</script>

<template>
  <div class="app-wrapper">
    <main>
      <!-- Hero Section -->
      <section class="hero-split container">
        <!-- Left Side: Text -->
        <div class="hero-left animate-fade-up">
          <h1 class="cyan-text">Discord & Cloud</h1>
          <h1 class="blue-text">Computing</h1>
          <p class="subtitle mt-4">Cung cấp giải pháp toàn diện về thiết lập Server Discord chuyên nghiệp, lập trình Bot Discord theo yêu cầu và xây dựng Server Minecraft đỉnh cao.</p>
          <p class="subtitle-small">Đăng ký ngay hôm nay để nhận được ưu đãi giảm giá tốt nhất!</p>
          
          <div class="hero-actions mt-5">
            <router-link to="/services" class="btn-action rounded-pill btn-glow">
              KHÁM PHÁ NGAY <span class="material-symbols-outlined arrow">arrow_forward</span>
            </router-link>
          </div>
        </div>
        
        <!-- Right Side: Floating Isometric Art -->
        <div class="hero-right">
          <div class="floating-illustration">
             <svg width="100%" height="auto" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
                <path d="M 100 250 L 250 170 L 400 250 L 250 330 Z" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" stroke-width="2" />
                <path d="M 100 250 L 100 270 L 250 350 L 250 330 Z" fill="rgba(30, 64, 175, 0.6)" stroke="#3b82f6" stroke-width="1" />
                <path d="M 400 250 L 400 270 L 250 350 L 250 330 Z" fill="rgba(30, 58, 138, 0.4)" stroke="#3b82f6" stroke-width="1" />
                <ellipse cx="180" cy="200" rx="30" ry="15" fill="#ec4899" />
                <path d="M 150 200 L 150 230 A 30 15 0 0 0 210 230 L 210 200 Z" fill="#be185d" />
                <ellipse cx="180" cy="230" rx="30" ry="15" fill="none" stroke="#ec4899" stroke-width="2" />
                <g transform="translate(250, 100)">
                    <ellipse cx="0" cy="0" rx="70" ry="40" fill="url(#cloudGrad)" filter="drop-shadow(0 10px 15px rgba(6,182,212,0.4))" />
                    <ellipse cx="-30" cy="-20" rx="40" ry="30" fill="url(#cloudGrad)" />
                    <ellipse cx="30" cy="-10" rx="35" ry="25" fill="url(#cloudGrad)" />
                    <path d="M -15 5 L 15 5 L 5 -5 M 15 5 L 5 15" stroke="#fff" stroke-width="3" fill="none" transform="rotate(-30) scale(0.8)"  />
                    <path d="M 15 5 L -15 5 L -5 -5 M -15 5 L -5 15" stroke="#ec4899" stroke-width="3" fill="none" transform="rotate(30) translate(0, 10) scale(0.8)"  />
                </g>
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
          <h3>Lập Trình Bot Discord</h3>
          <p>Bot tự động hoá chuyên nghiệp, kết nối API, quản lý cộng đồng, và hệ thống ticket hỗ trợ trực tuyến độc quyền riêng cho Server.</p>
        </div>
        <div class="feature-card glass">
          <div class="icon"><span class="material-symbols-outlined" style="font-size: inherit;">build</span></div>
          <h3>Setup Server Discord</h3>
          <p>Thiết kế hệ thống phân quyền (Role) an toàn, tạo danh mục chuẩn UX, tối ưu bảo mật và tích hợp sẵn công cụ quản trị tương tác.</p>
        </div>
        <div class="feature-card glass">
          <div class="icon"><span class="material-symbols-outlined" style="font-size: inherit;">dns</span></div>
          <h3>Xây Dựng Server Minecraft</h3>
          <p>Lắp đặt hệ thống Server VPS, cấu hình Plugin siêu mượt, hỗ trợ setup mạng BungeeCord chống lại các cuộc tấn công DDoS.</p>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.hero-split {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: calc(100vh - 120px);
  padding: 80px 0 40px 0;
  gap: 40px;
  position: relative;
  z-index: 10;
}
.hero-left { flex: 1; max-width: 600px; }
.cyan-text { font-size: 4rem; font-weight: 800; line-height: 1.1; margin: 0; color: #22d3ee; }
.blue-text { font-size: 4rem; font-weight: 800; line-height: 1.1; margin: 0; color: #3b82f6; margin-bottom: 20px; }
.subtitle { color: #fff; font-size: 1.1rem; line-height: 1.6; font-weight: 500; }
.subtitle-small { color: #94a3b8; font-size: 0.95rem; margin-top: 10px; }
.hero-actions { display: flex; gap: 20px; }
.btn-action {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(90deg, #ec4899, #be185d);
  color: white;
  padding: 12px 28px;
  font-size: 1rem;
  letter-spacing: 0.5px;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);
  transition: all 0.3s ease;
}
.btn-action:hover {
  background: linear-gradient(90deg, #f472b6, #db2777);
  box-shadow: 0 6px 20px rgba(236, 72, 153, 0.6);
  transform: translateY(-2px);
}
.arrow { margin-left: 10px; font-size: 0.8rem; }
.hero-right { flex: 1; display: flex; justify-content: center; align-items: center; }
.floating-illustration { width: 100%; max-width: 500px; animation: hover-bob 4s ease-in-out infinite; transition: transform 0.1s linear; will-change: transform; }
@keyframes hover-bob {
  0% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
  100% { transform: translateY(0); }
}
.data-flow { stroke-dashoffset: 100; animation: dash 2s linear infinite; }
.data-flow-fast { animation: slideDown 1.5s linear infinite; }
@keyframes dash { to { stroke-dashoffset: 0; } }
@keyframes slideDown { 0% { transform: translateY(-10px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(20px); opacity: 0; } }
.animate-fade-up { animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

.features { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; padding-bottom: 80px; position: relative; z-index: 10; }
.feature-card { padding: 40px 30px; border-radius: 20px; transition: all 0.3s ease; background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(255,255,255,0.05); backdrop-filter: blur(10px); }
.feature-card:hover { transform: translateY(-10px); background: rgba(30, 41, 59, 0.8); border-color: rgba(56, 189, 248, 0.5); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
.icon { font-size: 3rem; margin-bottom: 20px; background: -webkit-linear-gradient(90deg, #38bdf8, #818cf8); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; display: inline-block; }
.feature-card h3 { font-size: 1.4rem; margin-bottom: 15px; color: #f8fafc; }
.feature-card p { color: #94a3b8; line-height: 1.6; }

@media (max-width: 992px) {
  .hero-split { flex-direction: column; text-align: center; padding-top: 60px; }
  .cyan-text, .blue-text { font-size: 3rem; }
  .floating-illustration { margin-top: 40px; }
  .hero-actions { justify-content: center; }
}
</style>
