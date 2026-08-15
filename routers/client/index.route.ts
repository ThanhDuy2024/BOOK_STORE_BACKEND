import { Router } from "express";
import authRoute from "./auth.route";
import booksRoute from "./books.route";
import orderRoute from "./order.route";
const route = Router();

route.use("/auth", authRoute);
route.use("/books", booksRoute);
route.use("/order", orderRoute);
export default route;