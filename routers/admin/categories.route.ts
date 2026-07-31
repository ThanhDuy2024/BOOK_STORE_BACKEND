import { Router } from "express";
import { adminMiddleware } from "../../middlewares/admin.middleware";
import { 
    CreateCategoryController, 
    DeleteCategoryController, 
    GetCategoryController, 
    RecoveryCategoryController, 
    UpdateCategoryController 
} from "../../controllers/admin/categories/categories.controller";
import multer from 'multer';
import { storage } from "../../configs/cloudianry";

const upload = multer({
    storage: storage
});

const route = Router();
route.post("/", adminMiddleware, upload.single("image"), CreateCategoryController);
route.get("/", adminMiddleware, GetCategoryController);
route.put("/:id", adminMiddleware, upload.single("image"), UpdateCategoryController);
route.delete("/:id", adminMiddleware, DeleteCategoryController);
route.put("/recovery/:id", adminMiddleware, RecoveryCategoryController);
export default route;