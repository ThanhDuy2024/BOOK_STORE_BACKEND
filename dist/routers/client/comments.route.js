"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comments_controller_1 = require("../../controllers/client/comments.controller");
const client_middleware_1 = require("../../middlewares/client.middleware");
const route = (0, express_1.Router)();
route.post("/", client_middleware_1.clientMiddleware, comments_controller_1.PostCommentClientController);
route.get("/:id", comments_controller_1.GetAllCommentClientInProductController);
exports.default = route;
