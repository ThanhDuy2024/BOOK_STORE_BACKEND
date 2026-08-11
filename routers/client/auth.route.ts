import { Router } from "express";
import { LoginClientController, RegisterClientController, RenderOtpClientController } from "../../controllers/client/auth.controller";

const route = Router();

route.post("/otp", RenderOtpClientController);
route.post("/register", RegisterClientController);
route.post("/login", LoginClientController);
export default route;