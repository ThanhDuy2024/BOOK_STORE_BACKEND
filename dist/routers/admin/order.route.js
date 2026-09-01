"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../../controllers/admin/order.controller");
const route = (0, express_1.Router)();
route.get("/", order_controller_1.GetAllOrderAdminController);
route.get("/:id", order_controller_1.GetDetailOrderAdminController);
route.put("/:id", order_controller_1.PutOrderAdminController);
exports.default = route;
