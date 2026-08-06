import nodemailer from "nodemailer";

export const sendOtpNodemailer = (userEmail: any, otp: any, html: any) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // use false for STARTTLS; true for SSL on port 465
        auth: {
            user: process.env.MAIN_MAIL,
            pass: process.env.APP_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.MAIN_MAIL,
        to: userEmail,
        subject: 'Mã OTP xác nhận từ hệ thống sunshine!',
        html: html
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent: ', info.response);
        }
    });
}