import { Router } from "express";
import { GetAllOrderAdminController, GetDetailOrderAdminController, PutOrderAdminController } from "../../controllers/admin/order.controller";

const route = Router();

route.get("/", GetAllOrderAdminController);
route.get("/:id", GetDetailOrderAdminController);
route.put("/:id", PutOrderAdminController)
export default route;