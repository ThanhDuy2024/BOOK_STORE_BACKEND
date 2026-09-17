"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contacts_controller_1 = require("../../controllers/client/contacts.controller");
const route = (0, express_1.Router)();
route.post("/", contacts_controller_1.PostContactController);
exports.default = route;
