import { Router } from "express";
import { LoginAdminController, RegisterAdminController } from "../../controllers/admin/auth/auth.controller";
const route = Router();

route.post('/register', RegisterAdminController);
route.post("/login", LoginAdminController);
export default route;