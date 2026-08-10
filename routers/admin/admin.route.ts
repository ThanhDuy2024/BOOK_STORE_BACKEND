import { Router } from "express";
import { CreateAdminController, DeleteAdminController, DetailAdminController, GetAdminController, RenderCreateAdminOtp, UpdateAdminController } from "../../controllers/admin/admin.controller";
import { storage } from "../../configs/cloudianry";
import multer from "multer";

const route = Router();

const upload = multer({
    storage: storage
});

route.post("/otp", RenderCreateAdminOtp);
route.post("/", upload.single("image"), CreateAdminController);
route.get("/", GetAdminController);
route.get("/:id", DetailAdminController);
route.put("/:id", upload.single("image"), UpdateAdminController);
route.delete("/:id", DeleteAdminController);
export default route;