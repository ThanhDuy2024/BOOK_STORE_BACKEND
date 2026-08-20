"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = require("../../controllers/client/categories.controller");
const route = (0, express_1.Router)();
route.get("/", categories_controller_1.GetAllCategoriesClientController);
exports.default = route;
