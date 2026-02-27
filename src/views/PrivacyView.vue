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
        <h1 class="gradient-text blue-cyan-gradient title-huge mb-4">Chính Sách Bảo Mật</h1>
        <p class="text-muted mb-5">Hiệu lực từ: Tháng 10 năm 2026</p>

        <div class="doc-content">
          <h3 class="mt-4 mb-3 text-white">1. Mục đích thu thập thông tin</h3>
          <p>Hakkusu thu thập thông tin cá nhân (Email, Tên hiển thị) để hỗ trợ quá trình đăng nhập định danh, cung cấp các tính năng cá nhân hóa, và ghi nhận tiến trình thanh toán, nạp thẻ vào hệ thống.</p>

          <h3 class="mt-4 mb-3 text-white">2. Phạm vi sử dụng thông tin</h3>
          <p>Chúng tôi cam kết chỉ sử dụng thông tin của bạn vào các mục đích sau:</p>
          <ul class="ml-4" style="color:#cbd5e1; line-height: 1.7;">
            <li>Xác thực và cấp quyền truy cập vào các tính năng ưu việt của Hakkusu.</li>
            <li>Gửi email xác thực, cấp lại mật khẩu.</li>
            <li>Nâng cao trải nghiệm người dùng dựa trên lịch sử hoạt động.</li>
          </ul>

          <h3 class="mt-4 mb-3 text-white">3. Chia sẻ dữ liệu với bên thứ ba</h3>
          <p>Hakkusu cam kết KHÔNG bán, chia sẻ hoặc cho thuê dữ liệu cá nhân của bạn cho bất kỳ bên thứ ba nào, ngoại trừ trường hợp có yêu cầu từ cơ quan pháp lý theo quy định của pháp luật hiện hành.</p>
          
          <h3 class="mt-4 mb-3 text-white">4. Bảo mật Dữ liệu</h3>
          <p>Toàn bộ mật khẩu của người dùng được mã hóa một chiều (hashing). Chúng tôi sử dụng giao thức HTTPS để đảm bảo các gói tin truyền qua mạng đều được mã hoá cấp cao nhằm chống lại tấn công nghe lén (Man-In-The-Middle).</p>

          <h3 class="mt-4 mb-3 text-white">5. Quyền của Người Dùng</h3>
          <p>Bạn có quyền yêu cầu tra cứu, chỉnh sửa (Username) hoặc xóa vĩnh viễn dữ liệu tài khoản cá nhân thông qua chức năng Chatbox gặp quản trị viên.</p>
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
