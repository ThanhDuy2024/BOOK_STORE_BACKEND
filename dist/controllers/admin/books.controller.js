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
exports.DeleteBookController = exports.UpdateBookController = exports.DetailBookController = exports.GetBookController = exports.PostBookController = void 0;
const categories_model_1 = require("../../models/categories.model");
const sequelize_1 = require("sequelize");
const books_model_1 = require("../../models/books.model");
const moment_1 = __importDefault(require("moment"));
const books_categories_model_1 = require("../../models/books_categories.model");
const admin_model_1 = require("../../models/admin.model");
const pagination_helper_1 = require("../../helpers/pagination.helper");
const limit = 10;
const PostBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file) {
            req.body.image = req.file.path;
        }
        else {
            delete req.body.image;
        }
        ;
        //const categories = JSON.parse(req.body.categories);
        const categories = req.body.categories;
        const checkCategories = yield categories_model_1.Categories.findAll({
            where: {
                id: {
                    [sequelize_1.Op.in]: categories
                }
            }
        });
        if (checkCategories.length === 0) {
            return res.status(404).json({
                status: false,
                msg: "Categories not found!"
            });
        }
        ;
        const book = yield books_model_1.Books.create({
            bookName: req.body.bookName,
            quantity: Number(req.body.quantity),
            author: req.body.author,
            publishing: req.body.publishing,
            price: Number(req.body.price),
            publication: (0, moment_1.default)(req.body.publication).format("DD/MM/YYYY"),
            status: req.body.status,
            image: req.body.image || "",
            description: req.body.description,
            createdBy: req.admin.id,
            updatedBy: req.admin.id,
        });
        const categoriesData = categories.map((item) => ({
            bookId: book.id,
            categoryId: item
        }));
        yield books_categories_model_1.Books_Categories.bulkCreate(categoriesData);
        res.status(200).json({
            status: true,
            msg: "Book has been created!"
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
exports.PostBookController = PostBookController;
const GetBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            nest: true,
            distinct: true,
            include: [
                {
                    model: admin_model_1.Admin,
                    as: "creator",
                    attributes: ["id", "adminName"]
                },
                {
                    model: admin_model_1.Admin,
                    as: "updater",
                    attributes: ["id", "adminName"]
                },
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
                status: {
                    [sequelize_1.Op.in]: ["active", "inactive"]
                }
            },
            order: [
                ['updatedAt', 'desc']
            ],
            offset: 0,
            limit: limit
        };
        if (req.query.search !== "null") {
            query.where.bookName = {
                [sequelize_1.Op.iLike]: `%${String(req.query.search).trim()}%`
            };
        }
        ;
        if (req.query.status !== "all") {
            query.where.status = req.query.status;
        }
        ;
        if (req.query.sortUpdatedAt === "desc") {
            query.order = [["updatedAt", "DESC"]];
        }
        else {
            query.order = [["updatedAt", "ASC"]];
        }
        if (req.query.priceFilter !== "null") {
            query.order = [
                ["price", String(req.query.priceFilter).toUpperCase()]
            ];
        }
        ;
        if (req.query.quantityFilter !== "null") {
            query.order = [
                ["quantity", String(req.query.quantityFilter).toUpperCase()]
            ];
        }
        ;
        const page = Number(req.query.page) || 1;
        const totalItem = yield books_model_1.Books.count(query);
        const totalActive = yield books_model_1.Books.count({
            where: {
                status: "active",
            }
        });
        const totalInactive = yield books_model_1.Books.count({
            where: {
                status: "inactive",
            }
        });
        const totalQuantity = yield books_model_1.Books.sum("quantity");
        const pagination = (0, pagination_helper_1.funcPagination)(Number(totalItem), page, limit);
        query.offset = pagination.skip;
        const books = yield books_model_1.Books.findAll(query);
        const data = [];
        for (const item of books) {
            const rawData = Object.assign(Object.assign({}, item.dataValues), { createdAtFormat: (0, moment_1.default)(item.dataValues.createdAt).format("HH:mm DD/MM/YYYY"), updatedAtFormat: (0, moment_1.default)(item.dataValues.updatedAt).format("HH:mm DD/MM/YYYY") });
            data.push(rawData);
        }
        ;
        res.status(200).json({
            status: true,
            data: data,
            totalPage: pagination.totalPages,
            totalBook: totalItem,
            totalActive: totalActive,
            totalInactive: totalInactive,
            totalQuantity: totalQuantity
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
exports.GetBookController = GetBookController;
const DetailBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const book = yield books_model_1.Books.findOne({
            nest: true,
            include: [
                {
                    model: categories_model_1.Categories,
                    as: "categories",
                    attributes: ["id", "categoryName"]
                },
            ],
            where: {
                id: id,
                status: {
                    [sequelize_1.Op.in]: ["active", "inactive"]
                }
            }
        });
        res.status(200).json({
            status: true,
            data: book.dataValues
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
exports.DetailBookController = DetailBookController;
const UpdateBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const book = yield books_model_1.Books.findOne({
            where: {
                id: id,
                status: {
                    [sequelize_1.Op.in]: ["active", "inactive"]
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
        if (req.file) {
            req.body.image = req.file.path;
        }
        else {
            delete req.body.image;
        }
        const categories = req.body.categories;
        const checkCategories = yield categories_model_1.Categories.findAll({
            where: {
                id: {
                    [sequelize_1.Op.in]: categories
                }
            }
        });
        if (checkCategories.length === 0) {
            return res.status(404).json({
                status: false,
                msg: "Categories not found!"
            });
        }
        ;
        yield books_model_1.Books.update({
            bookName: req.body.bookName,
            quantity: Number(req.body.quantity),
            author: req.body.author,
            publishing: req.body.publishing,
            price: Number(req.body.price),
            publication: (0, moment_1.default)(req.body.publication).format("DD/MM/YYYY"),
            status: req.body.status,
            image: req.body.image || book.dataValues.image,
            description: req.body.description,
            createdBy: req.admin.id,
            updatedBy: req.admin.id,
        }, {
            where: {
                id: id,
            }
        });
        yield books_categories_model_1.Books_Categories.destroy({
            where: {
                bookId: id,
            }
        });
        const categoriesData = categories.map((item) => ({
            bookId: id,
            categoryId: item
        }));
        yield books_categories_model_1.Books_Categories.bulkCreate(categoriesData);
        res.status(200).json({
            status: true,
            msg: "Book has been updated!"
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
exports.UpdateBookController = UpdateBookController;
const DeleteBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const book = yield books_model_1.Books.findOne({
            where: {
                id: id,
                status: {
                    [sequelize_1.Op.in]: ["active", "inactive"]
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
        yield book.update({
            status: "deleted"
        });
        res.status(200).json({
            status: true,
            msg: "Book has been deleted"
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
exports.DeleteBookController = DeleteBookController;
