"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../../controllers/client/order.controller");
const route = (0, express_1.Router)();
route.post("/", order_controller_1.PostOrderClientController);
route.post("/zalopay", order_controller_1.PostOrderZaloClientController);
exports.default = route;
