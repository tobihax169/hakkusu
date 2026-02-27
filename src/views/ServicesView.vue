<script setup>
import { ref, onMounted } from 'vue'

const faqs = ref([
  { 
    question: "Sau khi bàn giao bot có được hỗ trợ sửa lỗi không?", 
    answer: "Có, chúng tôi bảo hành code trọn đời đối với các lỗi phát sinh do phía chúng tôi, và hỗ trợ nâng cấp tính năng với chi phí cực kỳ ưu đãi.",
    open: false 
  },
  { 
    question: "Thời gian hoàn thành setup 1 server là bao lâu?", 
    answer: "Thông thường từ 1 đến 3 ngày tùy vào độ phức tạp của Server, các yêu cầu Custom Bot và hệ thống phân quyền đi kèm.",
    open: false 
  },
  { 
    question: "Có hỗ trợ tích hợp nạp thẻ tự động cho Box Minecraft không?", 
    answer: "Có, chúng tôi hỗ trợ tích hợp API nạp thẻ tự động (Thesieure, Doithe, Web nạp riêng...) vào thẳng Game qua lệnh hoặc menu NPC.",
    open: false 
  }
])

const toggleFaq = (index) => {
  faqs.value[index].open = !faqs.value[index].open
}

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="services-page app-wrapper">
    <main class="services-content">
      <!-- Page Header -->
      <section class="page-hero text-center container">
        <div class="animate-fade-up">
          <span class="badge text-uppercase tracking-widest text-cyan mb-3">Premium Solutions</span>
          <h1 class="gradient-text title-huge">Khám Phá Dịch Vụ Của Hakkusu</h1>
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
            <div class="service-actions mt-4">
              <span class="price-tag">Chỉ từ 200.000đ</span>
              <button @click="window.dispatchEvent(new CustomEvent('open-chat'))" class="btn-glow btn-action">
                Nhận Tư Vấn <span class="material-symbols-outlined arr">arrow_forward</span>
              </button>
            </div>
          </div>
          <div class="s-image animate-fade-in-right">
             <div class="mockup-card glass">
                <img src="https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=800" alt="Bot Discord" class="service-img"/>
             </div>
          </div>
        </div>

        <!-- Service 2: Discord Setup -->
        <div class="service-row reverse mt-huge">
          <div class="s-image animate-fade-in-left">
             <div class="mockup-card glass">
                <img src="https://images.unsplash.com/photo-1614680376593-902f74cc0d41?auto=format&fit=crop&q=80&w=800" alt="Discord Setup" class="service-img"/>
             </div>
          </div>
          <div class="s-info animate-fade-in-right">
            <div class="s-icon-box"><span class="material-symbols-outlined">build</span></div>
            <h2>Thiết Kế & Cấu Hình Server Discord</h2>
            <p>Chúng tôi biến một server trống rỗng thành một không gian sinh hoạt chuyên nghiệp với hệ thống phân quyền tầng lớp, kênh liên kết mượt mà và các tool tự động tương tác.</p>
            <ul class="feature-list">
              <li><span class="material-symbols-outlined text-success">check_circle</span> Phân quyền Role & Permission bảo mật 100%.</li>
              <li><span class="material-symbols-outlined text-success">check_circle</span> Thiết kế danh mục & kênh theo phong cách hiện đại.</li>
              <li><span class="material-symbols-outlined text-success">check_circle</span> Chống Raid & Spam hiệu quả tối đa.</li>
            </ul>
            <div class="service-actions mt-4">
              <span class="price-tag">Chỉ từ 100.000đ</span>
              <button @click="window.dispatchEvent(new CustomEvent('open-chat'))" class="btn-glow btn-action">
                Bắt Đầu Ngay <span class="material-symbols-outlined arr">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Service 3: Minecraft -->
        <div class="service-row mt-huge">
          <div class="s-info animate-fade-in-left">
            <div class="s-icon-box"><span class="material-symbols-outlined">dns</span></div>
            <h2>Setup Server Minecraft Toàn Diện</h2>
            <p>Từ các máy chủ Survival đơn giản đến hệ thống Network BungeeCord phức tạp. Chúng tôi tối ưu hóa Performance để Server của bạn chịu tải được hàng trăm người chơi cùng lúc.</p>
            <ul class="feature-list">
              <li><span class="material-symbols-outlined text-success">check_circle</span> Setup Game Mode: Survival, Skyblock, AcidIsland...</li>
              <li><span class="material-symbols-outlined text-success">check_circle</span> Tối ưu Plugin & Chống Lag tuyệt đỉnh.</li>
              <li><span class="material-symbols-outlined text-success">check_circle</span> Tích hợp nạp điểm, Webstore tự động.</li>
            </ul>
            <div class="service-actions mt-4">
              <span class="price-tag">Chỉ từ 500.000đ</span>
              <button @click="window.dispatchEvent(new CustomEvent('open-chat'))" class="btn-glow btn-action">
                Xem Gói VPS <span class="material-symbols-outlined arr">arrow_forward</span>
              </button>
            </div>
          </div>
          <div class="s-image animate-fade-in-right">
             <div class="mockup-card glass">
                <img src="https://images.unsplash.com/photo-1587573089734-09cb94300c73?auto=format&fit=crop&q=80&w=800" alt="Minecraft Setup" class="service-img"/>
             </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="container mt-huge mb-5">
        <div class="text-center mb-5">
          <h2 class="text-white title-section">Câu Hỏi Thường Gặp</h2>
        </div>
        <div class="faq-container">
          <div v-for="(faq, idx) in faqs" :key="idx" class="faq-item glass" :class="{ 'open': faq.open }">
            <div class="faq-header" @click="toggleFaq(idx)">
              <h3>{{ faq.question }}</h3>
              <span class="material-symbols-outlined icon">{{ faq.open ? 'remove' : 'add' }}</span>
            </div>
            <div class="faq-body" v-show="faq.open">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.app-wrapper { padding-top: 50px; }
