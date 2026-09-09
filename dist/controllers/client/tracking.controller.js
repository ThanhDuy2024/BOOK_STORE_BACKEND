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
exports.PutTrackingClientController = exports.DeleteTrackingClientController = exports.PostTrackingClientController = void 0;
const order_model_1 = require("../../models/order.model");
const sequelize_1 = require("sequelize");
const orders_items_model_1 = require("../../models/orders_items.model");
const moment_1 = __importDefault(require("moment"));
const PostTrackingClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, email } = req.body;
        const order = yield order_model_1.Orders.findOne({
            include: {
                model: orders_items_model_1.Orders_items,
                as: "items"
            },
            where: {
                status: {
                    [sequelize_1.Op.notIn]: ["deleted"]
                },
                id: orderId,
                email: email
            }
        });
        if (!order) {
            return res.status(404).json({
                status: false,
                msg: "Your order not found!"
            });
        }
        ;
        order.dataValues.createdAtFormat = (0, moment_1.default)(order.dataValues.createdAt).format("HH:mm DD/MM/YYYY");
        order.dataValues.updatedAtFormat = (0, moment_1.default)(order.dataValues.updatedAt).format("HH:mm DD/MM/YYYY");
        res.status(200).json({
            status: true,
            msg: "Tracking complete!",
            data: order.dataValues
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        });
    }
});
exports.PostTrackingClientController = PostTrackingClientController;
const DeleteTrackingClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield order_model_1.Orders.findOne({
            where: {
                status: {
                    [sequelize_1.Op.notIn]: ["deleted"]
                },
                id: id,
                paymentStatus: "unpaid"
            }
        });
        if (!order) {
            return res.status(404).json({
                status: false,
                msg: "Your order not found!"
            });
        }
        ;
        yield order.update({
            status: "cancel"
        });
        res.status(200).json({
            status: true,
            msg: "Your order have deleted!"
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        });
    }
});
exports.DeleteTrackingClientController = DeleteTrackingClientController;
const PutTrackingClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { address, phone } = req.body;
        const { id } = req.params;
        const order = yield order_model_1.Orders.findOne({
            where: {
                id: id,
                status: {
                    [sequelize_1.Op.notIn]: ["deleted"]
                }
            }
        });
        if (!order) {
            return res.status(404).json({
                status: true,
                msg: "Order not found!"
            });
        }
        ;
        yield order.update({
            address: address,
            phone: phone
        });
        res.status(200).json({
            status: true,
            msg: "Your order has updated!"
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        });
    }
});
exports.PutTrackingClientController = PutTrackingClientController;
