"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tracking_controller_1 = require("../../controllers/client/tracking.controller");
const route = (0, express_1.Router)();
route.post("/", tracking_controller_1.PostTrackingClientController);
route.delete("/:id", tracking_controller_1.DeleteTrackingClientController);
exports.default = route;
