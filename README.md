# 📚 Book Store Backend API

Dự án **Book Store Backend**
---

## 🚀 Tính Năng Chính

* **Quản lý người dùng (Authentication & Authorization):**
  * Đăng ký, đăng nhập (hỗ trợ JWT - JSON Web Token).
  * Mã hóa mật khẩu an toàn với `bcrypt`.
  * Phân quyền truy cập (Admin / Customer).
* **Quản lý Sách (Book Management):**
  * Lấy danh sách sách, tìm kiếm, lọc theo thể loại/tác giả.
  * Xem thông tin chi tiết của từng cuốn sách.
  * Admin: Thêm mới, cập nhật, xóa sách (CRUD).
* **Đơn hàng (Order Management):**
  * Cho phép khác hàng tạo đơn hàng mới và quản lý trạng thái đơn hàng.
  * Cho phép chỉnh sửa đơn hàng đối với người dùng phía client và admin.
  * Admin có thể xem lịch sử đơn hàng của người dùng.
* **Thanh toán (Payment)**
  * Khách hàng có thể thanh toán khi nhận hàng.
  * Khách hàng có thể thanh toán trực tiếp qua zalopay.
  * Gửi email xác nhận đơn hàng khi đặt hàng thành công.
---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

* **Runtime Environment:** [Node.js](https://nodejs.org/)
* **Web Framework:** [Express.js](https://expressjs.com/)
* **Database:**  [Postgresql]
* **Authentication:** [JSON Web Token (JWT)](https://jwt.io/) & `bcryptjs`
* **File Upload:** `Multer` / Cloudinary
* **Dev Tools:** `Nodemon`, `dotenv`, `cors`

---

## 📁 Cấu Trúc Dự Án (Project Structure)

```text
BOOK_STORE_BACKEND/
├── config/             # Cấu hình Database (MongoDB connection), Cloudinary, v.v.
├── controllers/        # Xử lý logic kinh doanh (Auth, Book, Cart, Order, User)
├── middlewares/        # Custom middlewares (Authentication, Error handling, Upload)
├── models/             # Định nghĩa schema Mongoose (User, Book, Order, Cart)
├── routes/             # Định nghĩa các endpoint API
├── helpers/            # Các hàm tiện ích bổ trợ
├── .gitignore          # Các file/thư mục bỏ qua khi push git
├── index.ts            # File khởi chạy server chính
├── package.json        # Thông tin phụ thuộc và các câu lệnh scripts
└── tsconfig.json       # Cấu hình typescript
