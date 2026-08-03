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
exports.AdminProfile = exports.LoginAdminController = exports.RegisterAdminController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const moment_1 = __importDefault(require("moment"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_model_1 = require("../../../models/admin.model");
const RegisterAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminName, fullName, email, password } = req.body;
        const adminNameCheck = yield admin_model_1.Admin.findOne({
            where: {
                adminName: adminName,
            }
        });
        const emailCheck = yield admin_model_1.Admin.findOne({
            where: {
                email: email,
            }
        });
        if ((adminNameCheck === null || adminNameCheck === void 0 ? void 0 : adminNameCheck.dataValues) || (emailCheck === null || emailCheck === void 0 ? void 0 : emailCheck.dataValues)) {
            return res.status(400).json({
                status: false,
                msg: "Admin name or email have existed!"
            });
        }
        ;
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(password, salt);
        yield admin_model_1.Admin.create({
            adminName: adminName,
            fullName: fullName,
            email: email,
            password: hash
        });
        res.status(200).json({
            status: true,
            msg: "Register completed!"
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
exports.RegisterAdminController = RegisterAdminController;
const LoginAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminName, password } = req.body;
        const adminNameCheck = yield admin_model_1.Admin.findOne({
            where: {
                adminName: adminName,
                status: "active",
            }
        });
        if (!(adminNameCheck === null || adminNameCheck === void 0 ? void 0 : adminNameCheck.dataValues)) {
            return res.status(400).json({
                status: false,
                msg: "Wrong adminName or passowrd",
            });
        }
        ;
        const compare = bcryptjs_1.default.compare(password, adminNameCheck === null || adminNameCheck === void 0 ? void 0 : adminNameCheck.dataValues.password);
        if (!compare) {
            return res.status(400).json({
                status: false,
                msg: "Wrong adminName or passowrd",
            });
        }
        ;
        const adminAccount = adminNameCheck.dataValues;
        const data = {
            id: adminAccount.id,
            adminName: adminAccount.adminName,
            fullName: adminAccount.fullName,
            email: adminAccount.email,
            address: adminAccount.address || "",
            phone: adminAccount.phone || "",
            image: adminAccount.image || "",
            status: adminAccount.status || "",
            roleId: adminAccount.roleId || 1,
            updatedBy: adminAccount.updatedBy || 1,
            createdBy: adminAccount.createdBy || 1,
            createdAt: (0, moment_1.default)(adminAccount.createdAt).format("HH:mm DD/MM/YYYY"),
            updatedAt: (0, moment_1.default)(adminAccount.updatedAt).format("HH:mm DD/MM/YYYY")
        };
        const token = jsonwebtoken_1.default.sign({
            id: data.id,
            fullName: data.fullName,
            image: data.image
        }, String(process.env.JWT_SECRET), { expiresIn: 30 * 24 * 60 * 60 });
        res.status(200).json({
            status: true,
            msg: "Login completed!",
            token: token,
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
exports.LoginAdminController = LoginAdminController;
const AdminProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            status: true,
            data: req.admin,
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
exports.AdminProfile = AdminProfile;
