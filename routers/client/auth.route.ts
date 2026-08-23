import { Router } from "express";
import { 
    LoginClientController, 
    ProfileClientController, 
    RegisterClientController, 
    RenderOtpClientController 
} from "../../controllers/client/auth.controller";
import { clientMiddleware } from "../../middlewares/client.middleware";

const route = Router();

route.post("/otp", RenderOtpClientController);
route.post("/register", RegisterClientController);
route.post("/login", LoginClientController);
route.get("/profile", clientMiddleware, ProfileClientController);
export default route;