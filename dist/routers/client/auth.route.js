"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../controllers/client/auth.controller");
const route = (0, express_1.Router)();
route.post("/otp", auth_controller_1.RenderOtpClientController);
route.post("/register", auth_controller_1.RegisterClientController);
route.post("/login", auth_controller_1.LoginClientController);
exports.default = route;
