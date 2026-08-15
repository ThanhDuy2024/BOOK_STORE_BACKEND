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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDetailBookClientController = exports.GetAllBookClientController = void 0;
const books_model_1 = require("../../models/books.model");
const sequelize_1 = require("sequelize");
const categories_model_1 = require("../../models/categories.model");
const pagination_helper_1 = require("../../helpers/pagination.helper");
const GetAllBookClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            nest: true,
            include: [
                {
                    model: categories_model_1.Categories,
                    as: "categories",
                    attributes: ["id", "categoryName"],
                    where: {
                        status: "active"
                    }
                }
            ],
            where: {
                status: "active",
                quantity: {
                    [sequelize_1.Op.gte]: 0
                }
            },
            offset: 0,
            limit: req.query.limit || 10,
            order: [
                ["totalSale", "DESC"]
            ]
        };
        if (req.query.category != "all") {
            query.include[0].where.id = Number(req.query.category);
        }
        ;
        if (req.query.searchBookName != "null") {
            query.where.bookName = {
                [sequelize_1.Op.iLike]: `%${req.query.searchBookName}%`
            };
        }
        ;
        if (req.query.searchAuthor != "null") {
            query.where.author = {
                [sequelize_1.Op.iLike]: `%${req.query.searchAuthor}%`
            };
        }
        ;
        if (req.query.priceFilter != "null") {
            if (req.query.priceFilter === "desc") {
                query.order = [
                    ["price", "DESC"]
                ];
            }
            else {
                query.order = [
                    ["price", "ASC"]
                ];
            }
        }
        if (req.query.sortCreatedAt != "null") {
            if (req.query.sortCreatedAt === "desc") {
                query.order = [
                    ["createdAt", "DESC"]
                ];
            }
            else {
                query.order = [
                    ["createdAt", "ASC"]
                ];
            }
        }
        const page = Number(req.query.page) || 1;
        const totalItem = yield books_model_1.Books.count(query);
        const pagination = (0, pagination_helper_1.funcPagination)(totalItem, page, Number(req.query.limit));
        query.offset = pagination.skip;
        const books = yield books_model_1.Books.findAll(query);
        res.status(200).json({
            status: true,
            data: books,
            totalPage: pagination.totalPages
        });
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            status: true,
            msg: "Bad request!"
        });
    }
});
exports.GetAllBookClientController = GetAllBookClientController;
const GetDetailBookClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const book = yield books_model_1.Books.findOne({
            include: [
                {
                    model: categories_model_1.Categories,
                    as: "categories",
                    attributes: ["id", "categoryName"],
                    where: {
                        status: "active"
                    }
                }
            ],
            where: {
                id: id,
                status: "active",
                quantity: {
                    [sequelize_1.Op.gte]: 0
                }
            }
        });
        if (!book) {
            return res.status(404).json({
                status: false,
                msg: "Book not found!"
            });
        }
        ;
        res.status(200).json({
            status: true,
            data: book.dataValues
        });
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            status: true,
            msg: "Bad request!"
        });
    }
});
exports.GetDetailBookClientController = GetDetailBookClientController;
