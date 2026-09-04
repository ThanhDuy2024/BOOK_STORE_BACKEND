"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customers_controller_1 = require("../../controllers/admin/customers.controller");
const route = (0, express_1.Router)();
route.get("/", customers_controller_1.GetAllCustomerAdminController);
route.get("/:id", customers_controller_1.GetCustomerAdminController);
route.put("/:id", customers_controller_1.PutCustomerAdminController);
exports.default = route;
