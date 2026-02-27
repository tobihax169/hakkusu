<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="terms-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-inner">
        <span class="badge-label">Legal</span>
        <h1 class="page-title">Điều Khoản Dịch Vụ</h1>
        <p class="page-desc">Vui lòng đọc kỹ các điều khoản trước khi sử dụng dịch vụ của Hakkusu để đảm bảo quyền lợi của bạn.</p>
      </div>
    </section>

    <!-- Document Content -->
    <section class="doc-section">
      <div class="doc-box glass">
        <p class="last-updated">Cập nhật lần cuối: Tháng 10 năm 2026</p>

        <div class="doc-item">
          <h3>1. Chấp nhận Điều khoản</h3>
          <p>Bằng cách truy cập và sử dụng dịch vụ của Hakkusu, bạn đồng ý tuân thủ và bị ràng buộc bởi các Điều khoản dịch vụ này. Nếu bạn không đồng ý với bất kỳ phần nào của các Điều khoản này, bạn vui lòng không sử dụng dịch vụ của chúng tôi.</p>
        </div>

        <div class="doc-item">
          <h3>2. Quyền lợi và Nghĩa vụ của Người dùng</h3>
          <p>Người dùng có trách nhiệm bảo mật tài khoản của mình và không chia sẻ thông tin đăng nhập với bên thứ ba. Bạn cam kết không sử dụng dịch vụ vào mục đích bất hợp pháp, phá hoại hệ thống hoặc gây tổn hại cho Hakkusu và các người dùng khác.</p>
        </div>

        <div class="doc-item">
          <h3>3. Giới hạn Trách nhiệm</h3>
          <p>Hakkusu sẽ không chịu trách nhiệm đối với bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, hoặc do hậu quả phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ.</p>
        </div>

        <div class="doc-item">
          <h3>4. Thông tin Thanh toán và Hoàn Tiền</h3>
          <p>Chúng tôi cam kết sử dụng các cổng thanh toán uy tín và bảo mật. Về chính sách hoàn tiền, vui lòng liên hệ trực tiếp với bộ phận CSKH trong vòng 3 ngày kể từ khi mua nếu nhận thấy lỗi kỹ thuật ở nền tảng. Chú ý, sau 3 ngày chúng tôi không hỗ trợ hoàn tiền, nhưng vẫn duy trì hỗ trợ kỹ thuật bảo hành.</p>
        </div>

        <div class="doc-item">
          <h3>5. Sửa đổi Điều khoản</h3>
          <p>Hakkusu có quyền sửa đổi hoặc thay thế các Điều khoản này bất cứ lúc nào. Mọi thay đổi sẽ có hiệu lực ngay khi được đăng tải trên trang web.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.terms-page {
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

@media (max-width: 768px) {
  .terms-page { padding-top: 100px; }
  .page-title { font-size: 2.2rem; }
  .doc-box { padding: 30px; }
}
</style>
