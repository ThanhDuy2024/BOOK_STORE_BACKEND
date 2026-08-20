import { Router } from "express";
import { GetAllCommentClientInProductController, PostCommentClientController } from "../../controllers/client/comments.controller";
import { clientMiddleware } from "../../middlewares/client.middleware";

const route = Router();

route.post("/", clientMiddleware, PostCommentClientController);
route.get("/:id", GetAllCommentClientInProductController);

export default route;