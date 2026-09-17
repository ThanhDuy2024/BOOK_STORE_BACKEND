import { Router } from "express";
import { PostContactController } from "../../controllers/client/contacts.controller";

const route = Router();

route.post("/", PostContactController);

export default route;