.services-content { padding-bottom: 5rem; }
.page-hero { 
  padding: 100px 0 60px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.badge { 
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(56, 189, 248, 0.1); 
  border: 1px solid rgba(56, 189, 248, 0.3); 
  padding: 6px 16px; 
  border-radius: 20px; 
  color: #22d3ee; 
  font-size: 0.85rem; 
  font-weight: 600; 
  margin-bottom: 25px;
}
.title-huge { font-size: 3.5rem; font-weight: 800; margin-bottom: 1.5rem; display: block; }
.gradient-text { 
  background: linear-gradient(90deg, #38bdf8, #818cf8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.subtitle { color: #94a3b8; font-size: 1.15rem; max-width: 700px; margin: 0 auto; line-height: 1.6; }

.service-row { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; margin-bottom: 80px; }
.service-row.reverse { direction: rtl; }
.service-row.reverse .s-info { direction: ltr; }
.service-row.reverse .s-image { direction: ltr; }

.s-icon-box { width: 60px; height: 60px; border-radius: 16px; background: rgba(56, 189, 248, 0.1); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; color: #38bdf8; }
.s-icon-box span { font-size: 2rem; }
.s-info h2 { font-size: 2.2rem; color: #fff; font-weight: 700; margin-bottom: 1.5rem; }
.s-info p { color: #cbd5e1; font-size: 1.1rem; line-height: 1.7; margin-bottom: 20px; }

.feature-list { list-style: none; padding: 0; margin-bottom: 30px; }
.feature-list li { display: flex; align-items: center; gap: 10px; color: #94a3b8; margin-bottom: 12px; font-weight: 500; }
.text-success { color: #10b981; }

.price-tag { font-size: 1.2rem; font-weight: 700; color: #38bdf8; background: rgba(56, 189, 248, 0.1); padding: 8px 16px; border-radius: 12px; border: 1px solid rgba(56, 189, 248, 0.2); }
.service-actions { display: flex; align-items: center; gap: 15px; }
.btn-glow { 
  background: linear-gradient(90deg, #38bdf8, #818cf8); border: none; color: white; padding: 12px 24px; border-radius: 9999px; 
  font-weight: 600; cursor: pointer; transition: all 0.3s;
  display: inline-flex; align-items: center; gap: 8px;
}
.btn-glow:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(56, 189, 248, 0.3); }
.arr { font-size: 1.2rem; }

.mockup-card { border-radius: 24px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 20px 50px rgba(0,0,0,0.5); width: 100%; height: 350px; display: flex; align-items: center; justify-content: center; background: rgba(15, 23, 42, 0.6); }
.service-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; opacity: 0.8; }
.mockup-card:hover .service-img { transform: scale(1.05); opacity: 1; }

.mt-huge { margin-top: 120px; }
.faq-container { width: 100%; display: flex; flex-direction: column; gap: 15px; max-width: 900px; margin: 0 auto; }
.faq-item { border-radius: 16px; padding: 0 25px; transition: all 0.3s; border: 1px solid rgba(255, 255, 255, 0.05); }
.faq-item.open { background: rgba(30, 41, 59, 0.6); border-color: rgba(56, 189, 248, 0.5); }
.faq-header { display: flex; justify-content: space-between; align-items: center; padding: 25px 0; cursor: pointer; }
.faq-header h3 { margin: 0; font-size: 1.1rem; font-weight: 600; color: #fff; }
.icon { color: #38bdf8; transition: transform 0.30s; }
.faq-item.open .icon { transform: rotate(180deg); }
.faq-body { padding-bottom: 25px; color: #94a3b8; font-size: 1.05rem; line-height: 1.6; }
.glass { background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.05); }

@keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-up { animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

@media (max-width: 992px) {
  .service-row { grid-template-columns: 1fr; gap: 40px; text-align: center; }
  .s-icon-box { margin-left: auto; margin-right: auto; }
  .feature-list li { justify-content: center; }
  .service-row.reverse { direction: ltr; }
  .service-actions { justify-content: center; }
  .title-huge { font-size: 2.5rem; }
}
</style>
