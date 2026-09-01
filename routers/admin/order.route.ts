import { Router } from "express";
import { GetAllOrderAdminController } from "../../controllers/admin/order.controller";

const route = Router();

route.get("/", GetAllOrderAdminController);

export default route;