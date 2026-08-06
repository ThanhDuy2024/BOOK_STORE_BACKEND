"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_middleware_1 = require("../../middlewares/admin.middleware");
const categories_controller_1 = require("../../controllers/admin/categories/categories.controller");
const multer_1 = __importDefault(require("multer"));
const cloudianry_1 = require("../../configs/cloudianry");
const upload = (0, multer_1.default)({
    storage: cloudianry_1.storage
});
const route = (0, express_1.Router)();
route.post("/", admin_middleware_1.adminMiddleware, upload.single("image"), categories_controller_1.CreateCategoryController);
route.get("/", admin_middleware_1.adminMiddleware, categories_controller_1.GetCategoryController);
route.get("/for-book", admin_middleware_1.adminMiddleware, categories_controller_1.GetCategoriesControllerForBooks);
route.put("/:id", admin_middleware_1.adminMiddleware, upload.single("image"), categories_controller_1.UpdateCategoryController);
route.delete("/:id", admin_middleware_1.adminMiddleware, categories_controller_1.DeleteCategoryController);
route.put("/recovery/:id", admin_middleware_1.adminMiddleware, categories_controller_1.RecoveryCategoryController);
exports.default = route;
