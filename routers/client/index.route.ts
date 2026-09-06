import { Router } from "express";
import authRoute from "./auth.route";
import booksRoute from "./books.route";
import orderRoute from "./order.route";
import categoriesRoute from "./categories.route";
import commentsRoute from "./comments.route";
import trackingRoute from "./tracking.route";
const route = Router();

route.use("/auth", authRoute);
route.use("/books", booksRoute);
route.use("/order", orderRoute);
route.use("/categories", categoriesRoute);
route.use("/comments", commentsRoute);
route.use("/tracking", trackingRoute)
export default route;