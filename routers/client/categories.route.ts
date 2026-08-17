import { Router } from "express";
import { GetAllCategoriesClientController } from "../../controllers/client/categories.controller";

const route = Router();

route.get("/", GetAllCategoriesClientController);

export default route;