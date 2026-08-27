# 📚 Book Store Backend API

Dự án **Book Store Backend**
---

## 🚀 Tính Năng Chính

## Hệ Thống quản trị (Admin)

* **Quản lý tài khoản Admin**
  * Đăng nhập admin (Hỗ trợ JWT, JSON Web Token).
  * Mã hóa mật khẩu an toàn với thư viện mã hóa `bcrypt`
* **Quản lý phân quyền Admin**
  * Mỗi một tài khoản admin sẽ có một vai trò quản trị.
  * Mỗi một vai trò quản trị sẽ có nhiều quyền quản trị. 
  * Dựa trên cơ chế role-base-access-control (RBAC). 
* **Quản lý đơn hàng** 
  * Người quản trị sẽ có thể xem được đơn hàng người dùng đã đặt.
  * Người quản trị sẽ có thể cập nhật trạng thái đơn hàng của người dùng.
  * Sau khi đơn hàng được cập nhật trạng thái thành công, hệ thống sẽ gửi email về  thông tin đơn hàng cho người dùng.
* **Quản lý sản phẩm** 
  * Người quản trị có thể thêm, xóa, cập nhật và chỉnh sửa sản phẩm để đưa lên trang client.
  * Hiện tại trang quản lý sản phẩm bao gồm có trang quản lý danh mục, quản lý sách.
* **Giới hạn số lần gọi request (Rate limit)**
  * Giới hạn số lượng request mà một IP (hoặc client) có thể gửi lên server trong một khoảng thời gian nhất định.
  * Chống tấn công DDoS / Brute Force.
  * Tiết kiệm chi phí API.

## Trang người dùng (client)

* **Quản lý người dùng (Authentication & Authorization)**
  * Đăng ký, nhận otp xác thực email với nodemailer. 
  * Mã hóa mật khẩu an toàn với `bcrypt`.
  * Đăng nhập (hỗ trợ JWT - JSON Web Token).
* **Quản lý đơn hàng (Order Management)**
  1. Khách hàng sẽ thêm sản phẩm vào giỏ hàng.
  2. Khách hàng ấn vào nút đặt hàng.
  3. Khách hàng điền các thông tin như, email, số điện thoại, địa chỉ.
  4. Chọn phương thức thanh toán rồi bấm xác nhận.
* **Phương thức thanh toán (Payment)**
  * Khách hàng có thể thanh toán khi nhận hàng.
  * Khách hàng có thể thanh toán trực tiếp qua zalopay.
  * Gửi email xác nhận đơn hàng khi đặt hàng thành công.
* **Bình luận đánh giá sản phẩm**
  * Khách hàng có thể  đánh giá sản phẩm bằng cách bình luận.
  * Lưu ý khách hàng phải đăng nhập để có thể bình luận.
* **Thao tác trên trang danh sách sản phẩm**
  * Khách hàng có thể tìm kiếm, xem, lọc, danh sách sản phẩm khi sản phẩm đó còn hàng.
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
