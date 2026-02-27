<script setup>
import { ref, onMounted } from 'vue'

const faqs = ref([
  { question: "Làm thế nào để bắt đầu sử dụng dịch vụ của Hakkusu?", answer: "Bạn chỉ cần đăng nhập tài khoản, sau đó truy cập vào trang Dịch Vụ hoặc Bảng Giá để chọn gói phù hợp. Ấn nút trò chuyện để liên hệ trực tiếp với chúng tôi.", open: false },
  { question: "Mất bao lâu để hoàn thành một Server Discord Custom?", answer: "Thông thường sẽ mất từ 2-5 ngày tuỳ theo độ phức tạp và yêu cầu về Bot Custom của bạn.", open: false },
  { question: "Tôi thanh toán qua những hình thức nào?", answer: "Hiện tại Hakkusu hỗ trợ nạp số dư tự động bằng cách Chuyển khoản ngân hàng nội địa với công nghệ VietQR hiện đại.", open: false },
  { question: "Dịch vụ có hỗ trợ sau khi bàn giao không?", answer: "Khẳng định là có! Chúng tôi luôn đi kèm chính sách bảo hành trọn đời đối với lỗi logic do chúng tôi phát triển và sẵn sàng hỗ trợ bạn nhanh nhất.", open: false }
])

const toggleFaq = (index) => {
  faqs.value[index].open = !faqs.value[index].open
}

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="app-wrapper">
    <main class="page-content">
      <!-- Hero -->
      <section class="page-hero container">
        <div class="animate-fade-up text-center">
           <span class="badge text-uppercase tracking-widest text-cyan mb-2">Support</span>
           <h1 class="gradient-text title-huge">Trung Tâm Trợ Giúp</h1>
           <p class="subtitle mt-3 text-center mx-auto" style="max-width: 700px;">Bạn có câu hỏi? Chúng tôi luôn sẵn sàng hỗ trợ giải đáp nhanh chóng nhất.</p>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="container mb-5 pb-5">
        <div class="faq-container animate-fade-up">
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

        <!-- Contact CTA -->
        <div class="mt-5 p-5 glass animate-scale-in text-center contact-cta">
          <h3 class="text-white mb-3">Vẫn Cần Thêm Sự Trợ Giúp?</h3>
          <p class="text-muted mb-4">Gặp gỡ trực tiếp quản trị viên qua Chatbox góc màn hình.</p>
          <button @click="window.dispatchEvent(new CustomEvent('open-chat'))" class="btn-glow btn-action">Chat Trực Tiếp Ngay</button>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.app-wrapper { padding-top: 80px; }
.page-hero {
  padding: 80px 0 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.badge { 
  display: inline-block;
  background: rgba(56, 189, 248, 0.1); 
  border: 1px solid rgba(56, 189, 248, 0.3); 
  padding: 6px 16px; 
  border-radius: 20px; 
  font-size: 0.85rem; 
  font-weight: 600; 
  color:#22d3ee;
}
.title-huge { font-size: 3.5rem; font-weight: 800; margin-bottom: 1.5rem; color: #fff; line-height: 1.2; }
.gradient-text { 
  background: linear-gradient(90deg, #38bdf8, #818cf8);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.subtitle { color: #94a3b8; font-size: 1.15rem; max-width: 700px; margin: 0 auto; line-height: 1.6; }

.faq-container { width: 100%; display: flex; flex-direction: column; gap: 15px; max-width: 900px; margin: 0 auto; }
.faq-item { border-radius: 16px; padding: 0 25px; transition: all 0.3s; border: 1px solid rgba(255, 255, 255, 0.05); }
.faq-item.open { background: rgba(30, 41, 59, 0.6); border-color: rgba(56, 189, 248, 0.5); }
.faq-header { display: flex; justify-content: space-between; align-items: center; padding: 25px 0; cursor: pointer; }
.faq-header h3 { margin: 0; font-size: 1.1rem; font-weight: 600; color: #fff; }
.icon { color: #38bdf8; transition: transform 0.3s; }
.faq-body { padding-bottom: 25px; color: #94a3b8; font-size: 1.05rem; line-height: 1.6; }

.contact-cta { 
  max-width: 900px; 
  margin: 40px auto 0; 
  border-radius: 24px;
  padding-bottom: 60px !important;
}
.contact-cta h3 { font-size: 1.8rem; font-weight: 700; }
.contact-cta p { font-size: 1.1rem; margin-bottom: 35px; }
.text-center { text-align: center; }

.contact-cta button { margin-top: 0; }

.btn-glow { 
  background: linear-gradient(90deg, #38bdf8, #818cf8); 
  border: none; 
  color: white; 
  padding: 14px 32px; 
  border-radius: 9999px; 
  font-weight: 700; 
  cursor: pointer;
  transition: all 0.3s;
}
.btn-glow:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(56, 189, 248, 0.4); }

@media (max-width: 768px) {
  .title-huge { font-size: 2.5rem; }
  .faq-header h3 { font-size: 1rem; }
}
</style>
