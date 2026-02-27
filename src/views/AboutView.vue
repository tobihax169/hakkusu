<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="app-wrapper">
    <main class="page-content">
      <section class="page-hero container">
        <div class="animate-fade-up text-center">
           <span class="badge text-uppercase tracking-widest text-cyan mb-2">Về Tôi</span>
           <h2 class="gradient-text title-section">Hakkusu Aka Tobi</h2>
           <p class="subtitle mt-3 text-center mx-auto" style="max-width: 700px;">Một mình xây dựng hệ sinh thái Server tự động hoá chuyên nghiệp, mang đến trải nghiệm đột phá cho cộng đồng Discord và Minecraft tại Việt Nam.</p>
        </div>
      </section>

      <!-- Story Section -->
      <section class="container mb-5 pb-5">
        <div class="story-grid glass animate-scale-in">
           <div class="s-left">
              <h3 class="mb-4 text-white" style="font-size: 1.8rem; font-weight: bold;">Khởi Nguồn Đam Mê</h3>
              <p class="mb-3" style="color: #cbd5e1; font-size: 1.1rem; line-height: 1.6;">Hakkusu được tạo ra từ niềm đam mê mãnh liệt với công nghệ và khát vọng xây dựng không gian chuyên nghiệp cho cộng đồng Game thủ. Bắt đầu từ những Server Discord quy mô nhỏ, tôi dần phát triển và phục vụ hàng trăm máy chủ trong và ngoài nước.</p>
              <p style="color: #cbd5e1; font-size: 1.1rem; line-height: 1.6;">Tôi hiểu rằng, mỗi dự án đều là tâm huyết của người sáng lập. Đó là lý do Hakkusu luôn cam kết cung cấp các hệ thống mang tính hoàn thiện vượt trội, bảo mật tuyệt đối, và trên hết là dễ dàng sử dụng cho người làm quản trị.</p>
           </div>
           <div class="s-right">
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" alt="Team Setup" class="story-img"/>
           </div>
        </div>
      </section>

      <!-- Founder Section -->
      <section class="container mb-5 pb-5 mt-5 pt-5" id="team">
        <div class="text-center animate-fade-up mb-5">
           <span class="badge text-uppercase tracking-widest text-cyan mb-2">Người Sáng Lập</span>
           <h2 class="text-white" style="font-size: 2.2rem; font-weight: 800;">Đằng Sau Hakkusu</h2>
        </div>
        
        <div class="founder-wrapper">
           <div class="team-card glass animate-scale-in founder-card">
              <div class="member-avatar bounce">
                 <img src="/Hakkusu.png" alt="Hakkusu Aka Tobi" />
              </div>
              <h3 class="member-name text-white">Hakkusu Aka Tobi</h3>
              <p class="member-role text-cyan">Founder & Developer</p>
              <p class="member-desc mt-3" style="color:#94a3b8; font-size: 1.05rem; line-height: 1.7; max-width: 500px; margin: 15px auto 0;">Người sáng lập và phát triển toàn bộ hệ sinh thái Hakkusu. Từ lập trình Bot Discord, thiết kế Website cho đến vận hành hệ thống Server — tất cả đều được xây dựng bởi một tay.</p>
              <div class="social-links mt-4 justify-center">
                 <a href="#" class="social-icon"><span class="material-symbols-outlined">forum</span></a>
                 <a href="#" class="social-icon"><span class="material-symbols-outlined">language</span></a>
                 <a href="#" class="social-icon"><span class="material-symbols-outlined">code</span></a>
              </div>
           </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-section container mb-5">
         <div class="cta-box glass animate-scale-in">
            <h2>Bạn Cần Một Giải Pháp Tùy Chỉnh?</h2>
            <p>Tôi luôn sẵn sàng lắng nghe mọi ý tưởng của bạn và biến nó thành hiện thực với chi phí tối ưu nhất.</p>
            <button @click="window.dispatchEvent(new CustomEvent('open-chat'))" class="btn-glow btn-action cta-btn">Trò Chuyện Ngay</button>
         </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.app-wrapper { padding-top: 50px; }
.page-hero {
  padding: 100px 0 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.header-spacing { margin-top: 40px; }
.story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 40px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.05); align-items: center;}
.story-img { width: 100%; height: auto; border-radius: 16px; object-fit: cover; box-shadow: 0 20px 40px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); transform: perspective(1000px) rotateY(-5deg); transition: transform 0.5s; }
.story-grid:hover .story-img { transform: perspective(1000px) rotateY(0deg) scale(1.02); }

.founder-wrapper { display: flex; justify-content: center; margin-top: 40px; margin-bottom: 60px; }
.founder-card { max-width: 500px; }
.team-card { padding: 40px 30px; border-radius: 24px; text-align: center; border: 1px solid rgba(255,255,255,0.05); transition: transform 0.3s; }
.team-card:hover { transform: translateY(-10px); background: rgba(30, 41, 59, 0.6); box-shadow: 0 20px 40px rgba(0,0,0,0.4); border-color: rgba(56, 189, 248, 0.3); }
.member-avatar { width: 120px; height: 120px; margin: 0 auto 20px; border-radius: 50%; padding: 5px; background: linear-gradient(135deg, rgba(56, 189, 248, 0.5), rgba(59, 130, 246, 0.2)); border: 1px solid rgba(56, 189, 248, 0.3); }
.member-avatar img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
.member-name { font-size: 1.4rem; margin-bottom: 5px; font-weight: 700; color: #fff;}
.member-role { font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;}
.justify-center { display: flex; justify-content: center; gap: 15px; }
.social-icon { width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: #fff; transition: all 0.3s; text-decoration: none;}
.social-icon:hover { background: #38bdf8; color: #fff; transform: translateY(-3px); box-shadow: 0 5px 15px rgba(56, 189, 248, 0.4);}

@keyframes bounceSlow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.bounce { animation: bounceSlow 4s infinite ease-in-out; }

.cta-box { padding: 50px 30px; border-radius: 24px; background: linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(30, 41, 59, 0.4) 100%); border: 1px solid rgba(14, 165, 233, 0.2); text-align: center; }
.cta-box h2 { font-size: 2rem; margin-bottom: 15px; color: #fff; }
.cta-box p { color: #94a3b8; font-size: 1.1rem; margin-bottom: 30px; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6; }

.badge { display: inline-block; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); padding: 8px 20px; border-radius: 20px; font-size: 1rem; font-weight: 600; color:#22d3ee; letter-spacing: 2px; margin-bottom: 20px;}
.gradient-text { background: -webkit-linear-gradient(90deg, #38bdf8, #818cf8); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.btn-glow { background: linear-gradient(90deg, #38bdf8, #818cf8); border: none; color: white; padding: 12px 24px; border-radius: 9999px; font-weight: 600; cursor: pointer; }
.text-center { text-align: center; }
.text-white { color: #fff; }

@media (max-width: 992px) {
  .story-grid { grid-template-columns: 1fr; gap: 30px; padding: 25px; }
  .story-grid:hover .story-img { transform: none; }
}
</style>
