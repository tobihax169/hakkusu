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
    <main class="page-content container mt-5 pt-5 pb-5">
      <div class="doc-card text-center">
        <span class="badge text-uppercase tracking-widest text-cyan mb-3">Support</span>
        <h1 class="gradient-text blue-cyan-gradient title-huge mb-4">Trung Tâm Trợ Giúp</h1>
        <p class="subtitle mb-5">Bạn có câu hỏi? Chúng tôi luôn sẵn sàng hỗ trợ giải đáp nhanh chóng nhất.</p>

        <!-- FAQ Section -->
        <div class="faq-container mt-4 text-left">
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

        <div class="mt-5 p-4 glass animate-scale-in" style="border-radius: 16px;">
          <h3 class="text-white mb-3">Vẫn Cần Thêm Sự Trợ Giúp?</h3>
          <p class="text-muted mb-4">Gặp gỡ trực tiếp quản trị viên qua Chatbox góc màn hình.</p>
          <button @click="window.dispatchEvent(new CustomEvent('open-chat'))" class="btn-glow btn-action">Chat Trực Tiếp Ngay</button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-wrapper { padding-top: 50px; }
.page-content { flex: 1; display: flex; justify-content: center; }
.doc-card { width: 100%; max-width: 800px; }
.faq-container { width: 100%; display: flex; flex-direction: column; gap: 15px; }
.faq-item { border-radius: 16px; padding: 0 25px; transition: all 0.3s; border: 1px solid rgba(255, 255, 255, 0.05); }
.faq-item.open { background: rgba(30, 41, 59, 0.6); border-color: rgba(56, 189, 248, 0.5); }
.faq-header { display: flex; justify-content: space-between; align-items: center; padding: 25px 0; cursor: pointer; }
.faq-header h3 { margin: 0; font-size: 1.1rem; font-weight: 600; color: #fff; }
.icon { color: #38bdf8; transition: transform 0.3s; }
.faq-body { padding-bottom: 25px; color: #94a3b8; font-size: 1.05rem; line-height: 1.6; }
.gradient-text { background: -webkit-linear-gradient(90deg, #38bdf8, #818cf8); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.title-huge { font-size: 2.5rem; font-weight: 800; }
.badge { background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); padding: 5px 12px; border-radius: 20px; color: #22d3ee; }
.btn-glow { background: linear-gradient(90deg, #38bdf8, #818cf8); border: none; color: white; padding: 12px 24px; border-radius: 9999px; font-weight: 600; cursor: pointer; }
</style>
