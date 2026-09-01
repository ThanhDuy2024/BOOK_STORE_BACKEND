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
exports.PutOrderAdminController = exports.GetDetailOrderAdminController = exports.GetAllOrderAdminController = void 0;
const order_model_1 = require("../../models/order.model");
const sequelize_1 = require("sequelize");
const moment_1 = __importDefault(require("moment"));
const pagination_helper_1 = require("../../helpers/pagination.helper");
const orders_items_model_1 = require("../../models/orders_items.model");
const GetAllOrderAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            where: {
                status: {
                    [sequelize_1.Op.notIn]: ["deleted"]
                }
            },
            order: [
                ["createdAt", "DESC"]
            ],
            offset: 0,
            limit: req.query.limit || 10
        };
        if (req.query.search_email !== "null") {
            query.where.email = req.query.search_email;
        }
        if (req.query.paymentMethod !== "null") {
            query.where.paymentMethod = req.query.paymentMethod;
        }
        ;
        if (req.query.paymentStatus !== "null") {
            query.where.paymentStatus = req.query.paymentStatus;
        }
        ;
        if (req.query.totalAmount !== "null") {
            query.order = [
                ["totalAmount", `${req.query.totalAmount}`]
            ];
        }
        ;
        if (req.query.status !== "null") {
            query.where.status = req.query.status;
        }
        ;
        if (req.query.createdAt != "null") {
            query.order = [
                ["createdAt", `${req.query.createdAt}`]
            ];
        }
        ;
        const totalOrder = yield order_model_1.Orders.count(query);
        const page = Number(req.query.page) || 1;
        const pagination = (0, pagination_helper_1.funcPagination)(totalOrder, page, Number(req.query.limit));
        query.offset = pagination.skip;
        const orderList = yield order_model_1.Orders.findAll(query);
        const data = [];
        for (const item of orderList) {
            const rawData = Object.assign(Object.assign({}, item.dataValues), { createdAtFormat: (0, moment_1.default)(item.dataValues.createdAt).format("HH:mm DD/MM/YYYY"), updatedAtFormat: (0, moment_1.default)(item.dataValues.updatedAt).format("HH:mm DD/MM/YYYY") });
            data.push(rawData);
        }
        ;
        res.status(200).json({
            status: true,
            data: data,
            totalPage: pagination.totalPages,
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
exports.GetAllOrderAdminController = GetAllOrderAdminController;
const GetDetailOrderAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.Orders.findOne({
            include: [
                {
                    model: orders_items_model_1.Orders_items,
                    as: "items"
                }
            ],
            where: {
                id: Number(req.params.id),
                status: {
                    [sequelize_1.Op.notIn]: ["deleted"]
                }
            }
        });
        if (!order) {
            return res.status(404).json({
                status: false,
                msg: "Order not found!"
            });
        }
        ;
        const data = Object.assign(Object.assign({}, order === null || order === void 0 ? void 0 : order.dataValues), { createdAtFormat: (0, moment_1.default)(order.dataValues.createdAt).format("HH:mm DD/MM/YYYY") });
        res.status(200).json({
            status: true,
            data: data
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
exports.GetDetailOrderAdminController = GetDetailOrderAdminController;
const PutOrderAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.Orders.findOne({
            where: {
                id: req.params.id,
                status: {
                    [sequelize_1.Op.notIn]: ["deleted"]
                }
            }
        });
        if (!order) {
            return res.status(404).json({
                status: false,
                msg: "Order not found!"
            });
        }
        ;
        yield order.update({
            status: req.body.status,
            paymentStatus: req.body.paymentStatus
        });
        //Them phan gui email xac nhan trang thai don hang o day
        res.status(200).json({
            status: true,
            msg: "Order has edited!"
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
exports.PutOrderAdminController = PutOrderAdminController;
