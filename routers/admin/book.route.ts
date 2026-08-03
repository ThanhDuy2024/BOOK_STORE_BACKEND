import { Router } from "express";
import { PostBookController } from "../../controllers/admin/books.controller";
import multer from "multer";
import { storage } from "../../configs/cloudianry";

const route = Router();
const upload = multer({
    storage: storage,
})
route.post("/", upload.single("image"), PostBookController);
export default route;