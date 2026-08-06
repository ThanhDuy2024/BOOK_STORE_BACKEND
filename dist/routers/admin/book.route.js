"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_controller_1 = require("../../controllers/admin/books.controller");
const multer_1 = __importDefault(require("multer"));
const cloudianry_1 = require("../../configs/cloudianry");
const route = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: cloudianry_1.storage,
});
route.post("/", upload.single("image"), books_controller_1.PostBookController);
route.get("/", books_controller_1.GetBookController);
route.get("/:id", books_controller_1.DetailBookController);
route.put("/:id", upload.single("image"), books_controller_1.UpdateBookController);
route.put("/delete/:id", books_controller_1.DeleteBookController);
exports.default = route;
