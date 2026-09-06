import { Router } from "express";
import { PostTrackingClientController } from "../../controllers/client/tracking.controller";

const route = Router();

route.post("/", PostTrackingClientController)

export default route;