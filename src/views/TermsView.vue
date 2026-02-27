<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="app-wrapper">
    <main class="page-content container mt-5 pt-5 pb-5">
      <div class="doc-card glass p-5 animate-scale-in">
        <h1 class="gradient-text blue-cyan-gradient title-huge mb-4">Điều Khoản Dịch Vụ</h1>
        <p class="text-muted mb-5">Cập nhật lần cuối: Tháng 10 năm 2026</p>

        <div class="doc-content">
          <h3 class="mt-4 mb-3 text-white">1. Chấp nhận Điều khoản</h3>
          <p>Bằng cách truy cập và sử dụng dịch vụ của Hakkusu, bạn đồng ý tuân thủ và bị ràng buộc bởi các Điều khoản dịch vụ này. Nếu bạn không đồng ý với bất kỳ phần nào của các Điều khoản này, bạn vui lòng không sử dụng dịch vụ của chúng tôi.</p>

          <h3 class="mt-4 mb-3 text-white">2. Quyền lợi và Nghĩa vụ của Người dùng</h3>
          <p>Người dùng có trách nhiệm bảo mật tài khoản của mình và không chia sẻ thông tin đăng nhập với bên thứ ba. Bạn cam kết không sử dụng dịch vụ vào mục đích bất hợp pháp, phá hoại hệ thống hoặc gây tổn hại cho Hakkusu và các người dùng khác.</p>

          <h3 class="mt-4 mb-3 text-white">3. Giới hạn Trách nhiệm</h3>
          <p>Hakkusu sẽ không chịu trách nhiệm đối với bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, hoặc do hậu quả phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ.</p>
          
          <h3 class="mt-4 mb-3 text-white">4. Thông tin Thanh toán và Hoàn Tiền</h3>
          <p>Chúng tôi cam kết sử dụng các cổng thanh toán uy tín và bảo mật. Về chính sách hoàn tiền, vui lòng liên hệ trực tiếp với bộ phận CSKH trong vòng 3 ngày kể từ khi mua nếu nhận thấy lỗi kỹ thuật ở nền tảng. Chú ý, sau 3 ngày chúng tôi không hỗ trợ hoàn tiền, nhưng vẫn duy trì hỗ trợ kỹ thuật bảo hành.</p>

          <h3 class="mt-4 mb-3 text-white">5. Sửa đổi Điều khoản</h3>
          <p>Hakkusu có quyền sửa đổi hoặc thay thế các Điều khoản này bất cứ lúc nào. Mọi thay đổi sẽ có hiệu lực ngay khi được đăng tải trên trang web.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-wrapper { padding-top: 50px; }
.page-content { flex: 1; display: flex; justify-content: center; }
.doc-card { width: 100%; max-width: 900px; border-radius: 20px; text-align: left; }
.doc-content p { color: #cbd5e1; font-size: 1.1rem; line-height: 1.7; margin-bottom: 20px; }
.gradient-text { background: -webkit-linear-gradient(90deg, #38bdf8, #818cf8); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.title-huge { font-size: 2.5rem; font-weight: 800; }
.text-white { color: #fff; }
</style>
