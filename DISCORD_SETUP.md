# HƯỚNG DẪN CÀI ĐẶT DISCORD BOT & THIẾT LẬP SERVER HỖ TRỢ TRỰC TUYẾN

Hệ thống Website của bạn đang được tích hợp một tính năng **Live Chat (Hỗ trợ trực tuyến)** cực kỳ hiện đại. Khi khách hàng chat trên Website, tin nhắn sẽ được gửi thẳng về Server Discord. Nhân viên (Supporter) chỉ cần dùng Discord để trả lời khách hàng.

Để hệ thống này hoạt động trên **Render.com** (Backend) mà không bị lỗi, bạn cần thiết lập Bot Discord và Server Discord theo các bước chi tiết dưới đây:

---

## PHẦN 1: TẠO VÀ CẤU HÌNH BOT TRÊN DISCORD DEVELOPER PORTAL

1. **Truy cập cổng lập trình viên:**
   - Vào trang [Discord Developer Portal](https://discord.com/developers/applications).
   - Đăng nhập bằng tài khoản Discord của bạn.
   - Nhấn nút **"New Application"** ở góc trên bên phải, nhập tên cho Bot (ví dụ: `Hakkusu Support`) và nhấn Create.

2. **Tạo Bot:**
   - Ở menu bên trái, chọn mục **"Bot"**.
   - Bấm **"Add Bot"** (hoặc Reset Token nếu đã có) để tạo Token.
   - **QUAN TRỌNG:** Nhấn nút **"Copy"** ngay cạnh chữ Token để sao chép chuỗi mã này. Đây chính là `DISCORD_TOKEN` của bạn. *(Lưu ý: Không gửi mã này cho bất kỳ ai).*

3. **Cấp quyền Intents (Bắt buộc):**
   - Kéo xuống dưới phần **Privileged Gateway Intents**.
   - **BẬT (ON)** cả 3 tùy chọn sau:
     - `PRESENCE INTENT`
     - `SERVER MEMBERS INTENT`
     - `MESSAGE CONTENT INTENT` (Bắt buộc phải bật cái này thì bot mới đọc được tin nhắn nhân viên gửi).
   - Nhấn **"Save Changes"**.

4. **Lấy link mời Bot vào Server:**
   - Ở menu bên trái, chọn mục **"OAuth2"** -> **"URL Generator"**.
   - Trong bảng **Scopes**, tích chọn **`bot`**.
   - Trong bảng **Bot Permissions** hiện ra bên dưới, hãy chọn các quyền:
     - `Manage Channels` (Quản lý kênh - để Bot tự tạo kênh Ticket).
     - `Read Messages/View Channels` (Xem kênh).
     - `Send Messages` (Gửi tin nhắn).
     - `Embed Links` (Nhúng link).
     - `Attach Files` (Gửi ảnh/file).
     - *(Hoặc đánh dấu tích vào `Administrator` để cấp toàn quyền cho nhanh).*
   - Lăn xuống dưới cùng, COPY đường link đã được tạo ra. Dán link này vào trình duyệt để mời Bot vào Server Discord của bạn.

---

## PHẦN 2: THIẾT LẬP SERVER DISCORD (LẤY ID ODER)

Để lấy được các ID, bạn **phải bật Chế độ dành cho nhà phát triển** trên Discord:
- Mở Discord -> Cài đặt người dùng (hình bánh răng) -> **Nâng cao (Advanced)** -> Bật **Chế độ dành cho nhà phát triển (Developer Mode)**.

1. **Tạo Role (Vai trò) cho Nhân viên Hỗ Trợ:**
   - Vào Server Discord của bạn -> Cài đặt máy chủ (Server Settings) -> Roles (Tên vai trò).
   - Tạo 1 vai trò mới, ví dụ tên là `@Hỗ Trợ Viên`.
   - **Lấy ID:** Thoát ra ngoài nhóm, chuột phải vào vai trò đó (hoặc tên tài khoản của bạn đang có vai trò đó), chọn **"Copy Role ID"**. Đây chính là `SUPPORT_ROLE_ID`.

2. **Thiết lập Kênh (Channel) nhận thông báo Ticket:**
   - Tạo một Danh mục (Category) mới, ví dụ đặt tên là: `📨 QUẢN LÝ TICKETS`.
   - Trong danh mục này, tạo một Kênh văn bản (Text Channel), ví dụ: `#yeu-cau-ho-tro`.
   - Kênh `#yeu-cau-ho-tro` sẽ là nơi Bot gửi thông báo mỗi khi có khách hàng vừa nhắn tin trên website.
   - **Lấy ID:** Chuột phải vào kênh `#yeu-cau-ho-tro` -> Chọn **"Copy Channel ID"**. Đây chính là `SUPPORT_CHANNEL_ID`.
   - *(Lưu ý quan trọng: Vì tính năng tự động tạo kênh bằng category id, bot sẽ tự tạo kênh chat riêng cho từng khách hàng nằm **trong cùng** Category chứa kênh `#yeu-cau-ho-tro` này. Bạn cần đảm bảo đã cấp quyền cho Bot xem danh mục này).*

---

## PHẦN 3: CẤU HÌNH BIẾN MÔI TRƯỜNG TRÊN RENDER.COM 🚀

Vì Backend đang chạy trên Render.com, bạn **KHÔNG** sửa trực tiếp các dữ liệu mật này vào file Code. Hãy thiết lập Biến Môi Trường (Environment Variables) trên Render.com.

1. Đăng nhập vào [Render.com](https://render.com) và chọn Web Service Backend của bạn.
2. Nhấn vào tab **"Environment"**.
3. Thêm các biến (Add Environment Variable) với thông tin bạn vừa lấy được:

| Key | Value (Mẫu) | Giải thích |
| :--- | :--- | :--- |
| `DISCORD_TOKEN` | `MTE...abc...xyz` | Chuỗi Token của Bot lấy ở Phần 1 |
| `SUPPORT_CHANNEL_ID` | `12345678912345678` | ID của kênh `#yeu-cau-ho-tro` lấy ở Phần 2 |
| `SUPPORT_ROLE_ID` | `98765432198765432` | ID của Role Nhân viên lấy ở Phần 2 |

4. Cuối cùng, nhấn **"Save Changes"**. Render sẽ tự động khởi động lại Backend với kết nối Discord hoàn chỉnh.

---

## HƯỚNG DẪN SỬ DỤNG (KHI ĐÃ LÀM XONG)

1. **Khách hàng bắt đầu:** Khách truy cập vào Website, ấn vào khung chat góc phải và gửi tin nhắn hoặc gửi hình ảnh.
2. **Thông báo:** Màn hình Discord của nhân viên sẽ nổ thông báo ở kênh `#yeu-cau-ho-tro`. Có một khung Embed và nút **[Nhận Hỗ Trợ]**.
3. **Nhân viên nhận hỗ trợ:** Bất kỳ ai có role `SUPPORT_ROLE_ID` bấm vào nút này.
4. **Tự động hóa:** Bot sẽ ngay lập tức xoá giao diện Nhận, và tự động tạo ra 1 Text Channel mới toanh trong Server (vd tên kênh là `#ticket-8451-Khach-1`).
5. **Livestream tin nhắn:** Nhân viên gõ vào kênh đó, chữ bay thẳng lên website của khách. Khách gõ chữ (hoặc gửi ảnh màn hình), chữ bay thẳng về kênh Discord này. Ở trên website của khách cũng sẽ hiện trạng thái `"Nhân viên An đang gõ..."` tương tự.
6. **Kết thúc:** Xong việc, nhân viên bấm vào nút đỏ **[🔒 Đóng Ticket]**. Kênh Discord này sẽ tự động bị xóa đi sau 3 giây để Server của bạn luôn sạch sẽ không bị nghẽn kênh. Giúp bạn rảnh tay 100%.

> ℹ️ *Lưu ý: Mọi File code Frontend (Vercel) và Backend (Render) chúng tôi bảo trì và sửa lỗi hoàn toàn không ảnh hưởng gì tới luồng xử lý dữ liệu chuẩn chỉ này. Bạn yên tâm Cập nhật.*
