import { Router } from "express";
import authRoute from "./auth.route";
import booksRoute from "./books.route";
const route = Router();

route.use("/auth", authRoute);
route.use("/books", booksRoute);
export default route;