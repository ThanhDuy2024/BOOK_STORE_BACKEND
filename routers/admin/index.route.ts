import { Router } from "express";
import authRoute from "./auth.route"
import categoriesRoute from "./categories.route";
import bookRoute from "./book.route";
import adminAccountRoute from "./admin.route";
import rolesRoute from "./roles.route";
import orderRoute from "./order.route"
import { adminMiddleware } from "../../middlewares/admin.middleware";
const route = Router();

route.use("/auth", authRoute);
route.use("/categories", categoriesRoute);
route.use("/books", adminMiddleware, bookRoute);
route.use("/account", adminMiddleware, adminAccountRoute);
route.use("/roles", rolesRoute);
route.use("/order", adminMiddleware, orderRoute);
export default route;