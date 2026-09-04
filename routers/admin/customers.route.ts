import { Router } from "express";
import { GetAllCustomerAdminController, GetCustomerAdminController } from "../../controllers/admin/customers.controller";

const route = Router();

route.get("/", GetAllCustomerAdminController);
route.get("/:id", GetCustomerAdminController);

export default route;