import { Router } from "express";
import { PostOrderClientController, PostOrderZaloClientController } from "../../controllers/client/order.controller";

const route = Router();

route.post("/", PostOrderClientController);
route.post("/zalopay", PostOrderZaloClientController);
export default route;