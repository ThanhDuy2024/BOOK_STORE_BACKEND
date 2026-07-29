import { Router } from "express";
import { adminMiddleware } from "../../middlewares/admin.middleware";
import { CreateCategoryController } from "../../controllers/admin/categories/categories.controller";
const route = Router();

route.post("/create", adminMiddleware, CreateCategoryController);

export default route;