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
exports.GetRoleInAdminController = exports.RecoveryAdminController = exports.DeleteAdminController = exports.UpdateAdminController = exports.DetailAdminController = exports.GetAdminController = exports.CreateAdminController = exports.RenderCreateAdminOtp = void 0;
const nodemailer_helper_1 = require("../../helpers/nodemailer.helper");
const nodeCache_helper_1 = require("../../helpers/nodeCache.helper");
const admin_model_1 = require("../../models/admin.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const roles_model_1 = require("../../models/roles.model");
const sequelize_1 = require("sequelize");
const moment_1 = __importDefault(require("moment"));
const pagination_helper_1 = require("../../helpers/pagination.helper");
const htmlContent_helper_1 = require("../../helpers/htmlContent.helper");
const limit = 10;
const RenderCreateAdminOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000);
        (0, nodemailer_helper_1.sendOtpNodemailer)(email, otp, (0, htmlContent_helper_1.otpHtml)(otp));
        nodeCache_helper_1.cache.set(`${otp}`, email, 120);
        res.status(200).json({
            status: true,
            msg: "Otp has been response"
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
exports.RenderCreateAdminOtp = RenderCreateAdminOtp;
const CreateAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const checkOtp = cache.get(`${req.body.otp}`);
        // if (!checkOtp) {
        //     return res.status(404).json({
        //         status: false,
        //         msg: "Otp expire or wrong!"
        //     })
        // };
        if (req.file) {
            req.body.image = req.file.path;
        }
        else {
            delete req.body.image;
        }
        ;
        const checkAccount = yield admin_model_1.Admin.findOne({
            where: {
                adminName: req.body.adminName,
            }
        });
        if (checkAccount) {
            return res.status(400).json({
                status: false,
                msg: "Admin account was being exist!"
            });
        }
        const checkEmail = yield admin_model_1.Admin.findOne({
            where: {
                email: req.body.email,
            }
        });
        if (checkEmail) {
            return res.status(400).json({
                status: false,
                msg: "Admin account was being exist!"
            });
        }
        const checkRole = yield roles_model_1.Roles.findOne({
            where: {
                id: req.body.roleId,
                status: "active"
            }
        });
        if (!checkRole) {
            return res.status(404).json({
                status: false,
                msg: "Role not found!"
            });
        }
        ;
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(String(req.body.password), salt);
        yield admin_model_1.Admin.create({
            adminName: req.body.adminName,
            fullName: req.body.fullName,
            email: req.body.email,
            password: hash,
            address: req.body.address,
            phone: req.body.phone,
            image: req.body.image || "",
            status: req.body.status,
            roleId: req.body.roleId,
            createdBy: req.admin.id,
            updatedBy: req.admin.id,
        });
        res.status(200).json({
            status: true,
            msg: "Admin has been created!"
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
exports.CreateAdminController = CreateAdminController;
const GetAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            nest: true,
            include: [
                {
                    model: roles_model_1.Roles,
                    as: "role",
                    attributes: ["id", "roleName"],
                }
            ],
            where: {
                status: {
                    [sequelize_1.Op.in]: ["active", "inactive"]
                }
            },
            order: [
                ["createdAt", "DESC"]
            ],
            limit: limit,
            offset: 0,
        };
        if (req.query.search != "null") {
            query.where.adminName = {
                [sequelize_1.Op.iLike]: `%${req.query.search}%`
            };
        }
        ;
        if (req.query.status != "all") {
            query.where.status = req.query.status;
        }
        ;
        if (req.query.createdAtFilter == "desc") {
            query.order = [
                ["createdAt", "DESC"]
            ];
        }
        else {
            query.order = [
                ["createdAt", "ASC"]
            ];
        }
        const page = req.query.page || 1;
        const totalItem = yield admin_model_1.Admin.count(query);
        const pagination = (0, pagination_helper_1.funcPagination)(totalItem, page, limit);
        query.offset = pagination.skip;
        const account = yield admin_model_1.Admin.findAll(query);
        const data = [];
        for (const item of account) {
            const rawData = Object.assign(Object.assign({}, item.dataValues), { createdAtFormat: (0, moment_1.default)(item.dataValues.createdAt).format("HH:mm DD/MM/YYYY"), updatedAtFormat: (0, moment_1.default)(item.dataValues.updatedAtFormat).format("HH:mm DD/MM/YYYY") });
            data.push(rawData);
        }
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
            msg: "Bad request!"
        });
    }
});
exports.GetAdminController = GetAdminController;
const DetailAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const account = yield admin_model_1.Admin.findOne({
            where: {
                id: id,
                status: {
                    [sequelize_1.Op.in]: ["active", "inactive"]
                }
            }
        });
        if (!account) {
            return res.status(404).json({
                status: false,
                msg: "Admin account not found!"
            });
        }
        ;
        res.status(200).json({
            status: true,
            data: account,
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
exports.DetailAdminController = DetailAdminController;
const UpdateAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const account = yield admin_model_1.Admin.findOne({
            where: {
                id: id,
                status: {
                    [sequelize_1.Op.in]: ["active", "inactive"]
                }
            }
        });
        if (!account) {
            return res.status(404).json({
                status: false,
                msg: "Admin account not found!"
            });
        }
        ;
        if (req.file) {
            req.body.image = req.file.path;
        }
        else {
            delete req.body.image;
        }
        ;
        yield account.update({
            fullName: req.body.fullName,
            address: req.body.address,
            phone: req.body.phone,
            image: req.body.image || account.dataValues.image,
            status: req.body.status,
            roleId: req.body.roleId,
            updatedBy: req.admin.id,
        });
        res.status(200).json({
            status: true,
            msg: "Admin has been updated!"
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
exports.UpdateAdminController = UpdateAdminController;
const DeleteAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const account = yield admin_model_1.Admin.findOne({
            where: {
                id: id,
                status: {
                    [sequelize_1.Op.in]: ["active", "inactive"]
                }
            }
        });
        if (!account) {
            return res.status(404).json({
                status: false,
                msg: "Admin account not found!"
            });
        }
        ;
        yield account.update({
            status: "deleted"
        });
        res.status(200).json({
            status: true,
            msg: "Admin has been deleted!"
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
exports.DeleteAdminController = DeleteAdminController;
const RecoveryAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            status: true,
            msg: "Admin has been created!"
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
exports.RecoveryAdminController = RecoveryAdminController;
const GetRoleInAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield roles_model_1.Roles.findAll({
            where: {
                status: {
                    [sequelize_1.Op.in]: ["active"]
                }
            }
        });
        res.status(200).json({
            status: true,
            data: roles
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
exports.GetRoleInAdminController = GetRoleInAdminController;
