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
exports.clientMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customer_model_1 = require("../models/customer.model");
const clientMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(404).json({
                status: false,
                msg: "Token not found"
            });
        }
        const decode = jsonwebtoken_1.default.verify(String(token), String(process.env.JWT_CLIENT));
        if (!decode) {
            return res.status(400).json({
                status: false,
                msg: "Token expires!"
            });
        }
        ;
        const customerAccountCheck = yield customer_model_1.Customer.findOne({
            attributes: { exclude: ["password"] },
            where: {
                id: decode.id,
            }
        });
        if (!(customerAccountCheck === null || customerAccountCheck === void 0 ? void 0 : customerAccountCheck.dataValues)) {
            return res.status(404).json({
                status: false,
                msg: "[Middleware] Account not found!"
            });
        }
        ;
        req.client = customerAccountCheck.dataValues;
        next();
    }
    catch (error) {
        console.log(error);
    }
});
exports.clientMiddleware = clientMiddleware;
