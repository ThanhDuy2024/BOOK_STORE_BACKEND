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
exports.RecoveryCategoryController = exports.DeleteCategoryController = exports.UpdateCategoryController = exports.GetCategoryController = exports.CreateCategoryController = void 0;
const categories_model_1 = require("../../../models/categories.model");
const admin_model_1 = require("../../../models/admin.model");
const sequelize_1 = require("sequelize");
const pagination_helper_1 = require("../../../helpers/pagination.helper");
const moment_1 = __importDefault(require("moment"));
const limit = 10;
const CreateCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file) {
            req.body.image = req.file.path;
        }
        else {
            delete req.body.image;
        }
        ;
        const category = yield categories_model_1.Categories.findOne({
            where: {
                categoryName: {
                    [sequelize_1.Op.iLike]: req.body.categoryName
                },
                status: {
                    [sequelize_1.Op.in]: ["active", "inactive"]
                }
            }
        });
        if (category) {
            return res.status(400).json({
                status: false,
                msg: "Category has existed!"
            });
        }
        ;
        yield categories_model_1.Categories.create({
            categoryName: req.body.categoryName,
            status: req.body.status,
            image: req.body.image || "",
            updatedBy: req.admin.id,
            createdBy: req.admin.id
        });
        res.status(200).json({
            status: true,
            msg: "Category has created"
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
exports.CreateCategoryController = CreateCategoryController;
const GetCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                }
            ],
            where: {
                status: {
                    [sequelize_1.Op.in]: ['active', 'inactive']
                }
            },
            order: [
                ["updatedAt", "desc"]
            ],
            offset: 0,
            limit: limit
        };
        if (req.query.search !== "null") {
            query.where.categoryName = {
                [sequelize_1.Op.iLike]: `%${String(req.query.search).trim()}%`
            };
        }
        if (req.query.status != "all") {
            query.where.status = req.query.status;
        }
        if (req.query.updatedAt != "desc") {
            query.order = [["updatedAt", 'asc']];
        }
        ;
        const totalStatus = yield categories_model_1.Categories.count({
            where: {
                status: {
                    [sequelize_1.Op.in]: ["active", "inactive"]
                }
            }
        });
        const totalStatusActive = yield categories_model_1.Categories.count({
            where: {
                status: "active"
            }
        });
        const totalStatusInactive = yield categories_model_1.Categories.count({
            where: {
                status: "inactive"
            }
        });
        const totalItem = yield categories_model_1.Categories.count(query);
        const pagination = (0, pagination_helper_1.funcPagination)(Number(totalItem), Number(req.query.page), limit);
        query.offset = pagination.skip;
        const categories = yield categories_model_1.Categories.findAll(query);
        const data = [];
        for (const item of categories) {
            const rawData = Object.assign(Object.assign({}, item.dataValues), { createdAtFormat: (0, moment_1.default)(item.dataValues.createdAt).format("HH:mm DD/MM/YYYY"), updatedAtFormat: (0, moment_1.default)(item.dataValues.updatedAt).format("HH:mm DD/MM/YYYY") });
            data.push(rawData);
        }
        ;
        res.status(200).json({
            status: true,
            data: data,
            totalPages: pagination.totalPages,
            totalStatus: totalStatus,
            totalStatusActive: totalStatusActive,
            totalStatusInactive: totalStatusInactive
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
exports.GetCategoryController = GetCategoryController;
const UpdateCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file) {
            req.body.image = req.file.path;
        }
        else {
            delete req.body.image;
        }
        ;
        const category = yield categories_model_1.Categories.findByPk(Number(req.params.id));
        if (!category) {
            return res.status(404).json({
                status: true,
                msg: "Category not found!"
            });
        }
        if (req.body.image) {
            yield category.update({
                categoryName: req.body.categoryName,
                status: req.body.status,
                image: req.body.image
            });
        }
        else {
            yield category.update({
                categoryName: req.body.categoryName,
                status: req.body.status,
            });
        }
        res.status(200).json({
            status: true,
            msg: "Update successful!"
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
exports.UpdateCategoryController = UpdateCategoryController;
const DeleteCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categories_model_1.Categories.findByPk(Number(req.params.id));
        if (!category) {
            return res.status(404).json({
                status: false,
                msg: "Category not found!"
            });
        }
        ;
        yield category.update({
            status: "deleted"
        });
        res.status(200).json({
            status: true,
            msg: "Delete successful!"
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
exports.DeleteCategoryController = DeleteCategoryController;
const RecoveryCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categories_model_1.Categories.findByPk(Number(req.params.id));
        if (!category) {
            return res.status(404).json({
                status: false,
                msg: "Category not found!"
            });
        }
        ;
        yield category.update({
            status: "active"
        });
        res.status(200).json({
            status: true,
            msg: "Recovery successful!"
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
exports.RecoveryCategoryController = RecoveryCategoryController;
