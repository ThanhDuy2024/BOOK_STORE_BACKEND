import { Router } from "express";
import { adminMiddleware } from "../../middlewares/admin.middleware";
import { CreateCategoryController, GetCategoryController } from "../../controllers/admin/categories/categories.controller";
import multer from 'multer';
import { storage } from "../../configs/cloudianry";

const upload = multer({
    storage: storage
});

const route = Router();
route.post("/create", adminMiddleware, upload.single("image"), CreateCategoryController);
route.get("/list", adminMiddleware, GetCategoryController);
export default route;