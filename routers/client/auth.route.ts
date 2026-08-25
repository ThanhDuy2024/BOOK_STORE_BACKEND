import { Router } from "express";
import { 
    LoginClientController, 
    ProfileClientController, 
    ProfileClientEditController, 
    RegisterClientController, 
    RenderOtpClientController 
} from "../../controllers/client/auth.controller";
import { clientMiddleware } from "../../middlewares/client.middleware";
import multer from "multer";
import { storage } from "../../configs/cloudianry";

const route = Router();
const upload = multer({
    storage: storage,
});
route.post("/otp", RenderOtpClientController);
route.post("/register", RegisterClientController);
route.post("/login", LoginClientController);
route.get("/profile", clientMiddleware, ProfileClientController);
route.put("/profile", clientMiddleware, upload.single("image"), ProfileClientEditController);

export default route;