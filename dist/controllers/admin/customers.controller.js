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
exports.PutCustomerAdminController = exports.GetCustomerAdminController = exports.GetAllCustomerAdminController = void 0;
const customer_model_1 = require("../../models/customer.model");
const sequelize_1 = require("sequelize");
const moment_1 = __importDefault(require("moment"));
const pagination_helper_1 = require("../../helpers/pagination.helper");
const comments_model_1 = require("../../models/comments.model");
const GetAllCustomerAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            attributes: { exclude: ['password'] },
            where: {
                status: {
                    [sequelize_1.Op.in]: ["active", "inactive"]
                },
            },
            order: [
                ["createdAt", "desc"]
            ],
            offset: 0,
            limit: req.query.limit || 10
        };
        if (req.query.search != "null") {
            query.where.fullName = {
                [sequelize_1.Op.iLike]: `%${req.query.search}%`
            };
        }
        ;
        if (req.query.email_search != "null") {
            query.where.email = `${req.query.email_search}`;
        }
        ;
        if (req.query.status != "null") {
            query.where.status = req.query.status;
        }
        ;
        const page = Number(req.query.page) || 1;
        const totalCustomers = yield customer_model_1.Customer.count(query);
        const pagination = (0, pagination_helper_1.funcPagination)(totalCustomers, page, Number(req.query.limit));
        query.offset = pagination.skip;
        const customers = yield customer_model_1.Customer.findAll(query);
        const data = [];
        for (const item of customers) {
            const rawData = Object.assign(Object.assign({}, item.dataValues), { createdAtFormat: (0, moment_1.default)(item.dataValues.createdAt).format("HH:mm DD/MM/YYYY") });
            data.push(rawData);
        }
        ;
        res.status(200).json({
            status: true,
            data: data,
            totalPage: pagination.totalPages
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
exports.GetAllCustomerAdminController = GetAllCustomerAdminController;
const GetCustomerAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield customer_model_1.Customer.findOne({
            attributes: { exclude: ["password"] },
            include: [
                {
                    model: comments_model_1.Comments,
                    as: "comments"
                }
            ],
            where: {
                id: req.params.id,
                status: {
                    [sequelize_1.Op.in]: ["active", "inactive"]
                }
            }
        });
        if (!customer) {
            return res.status(404).json({
                status: false,
                msg: "Customer not found!"
            });
        }
        customer.dataValues.createdAtFormat = (0, moment_1.default)(customer.dataValues.createdAt).format("HH:mm DD/MM/YYYY");
        const comments = customer.dataValues.comments;
        const newCommentsList = [];
        for (const item of comments) {
            const rawData = Object.assign(Object.assign({}, item.dataValues), { createdAtFormat: (0, moment_1.default)(item.dataValues.createdAt).format("HH:mm DD/MM/YYYY") });
            newCommentsList.push(rawData);
        }
        ;
        customer.dataValues.comments = newCommentsList;
        res.status(200).json({
            status: true,
            data: customer.dataValues
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
exports.GetCustomerAdminController = GetCustomerAdminController;
const PutCustomerAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield customer_model_1.Customer.findOne({
            where: {
                id: req.params.id,
                status: {
                    [sequelize_1.Op.in]: ["active", "inactive"]
                }
            }
        });
        if (!customer) {
            return res.status(404).json({
                status: false,
                msg: "Customer not found!"
            });
        }
        ;
        yield customer.update({
            status: req.body.status
        });
        res.status(200).json({
            status: true,
            msg: "Customer has edited!"
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
exports.PutCustomerAdminController = PutCustomerAdminController;
