"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("../../controllers/client/book.controller");
const route = (0, express_1.Router)();
route.get("/list", book_controller_1.GetAllBookClientController);
route.get("/:id", book_controller_1.GetDetailBookClientController);
exports.default = route;
