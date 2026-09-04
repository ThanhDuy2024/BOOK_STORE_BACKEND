import { Router } from "express";
import { GetAllCustomerAdminController, GetCustomerAdminController, PutCustomerAdminController } from "../../controllers/admin/customers.controller";

const route = Router();

route.get("/", GetAllCustomerAdminController);
route.get("/:id", GetCustomerAdminController);
route.put("/:id", PutCustomerAdminController);
export default route;