import { Router } from "express";
import { PostOrderClientController } from "../../controllers/client/order.controller";

const route = Router();

route.post("/", PostOrderClientController);

export default route;