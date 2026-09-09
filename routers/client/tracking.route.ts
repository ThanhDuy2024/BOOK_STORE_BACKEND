import { Router } from "express";
import { DeleteTrackingClientController, PostTrackingClientController, PutTrackingClientController } from "../../controllers/client/tracking.controller";

const route = Router();

route.post("/", PostTrackingClientController);
route.delete("/:id", DeleteTrackingClientController);
route.put("/:id", PutTrackingClientController);
export default route;