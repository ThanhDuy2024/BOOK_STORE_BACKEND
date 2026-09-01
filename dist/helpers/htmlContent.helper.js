"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpHtml = exports.orderSuccessHtml = void 0;
const orderSuccessHtml = (orderId) => {
    return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Xác nhận đơn hàng</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #f4f6f9; padding: 40px 10px;">
            <tr>
                <td align="center">
                    <!-- Main Container -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
                        
                        <!-- Header Banner -->
                        <tr>
                            <td align="center" style="background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%); padding: 36px 20px;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">Book Store</h1>
                                <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 14px;">Cảm ơn bạn đã tin tưởng chọn mua sách!</p>
                            </td>
                        </tr>

                        <!-- Success Icon & Message -->
                        <tr>
                            <td align="center" style="padding: 32px 32px 10px 32px;">
                                <div style="display: inline-block; width: 64px; h-height: 64px; line-height: 64px; background-color: #ecfdf5; border-radius: 50%; color: #10b981; font-size: 32px; font-weight: bold;">
                                    ✓
                                </div>
                                <h2 style="color: #1e293b; margin: 16px 0 8px 0; font-size: 22px; font-weight: 600;">Đặt hàng thành công!</h2>
                                <p style="color: #64748b; margin: 0; font-size: 15px; line-height: 1.6;">
                                    Đơn hàng của bạn đã được tiếp nhận và đang trong quá trình xử lý. Chúng tôi sẽ thông báo đến bạn ngay khi hàng được giao.
                                </p>
                            </td>
                        </tr>

                        <!-- Order Code Box -->
                        <tr>
                            <td align="center" style="padding: 24px 32px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; text-align: center;">
                                    <tr>
                                        <td style="padding: 16px;">
                                            <span style="color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; display: block; margin-bottom: 4px;">Mã đơn hàng của bạn</span>
                                            <span style="color: #4f46e5; font-size: 24px; font-weight: 800; letter-spacing: 1px;">#${orderId}</span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Call to Action -->
                        <tr>
                            <td align="center" style="padding: 0 32px 32px 32px;">
                                <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">Bạn có thể kiểm tra trạng thái đơn hàng trong phần lịch sử mua hàng.</p>
                                <a href="${process.env.CLIENT_URL || '#'}/order-success" target="_blank" style="display: inline-block; background-color: #4f46e5; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px; box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);">
                                    Xem chi tiết đơn hàng
                                </a>
                            </td>
                        </tr>

                        <!-- Divider -->
                        <tr>
                            <td style="padding: 0 32px;">
                                <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 0;">
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td align="center" style="padding: 24px 32px; background-color: #ffffff;">
                                <p style="color: #94a3b8; font-size: 13px; margin: 0 0 8px 0;">
                                    Nếu bạn cần hỗ trợ, vui lòng liên hệ qua email <a href="mailto:${process.env.MAIN_MAIL}" style="color: #4f46e5; text-decoration: none;">${process.env.MAIN_MAIL}</a>
                                </p>
                                <p style="color: #cbd5e1; font-size: 12px; margin: 0;">
                                    © ${new Date().getFullYear()} Book Store. All rights reserved.
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
};
exports.orderSuccessHtml = orderSuccessHtml;
const otpHtml = (otp) => {
    return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mã OTP kích hoạt tài khoản</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #f4f6f9; padding: 40px 10px;">
            <tr>
                <td align="center">
                    <!-- Main Container -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
                        
                        <!-- Header Banner -->
                        <tr>
                            <td align="center" style="background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%); padding: 32px 20px;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Book Store</h1>
                                <p style="color: #e0e7ff; margin: 6px 0 0 0; font-size: 13px;">Xác thực địa chỉ email của bạn</p>
                            </td>
                        </tr>

                        <!-- Content Body -->
                        <tr>
                            <td align="center" style="padding: 32px 32px 10px 32px;">
                                <h2 style="color: #1e293b; margin: 0 0 12px 0; font-size: 20px; font-weight: 600;">Kích hoạt tài khoản</h2>
                                <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.6;">
                                    Cảm ơn bạn đã đăng ký tài khoản tại Book Store. Sử dụng mã OTP bên dưới để hoàn tất quá trình kích hoạt:
                                </p>
                            </td>
                        </tr>

                        <!-- OTP Box -->
                        <tr>
                            <td align="center" style="padding: 24px 32px;">
                                <table border="0" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; width: 100%; text-align: center;">
                                    <tr>
                                        <td style="padding: 20px 16px;">
                                            <span style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600; display: block; margin-bottom: 8px;">Mã OTP của bạn</span>
                                            <div style="color: #4f46e5; font-size: 36px; font-weight: 800; letter-spacing: 10px; font-family: 'Courier New', Courier, monospace;">
                                                ${otp}
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Warning / Expiration Note -->
                        <tr>
                            <td align="center" style="padding: 0 32px 28px 32px;">
                                <p style="color: #f59e0b; font-size: 13px; margin: 0 0 6px 0; font-weight: 500;">
                                    ⚠️ Mã xác thực có hiệu lực trong <b>5 phút</b>.
                                </p>
                                <p style="color: #94a3b8; font-size: 13px; margin: 0; line-height: 1.5;">
                                    Vì lý do bảo mật, tuyệt đối không chia sẻ mã này cho bất kỳ ai.
                                </p>
                            </td>
                        </tr>

                        <!-- Divider -->
                        <tr>
                            <td style="padding: 0 32px;">
                                <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 0;">
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td align="center" style="padding: 20px 32px; background-color: #ffffff;">
                                <p style="color: #94a3b8; font-size: 12px; margin: 0 0 6px 0;">
                                    Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email.
                                </p>
                                <p style="color: #cbd5e1; font-size: 12px; margin: 0;">
                                    © ${new Date().getFullYear()} Book Store. All rights reserved.
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
};
exports.otpHtml = otpHtml;
