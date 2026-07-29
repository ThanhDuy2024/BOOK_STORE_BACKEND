import { Router } from "express";
import authRoute from "./auth.route"
import categoriesRoute from "./categories.route";
const route = Router();

route.use("/auth", authRoute);
route.use("/categories", categoriesRoute);

export default route;