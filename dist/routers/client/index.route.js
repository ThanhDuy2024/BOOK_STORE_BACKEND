"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const books_route_1 = __importDefault(require("./books.route"));
const order_route_1 = __importDefault(require("./order.route"));
const route = (0, express_1.Router)();
route.use("/auth", auth_route_1.default);
route.use("/books", books_route_1.default);
route.use("/order", order_route_1.default);
exports.default = route;
