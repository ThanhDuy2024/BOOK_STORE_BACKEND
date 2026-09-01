"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderSuccessNodemailer = exports.sendOtpNodemailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const htmlContent_helper_1 = require("./htmlContent.helper");
const sendOtpNodemailer = (userEmail, otp, html) => {
    const transporter = nodemailer_1.default.createTransport({
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
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error:', error);
        }
        else {
            console.log('Email sent: ', info.response);
        }
    });
};
exports.sendOtpNodemailer = sendOtpNodemailer;
const sendOrderSuccessNodemailer = (userEmail, orderId) => {
    const transporter = nodemailer_1.default.createTransport({
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
        html: (0, htmlContent_helper_1.orderSuccessHtml)(orderId)
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error:', error);
        }
        else {
            console.log('Email sent: ', info.response);
        }
    });
};
exports.sendOrderSuccessNodemailer = sendOrderSuccessNodemailer;
