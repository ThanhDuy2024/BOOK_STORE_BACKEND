import { Router } from "express";
import { DetailBookController, GetBookController, PostBookController, UpdateBookController } from "../../controllers/admin/books.controller";
import multer from "multer";
import { storage } from "../../configs/cloudianry";

const route = Router();
const upload = multer({
    storage: storage,
})

route.post("/", upload.single("image"), PostBookController);
route.get("/", GetBookController);
route.get("/:id", DetailBookController);
route.put("/:id", upload.single("image"), UpdateBookController);
export default route;