import { Router } from "express";
import { GetAllOrderAdminController, GetDetailOrderAdminController } from "../../controllers/admin/order.controller";

const route = Router();

route.get("/", GetAllOrderAdminController);
route.get("/:id", GetDetailOrderAdminController);

export default route;