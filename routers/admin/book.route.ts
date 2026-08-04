import { Router } from "express";
import { GetBookController, PostBookController } from "../../controllers/admin/books.controller";
import multer from "multer";
import { storage } from "../../configs/cloudianry";

const route = Router();
const upload = multer({
    storage: storage,
})

route.post("/", upload.single("image"), PostBookController);
route.get("/", GetBookController);
export default route;