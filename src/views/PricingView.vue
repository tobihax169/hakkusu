<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="app-wrapper">
    <main class="page-content">
      <!-- Pricing Plans -->
      <section class="container mb-5 pb-5 pt-5 mt-5">
        <div class="text-center animate-fade-up header-spacing">
           <span class="badge text-uppercase tracking-widest text-cyan mb-2">Bảng Giá</span>
           <h2 class="gradient-text blue-cyan-gradient title-section">Các Gói Cơ Bản</h2>
           <p class="subtitle mt-2">Lựa chọn gói dịch vụ phù hợp nhất với nhu cầu và quy mô cộng đồng của bạn.</p>
        </div>

        <div class="pricing-grid mt-5">
           <!-- Basic Bot -->
           <div class="pricing-card glass animate-scale-in">
              <div class="p-header">
                 <h3>Basic Custom Bot</h3>
                 <div class="price">200k<span>/duy nhất</span></div>
                 <p>Phù hợp cho Server bắt đầu hoặc quy mô nhỏ.</p>
              </div>
              <ul class="p-features">
                 <li><span class="material-symbols-outlined">check</span> 5 tính năng tuỳ chọn</li>
                 <li><span class="material-symbols-outlined">check</span> Lệnh quản trị & Member</li>
                 <li><span class="material-symbols-outlined">check</span> Setup 2 VPS Free</li>
                 <li><span class="material-symbols-outlined">check</span> Bảo hành 3 tháng</li>
              </ul>
              <button @click="window.dispatchEvent(new CustomEvent('open-chat'))" class="btn-outline mt-auto">Mua Ngay</button>
           </div>

           <!-- Advanced Bot -->
           <div class="pricing-card glass featured animate-scale-in" style="animation-delay: 0.1s">
              <div class="featured-badge">Bán Chạy Nhất</div>
              <div class="p-header">
                 <h3>Advanced Eco Bot</h3>
                 <div class="price">500k<span>/duy nhất</span></div>
                 <p>Bot kinh tế, minigame & tích hợp chuyên sâu.</p>
              </div>
              <ul class="p-features">
                 <li><span class="material-symbols-outlined">check</span> Không giới hạn tính năng</li>
                 <li><span class="material-symbols-outlined">check</span> Tích hợp SQL / MongoDB</li>
                 <li><span class="material-symbols-outlined">check</span> Hệ thống Level / Rank</li>
                 <li><span class="material-symbols-outlined">check</span> Bảo hành vĩnh viễn</li>
              </ul>
              <button @click="window.dispatchEvent(new CustomEvent('open-chat'))" class="btn-primary-glow mt-auto">Chọn Gói Này</button>
           </div>

           <!-- Server Setup -->
           <div class="pricing-card glass animate-scale-in" style="animation-delay: 0.2s">
              <div class="p-header">
                 <h3>Full Server Setup</h3>
                 <div class="price">150k<span>/duy nhất</span></div>
                 <p>Setup từ A-Z mọi phân quyền (Role).</p>
              </div>
              <ul class="p-features">
                 <li><span class="material-symbols-outlined">check</span> Phân quyền Role chuẩn</li>
                 <li><span class="material-symbols-outlined">check</span> Banner / Logo cơ bản</li>
                 <li><span class="material-symbols-outlined">check</span> Gợi ý Plugin quản trị</li>
                 <li><span class="material-symbols-outlined">check</span> Hướng dẫn sử dụng</li>
              </ul>
              <button @click="window.dispatchEvent(new CustomEvent('open-chat'))" class="btn-outline mt-auto">Đăng Ký</button>
           </div>
        </div>
      </section>

      <!-- Custom Request -->
      <section class="container mb-5 pb-5">
        <div class="custom-cta glass animate-fade-up">
           <div class="c-info">
              <h3>Dịch Vụ Theo Yêu Cầu Riêng</h3>
              <p>Bạn có một ý tưởng độc bản hoặc dự án siêu khổng lồ? Liên hệ trực tiếp để nhận báo giá chi tiết và lộ trình phát triển riêng biệt.</p>
           </div>
           <div class="c-action">
              <button @click="window.dispatchEvent(new CustomEvent('open-chat'))" class="btn-glow orange">Liên Hệ Báo Giá</button>
           </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.app-wrapper { padding-top: 50px; }
.header-spacing { margin-top: 60px; }
.title-section { font-size: 2.8rem; font-weight: 800; color: #fff; }
.gradient-text { background: -webkit-linear-gradient(90deg, #38bdf8, #818cf8); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.subtitle { color: #94a3b8; font-size: 1.1rem; }

.pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }
.pricing-card { display: flex; flex-direction: column; padding: 50px 35px; border-radius: 28px; border: 1px solid rgba(255, 255, 255, 0.05); transition: all 0.4s; position: relative; }
.pricing-card:hover { transform: translateY(-12px); border-color: rgba(56, 189, 248, 0.4); box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5); }
.pricing-card.featured { border-color: rgba(56, 189, 248, 0.6); background: rgba(30, 41, 59, 0.7); box-shadow: 0 0 30px rgba(56, 189, 248, 0.2); }
.featured-badge { position: absolute; top: 20px; right: 20px; background: #38bdf8; color: #000; padding: 5px 12px; border-radius: 20px; font-weight: 800; font-size: 0.75rem; text-transform: uppercase; }

.p-header h3 { color: #fff; font-size: 1.6rem; margin-bottom: 15px; }
.price { font-size: 3rem; font-weight: 800; color: #fff; margin-bottom: 5px; }
.price span { font-size: 1rem; color: #94a3b8; font-weight: 400; }
.p-header p { color: #94a3b8; font-size: 0.95rem; margin-bottom: 30px; }

.p-features { list-style: none; padding: 0; margin-bottom: 40px; }
.p-features li { display: flex; align-items: center; gap: 12px; color: #cbd5e1; margin-bottom: 15px; font-size: 1.05rem; }
.p-features li span { color: #38bdf8; font-size: 1.2rem; }

.btn-outline { background: transparent; border: 1px solid rgba(56, 189, 248, 0.5); color: #38bdf8; padding: 14px; border-radius: 14px; font-weight: 700; cursor: pointer; transition: all 0.3s; }
.btn-outline:hover { background: #38bdf8; color: #000; }
.btn-primary-glow { background: #38bdf8; border: none; color: #000; padding: 16px; border-radius: 14px; font-weight: 800; cursor: pointer; box-shadow: 0 10px 20px rgba(56, 189, 248, 0.3); transition: all 0.3s; }
.btn-primary-glow:hover { transform: scale(1.02); box-shadow: 0 15px 30px rgba(56, 189, 248, 0.5); }

.custom-cta { margin-top: 80px; padding: 40px; border-radius: 24px; display: flex; justify-content: space-between; align-items: center; gap: 30px; }
.c-info h3 { color: #fff; font-size: 1.8rem; margin-bottom: 10px; }
.c-info p { color: #94a3b8; font-size: 1.1rem; line-height: 1.6; max-width: 600px; }
.btn-glow.orange { background: linear-gradient(90deg, #f97316, #ea580c); color: #fff; padding: 16px 30px; border-radius: 14px; font-weight: 700; cursor: pointer; border: none; transition: all 0.3s; }
.btn-glow.orange:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(249, 115, 22, 0.3); }

@media (max-width: 992px) {
  .custom-cta { flex-direction: column; text-align: center; }
  .title-section { font-size: 2.2rem; }
}
</style>
