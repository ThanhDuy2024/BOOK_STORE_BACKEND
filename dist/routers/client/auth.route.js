"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../controllers/client/auth.controller");
const client_middleware_1 = require("../../middlewares/client.middleware");
const multer_1 = __importDefault(require("multer"));
const cloudianry_1 = require("../../configs/cloudianry");
const route = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: cloudianry_1.storage,
});
route.post("/otp", auth_controller_1.RenderOtpClientController);
route.post("/register", auth_controller_1.RegisterClientController);
route.post("/login", auth_controller_1.LoginClientController);
route.get("/profile", client_middleware_1.clientMiddleware, auth_controller_1.ProfileClientController);
route.put("/profile", client_middleware_1.clientMiddleware, upload.single("image"), auth_controller_1.ProfileClientEditController);
exports.default = route;
