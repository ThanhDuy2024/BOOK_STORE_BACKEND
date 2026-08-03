import { Router } from "express";
import authRoute from "./auth.route"
import categoriesRoute from "./categories.route";
import bookRoute from "./book.route";
import { adminMiddleware } from "../../middlewares/admin.middleware";
const route = Router();

route.use("/auth", authRoute);
route.use("/categories", categoriesRoute);
route.use("/books", adminMiddleware, bookRoute);
export default route;