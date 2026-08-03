"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const categories_route_1 = __importDefault(require("./categories.route"));
const book_route_1 = __importDefault(require("./book.route"));
const admin_middleware_1 = require("../../middlewares/admin.middleware");
const route = (0, express_1.Router)();
route.use("/auth", auth_route_1.default);
route.use("/categories", categories_route_1.default);
route.use("/books", admin_middleware_1.adminMiddleware, book_route_1.default);
exports.default = route;
