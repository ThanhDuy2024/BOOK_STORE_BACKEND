import { Router } from "express";
import { GetAllBookClientController, GetDetailBookClientController } from "../../controllers/client/book.controller";
const route = Router();

route.get("/list", GetAllBookClientController);
route.get("/:id", GetDetailBookClientController);
export default route;