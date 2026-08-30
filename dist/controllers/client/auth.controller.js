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
exports.ProfileClientEditController = exports.ProfileClientController = exports.LoginClientController = exports.RegisterClientController = exports.RenderOtpClientController = void 0;
const nodemailer_helper_1 = require("../../helpers/nodemailer.helper");
const nodeCache_helper_1 = require("../../helpers/nodeCache.helper");
const customer_model_1 = require("../../models/customer.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RenderOtpClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000);
        (0, nodemailer_helper_1.sendOtpNodemailer)(email, otp, `Mã OTP kích hoạt tài khoản là<p>${otp}</p>`);
        nodeCache_helper_1.cache.set(`${otp}`, email, 120);
        res.status(200).json({
            status: true,
            msg: "Otp has been response",
            otp: otp,
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
exports.RenderOtpClientController = RenderOtpClientController;
const RegisterClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkOtp = nodeCache_helper_1.cache.get(`${req.body.otp}`);
        if (!checkOtp) {
            return res.status(404).json({
                status: false,
                msg: "Otp expire or wrong!"
            });
        }
        ;
        const { fullName, email, password } = req.body;
        const checkEmail = yield customer_model_1.Customer.findOne({
            where: {
                email: email
            }
        });
        if (checkEmail) {
            return res.status(400).json({
                status: true,
                msg: "Your account has been existed"
            });
        }
        ;
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(password, salt);
        yield customer_model_1.Customer.create({
            fullName: fullName,
            email: email,
            password: hash,
        });
        res.status(200).json({
            status: true,
            msg: "Register successful!"
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
exports.RegisterClientController = RegisterClientController;
const LoginClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const account = yield customer_model_1.Customer.findOne({
            where: {
                email: req.body.email,
                status: "active"
            }
        });
        if (!account) {
            res.status(404).json({
                status: false,
                msg: "Email or password wrong!"
            });
        }
        ;
        const verifyPassword = bcryptjs_1.default.compareSync(req.body.password, account === null || account === void 0 ? void 0 : account.dataValues.password);
        if (!verifyPassword) {
            res.status(404).json({
                status: false,
                msg: "Email or password wrong!"
            });
        }
        ;
        const clientToken = jsonwebtoken_1.default.sign({
            id: account === null || account === void 0 ? void 0 : account.dataValues.id,
            fullName: account === null || account === void 0 ? void 0 : account.dataValues.fullName,
        }, String(process.env.JWT_CLIENT), { expiresIn: 30 * 24 * 60 * 60 });
        res.status(200).json({
            status: true,
            msg: "Login successful!",
            data: {
                id: account === null || account === void 0 ? void 0 : account.dataValues.id,
                fullName: account === null || account === void 0 ? void 0 : account.dataValues.fullName,
                email: account === null || account === void 0 ? void 0 : account.dataValues.email,
                address: account === null || account === void 0 ? void 0 : account.dataValues.address,
                phone: account === null || account === void 0 ? void 0 : account.dataValues.phone,
                image: (account === null || account === void 0 ? void 0 : account.dataValues.image) || "",
            },
            clientToken: clientToken
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            status: false,
            msg: "Email or password wrong!"
        });
    }
});
exports.LoginClientController = LoginClientController;
const ProfileClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            status: true,
            data: {
                id: req.client.id,
                fullName: req.client.fullName,
                email: req.client.email,
                address: req.client.address,
                phone: req.client.phone,
                image: req.client.image || "",
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "bad request"
        });
    }
});
exports.ProfileClientController = ProfileClientController;
const ProfileClientEditController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.client;
        const account = yield customer_model_1.Customer.findOne({
            where: {
                id: id,
                status: "active"
            }
        });
        if (!account) {
            return res.status(404).json({
                status: false,
                msg: "Account not found!"
            });
        }
        ;
        if (req.file) {
            req.body.image = req.file.path;
        }
        else {
            delete req.body.image;
        }
        yield account.update({
            fullName: req.body.fullName,
            address: req.body.address,
            phone: req.body.phone,
            image: req.body.image || account.dataValues.image
        });
        res.status(200).json({
            status: true,
            msg: "Your profile has been edited!"
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
exports.ProfileClientEditController = ProfileClientEditController;
