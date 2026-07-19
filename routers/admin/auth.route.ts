import { Router } from "express";
import { LoginAdminController } from "../../controllers/admin/auth/auth.controller";
const route = Router();

route.post("/login", LoginAdminController);

export default route;