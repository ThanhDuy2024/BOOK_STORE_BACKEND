import { Router } from "express";
import { GetAllCustomerAdminController } from "../../controllers/admin/customers.controller";

const route = Router();

route.get("/", GetAllCustomerAdminController);
export default route;