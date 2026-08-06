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
exports.DeleteRoleController = exports.DetailRoleController = exports.UpdateRoleController = exports.GetRoleController = exports.CreateRoleController = void 0;
const roles_model_1 = require("../../models/roles.model");
const sequelize_1 = require("sequelize");
const admin_model_1 = require("../../models/admin.model");
const moment_1 = __importDefault(require("moment"));
const pagination_helper_1 = require("../../helpers/pagination.helper");
const limit = 10;
const CreateRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roleName, permission } = req.body;
        const checkRoleName = yield roles_model_1.Roles.findOne({
            where: {
                roleName: {
                    [sequelize_1.Op.iLike]: `${roleName}`
                }
            }
        });
        if (checkRoleName) {
            return res.status(400).json({
                status: false,
                msg: "Role name has been existed!"
            });
        }
        ;
        yield roles_model_1.Roles.create({
            roleName: roleName,
            permission: permission,
            status: req.body.status,
            createdBy: req.admin.id,
            updatedBy: req.admin.id
        });
        res.status(200).json({
            status: true,
            msg: "Role has been created"
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
exports.CreateRoleController = CreateRoleController;
const GetRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            include: [
                {
                    model: admin_model_1.Admin,
                    attributes: ["id", "adminName"],
                    as: "creator"
                },
                {
                    model: admin_model_1.Admin,
                    attributes: ["id", "adminName"],
                    as: "updater"
                },
            ],
            where: {
                status: {
                    [sequelize_1.Op.in]: ["active", "inactive"]
                }
            },
            order: [
                ["updatedAt", "DESC"]
            ],
            offset: 0,
            limit: limit
        };
        if (req.query.search != "null") {
            query.where.roleName = {
                [sequelize_1.Op.iLike]: `%${req.query.search}%`
            };
        }
        ;
        if (req.query.status != "all") {
            query.where.status = req.query.status;
        }
        const page = req.query.page || 1;
        const totalItem = yield roles_model_1.Roles.count(query);
        const pagination = (0, pagination_helper_1.funcPagination)(totalItem, Number(page), limit);
        query.offset = pagination.skip;
        const roles = yield roles_model_1.Roles.findAll(query);
        const data = [];
        for (const item of roles) {
            const rawData = Object.assign(Object.assign({}, item.dataValues), { createdAtFormat: (0, moment_1.default)(item.dataValues.createdAt).format("HH:mm DD/MM/YYYY"), updatedAtFormat: (0, moment_1.default)(item.dataValues.updatedAt).format("HH:mm DD/MM/YYYY") });
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
exports.GetRoleController = GetRoleController;
const UpdateRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roleName, status, permission } = req.body;
        const role = yield roles_model_1.Roles.findByPk(Number(req.params.id));
        if (!role) {
            return res.status(404).json({
                status: false,
                msg: "Role not found"
            });
        }
        ;
        yield role.update({
            roleName: roleName,
            status: status,
            permission: permission,
            updatedBy: req.admin.id,
        });
        res.status(200).json({
            status: true,
            msg: "Role has been updated"
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
exports.UpdateRoleController = UpdateRoleController;
const DetailRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const role = yield roles_model_1.Roles.findOne({
            where: {
                id: id,
                status: {
                    [sequelize_1.Op.in]: ["active", "inactive"]
                }
            }
        });
        if (!role) {
            return res.status(404).json({
                status: false,
                msg: "Role not found!"
            });
        }
        ;
        res.status(200).json({
            status: true,
            data: role
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
exports.DetailRoleController = DetailRoleController;
const DeleteRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const role = yield roles_model_1.Roles.findOne({
            where: {
                id: id,
                status: {
                    [sequelize_1.Op.in]: ["active", "inactive"]
                }
            }
        });
        if (!role) {
            return res.status(404).json({
                status: false,
                msg: "Role not found!"
            });
        }
        ;
        yield role.update({
            status: "deleted"
        });
        res.status(200).json({
            status: true,
            msg: "Role has been deleted"
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
exports.DeleteRoleController = DeleteRoleController;
