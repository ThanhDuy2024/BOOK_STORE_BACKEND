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
exports.GetAllCommentClientInProductController = exports.PostCommentClientController = void 0;
const books_model_1 = require("../../models/books.model");
const comments_model_1 = require("../../models/comments.model");
const moment_1 = __importDefault(require("moment"));
const customer_model_1 = require("../../models/customer.model");
const pagination_helper_1 = require("../../helpers/pagination.helper");
const PostCommentClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_model_1.Books.findOne({
            where: {
                id: req.body.id,
                status: "active"
            }
        });
        if (!book) {
            return res.status(404).json({
                status: false,
                msg: "Book not found!"
            });
        }
        ;
        yield comments_model_1.Comments.create({
            productId: req.body.id,
            customerId: req.client.id,
            comment: req.body.comment,
        });
        res.status(200).json({
            status: true,
            msg: "Post comment successful!"
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
exports.PostCommentClientController = PostCommentClientController;
const GetAllCommentClientInProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            include: [
                {
                    model: customer_model_1.Customer,
                    as: 'customer',
                    attributes: ["id", "fullName"]
                }
            ],
            where: {
                productId: req.params.id,
                status: "active"
            },
            order: [
                ["createdAt", "DESC"]
            ],
            offset: 0,
            limit: req.query.limit || 5
        };
        const totalItem = yield comments_model_1.Comments.count(query);
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const pagination = (0, pagination_helper_1.funcPagination)(totalItem, page, limit);
        query.offset = pagination.skip;
        const comments = yield comments_model_1.Comments.findAll(query);
        const data = [];
        for (const item of comments) {
            const rawData = Object.assign(Object.assign({}, item.dataValues), { createdAtFormat: (0, moment_1.default)(item.dataValues.createdAt).format("HH:mm DD/MM/YYYY") });
            data.push(rawData);
        }
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
            msg: "Bad request!"
        });
    }
});
exports.GetAllCommentClientInProductController = GetAllCommentClientInProductController;
