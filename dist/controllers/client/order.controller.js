"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostOrderZaloClientController = exports.PostOrderClientController = void 0;
const order_model_1 = require("../../models/order.model");
const orders_items_model_1 = require("../../models/orders_items.model");
const books_model_1 = require("../../models/books.model");
const sequelize_1 = require("sequelize");
const axios_1 = __importDefault(require("axios"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const moment_1 = __importDefault(require("moment"));
const zalopay_1 = require("../../configs/zalopay");
const nodemailer_helper_1 = require("../../helpers/nodemailer.helper");
const PostOrderClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let redFlag = true;
        for (const item of req.body.items) {
            const checkBook = yield books_model_1.Books.findOne({
                where: {
                    id: item.id,
                    status: "active",
                    quantity: {
                        [sequelize_1.Op.gte]: item.buyQuantity
                    }
                }
            });
            if (!checkBook) {
                redFlag = false;
                break;
            }
            ;
        }
        if (redFlag === false) {
            return res.status(404).json({
                status: false,
                msg: "Number of books exceeds the limit"
            });
        }
        const order = yield order_model_1.Orders.create({
            fullName: req.body.customer.fullName,
            email: req.body.customer.email,
            address: req.body.customer.address,
            phone: req.body.customer.phone,
            paymentMethod: req.body.customer.paymentMethod,
            totalAmount: req.body.totalAmount
        });
        for (const item of req.body.items) {
            yield orders_items_model_1.Orders_items.create({
                bookId: item.id,
                bookName: item.bookName,
                image: item.image,
                buyQuantity: item.buyQuantity,
                price: item.price,
                orderId: order.dataValues.id
            });
            yield books_model_1.Books.update({ quantity: (0, sequelize_1.literal)(`quantity - ${item.buyQuantity}`) }, { where: { id: item.id } });
        }
        (0, nodemailer_helper_1.sendOrderSuccessNodemailer)(req.body.customer.email, order.dataValues.id);
        res.status(200).json({
            status: true,
            msg: "Order successful!"
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        });
    }
});
exports.PostOrderClientController = PostOrderClientController;
const PostOrderZaloClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let redFlag = true;
        for (const item of req.body.items) {
            const checkBook = yield books_model_1.Books.findOne({
                where: {
                    id: item.id,
                    status: "active",
                    quantity: {
                        [sequelize_1.Op.gte]: item.buyQuantity
                    }
                }
            });
            if (!checkBook) {
                redFlag = false;
                break;
            }
            ;
        }
        if (redFlag === false) {
            return res.status(404).json({
                status: false,
                msg: "Number of books exceeds the limit"
            });
        }
        const orderItem = yield order_model_1.Orders.create({
            fullName: req.body.customer.fullName,
            email: req.body.customer.email,
            address: req.body.customer.address,
            phone: req.body.customer.phone,
            paymentMethod: req.body.customer.paymentMethod,
            totalAmount: req.body.totalAmount
        });
        for (const item of req.body.items) {
            yield orders_items_model_1.Orders_items.create({
                bookId: item.id,
                bookName: item.bookName,
                image: item.image,
                buyQuantity: item.buyQuantity,
                price: item.price,
                orderId: orderItem.dataValues.id
            });
            yield books_model_1.Books.update({ quantity: (0, sequelize_1.literal)(`quantity - ${item.buyQuantity}`) }, { where: { id: item.id } });
        }
        const embed_data = {
            redirecturl: `${process.env.FRONTEND_URL}/order/success`,
        };
        const items = [{
                itemname: "Thanh toán dịnh vụ cửa hàng sách"
            }];
        const transID = Math.floor(Math.random() * 1000000);
        const order = {
            app_id: zalopay_1.ZALOPAY_CONFIG.app_id,
            app_trans_id: `${(0, moment_1.default)().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: "user123",
            app_time: Date.now(), // miliseconds
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: Number(req.body.totalAmount),
            description: `Thông tin đơn hàng #${transID}`,
            bank_code: "",
            callback_url: `${process.env.FRONTEND_URL}/order/success`,
        };
        const data = zalopay_1.ZALOPAY_CONFIG.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
        order.mac = crypto_js_1.default.HmacSHA256(data, zalopay_1.ZALOPAY_CONFIG.key1).toString();
        const response = yield axios_1.default.post(zalopay_1.ZALOPAY_CONFIG.endpoint, null, { params: order });
        if (response.data.return_code == 1) {
            console.log(response);
            res.status(200).json({
                status: true,
                paymentUrl: response.data.order_url,
                msg: "Order successful!"
            });
        }
        else {
            return res.redirect("/");
        }
        yield orderItem.update({
            paymentStatus: "paid"
        });
        for (const item of req.body.items) {
            // Sửa câu lệnh update của bạn thành:
            yield books_model_1.Books.update({
                totalSale: (0, sequelize_1.literal)(`"totalSale" + ${item.buyQuantity}`) // 👈 Bọc "totalSale" trong ngoặc kép
            }, { where: { id: item.id } });
        }
        (0, nodemailer_helper_1.sendOrderSuccessNodemailer)(req.body.customer.email, orderItem.dataValues.id);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        });
    }
});
exports.PostOrderZaloClientController = PostOrderZaloClientController;
