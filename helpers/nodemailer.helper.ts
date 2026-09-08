import nodemailer from "nodemailer";
import { orderStatus, orderSuccessHtml } from "./htmlContent.helper";

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
        subject: 'Mã OTP xác nhận từ hệ thống book store!',
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

export const sendOrderSuccessNodemailer = (userEmail: any, orderId: any) => {
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
        subject: 'Xác nhận đơn hàng từ cửa hàng book store',
        html: orderSuccessHtml(orderId)
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent: ', info.response);
        }
    });
}

export const sendNotficationOrderStatus = (userEmail: any, orderId: any, status: any) => {
    const initOrder = "đang được khởi tạo";
    const pendingOrder = "đang chờ xác nhận"
    const confirmedOrder = "đã được xác nhận";
    const shippingOrder = "đang giao hàng";
    const deliveredOrder = "đã giao thành công";

    let statusText: any;
    if(status === "init") {
        statusText = initOrder;
    } else if(status === "pending") {
        statusText = pendingOrder;
    } else if(status === "confirmed") {
        statusText = confirmedOrder;
    } else if(status === "shipping") {
        statusText === shippingOrder;
    } else if(status === "delivered") {
        statusText = deliveredOrder;
    }

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
        subject: `[Book Store] Đơn hàng #${orderId}: ${statusText}`,
        html: orderStatus(orderId, statusText)
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent: ', info.response);
        }
    });
}