"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../../controllers/admin/admin.controller");
const cloudianry_1 = require("../../configs/cloudianry");
const multer_1 = __importDefault(require("multer"));
const route = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: cloudianry_1.storage
});
route.get("/roles/list", admin_controller_1.GetRoleInAdminController);
route.post("/otp", admin_controller_1.RenderCreateAdminOtp);
route.post("/", upload.single("image"), admin_controller_1.CreateAdminController);
route.get("/", admin_controller_1.GetAdminController);
route.get("/:id", admin_controller_1.DetailAdminController);
route.put("/:id", upload.single("image"), admin_controller_1.UpdateAdminController);
route.put("/delete/:id", admin_controller_1.DeleteAdminController);
exports.default = route;
