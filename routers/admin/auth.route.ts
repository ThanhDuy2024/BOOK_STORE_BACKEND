import { Router } from "express";
import { AdminProfile, LoginAdminController, RegisterAdminController } from "../../controllers/admin/auth/auth.controller";
import { adminMiddleware } from "../../middlewares/admin.middleware";
const route = Router();

route.post('/register', RegisterAdminController);
route.post("/login", LoginAdminController);
route.get("/profile", adminMiddleware, AdminProfile);
export default route;