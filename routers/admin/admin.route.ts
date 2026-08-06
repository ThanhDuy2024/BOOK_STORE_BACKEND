import { Router } from "express";
import { CreateAdminController } from "../../controllers/admin/admin.controller";
import { storage } from "../../configs/cloudianry";
import multer from "multer";

const route = Router();

const upload = multer({
    storage: storage
});

route.post("/", upload.single("image"), CreateAdminController);
export default route;