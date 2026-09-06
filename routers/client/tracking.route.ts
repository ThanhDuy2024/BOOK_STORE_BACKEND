import { Router } from "express";
import { DeleteTrackingClientController, PostTrackingClientController } from "../../controllers/client/tracking.controller";

const route = Router();

route.post("/", PostTrackingClientController);
route.delete("/:id", DeleteTrackingClientController);
export default route;