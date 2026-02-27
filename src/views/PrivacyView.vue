<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="privacy-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-inner">
        <span class="badge-label">Privacy</span>
        <h1 class="page-title">Chính Sách Bảo Mật</h1>
        <p class="page-desc">Hakkusu cam kết bảo vệ thông tin cá nhân và quyền riêng tư của bạn bằng các tiêu chuẩn bảo mật cao nhất.</p>
      </div>
    </section>

    <!-- Document Content -->
    <section class="doc-section">
      <div class="doc-box glass">
        <p class="last-updated">Hiệu lực từ: Tháng 10 năm 2026</p>

        <div class="doc-item">
          <h3>1. Mục đích thu thập thông tin</h3>
          <p>Hakkusu thu thập thông tin cá nhân (Email, Tên hiển thị) để hỗ trợ quá trình đăng nhập định danh, cung cấp các tính năng cá nhân hóa, và ghi nhận tiến trình thanh toán, nạp thẻ vào hệ thống.</p>
        </div>

        <div class="doc-item">
          <h3>2. Phạm vi sử dụng thông tin</h3>
          <p>Chúng tôi cam kết chỉ sử dụng thông tin của bạn vào các mục đích sau:</p>
          <ul class="custom-list">
            <li>Xác thực và cấp quyền truy cập vào các tính năng ưu việt của Hakkusu.</li>
            <li>Gửi email xác thực, cấp lại mật khẩu.</li>
            <li>Nâng cao trải nghiệm người dùng dựa trên lịch sử hoạt động.</li>
          </ul>
        </div>

        <div class="doc-item">
          <h3>3. Chia sẻ dữ liệu với bên thứ ba</h3>
          <p>Hakkusu cam kết KHÔNG bán, chia sẻ hoặc cho thuê dữ liệu cá nhân của bạn cho bất kỳ bên thứ ba nào, ngoại trừ trường hợp có yêu cầu từ cơ quan pháp lý theo quy định của pháp luật hiện hành.</p>
        </div>

        <div class="doc-item">
          <h3>4. Bảo mật Dữ liệu</h3>
          <p>Toàn bộ mật khẩu của người dùng được mã hóa một chiều (hashing). Chúng tôi sử dụng giao thức HTTPS để đảm bảo các gói tin truyền qua mạng đều được mã hoá cấp cao nhằm chống lại tấn công nghe lén (Man-In-The-Middle).</p>
        </div>

        <div class="doc-item">
          <h3>5. Quyền của Người Dùng</h3>
          <p>Bạn có quyền yêu cầu tra cứu, chỉnh sửa (Username) hoặc xóa vĩnh viễn dữ liệu tài khoản cá nhân thông qua chức năng Chatbox gặp quản trị viên.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.privacy-page {
  padding-top: 120px;
  padding-bottom: 80px;
}

/* ===== HERO ===== */
.hero-section {
  text-align: center;
  margin-bottom: 60px;
}
.hero-inner {
  max-width: 750px;
  margin: 0 auto;
  padding: 0 2rem;
}
.badge-label {
  display: inline-block;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.3);
  padding: 6px 18px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #22d3ee;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 20px;
}
.page-title {
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 20px 0;
  background: linear-gradient(90deg, #38bdf8, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.page-desc {
  color: #94a3b8;
  font-size: 1.15rem;
  line-height: 1.6;
  margin: 0;
}

/* ===== DOCUMENT BOX ===== */
.doc-section {
  display: flex;
  justify-content: center;
  padding: 0 2rem;
}
.doc-box {
  width: 100%;
  max-width: 900px;
  border-radius: 24px;
  padding: 50px;
}
.last-updated {
  color: #64748b;
  font-size: 0.9rem;
  font-style: italic;
  margin-bottom: 40px;
}
.doc-item {
  margin-bottom: 35px;
}
.doc-item h3 {
  color: #fff;
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0 0 12px 0;
}
.doc-item p {
  color: #cbd5e1;
  font-size: 1.05rem;
  line-height: 1.8;
  margin: 0;
}

.custom-list {
  color: #cbd5e1;
  line-height: 1.8;
  margin: 15px 0 0 0;
  padding-left: 0;
  font-size: 1.05rem;
}
.custom-list li {
  margin-bottom: 12px;
  position: relative;
  padding-left: 25px;
  list-style: none;
}
.custom-list li::before {
  content: "•";
  color: #38bdf8;
  position: absolute;
  left: 0;
  font-weight: bold;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .privacy-page { padding-top: 100px; }
  .page-title { font-size: 2.2rem; }
  .doc-box { padding: 30px; }
}
</style>
