import 'dotenv/config';
import express from "express";
import adminRoute from "./routers/admin/index.route";
import { connectDatabase } from "./configs/database";

const app = express();
const port = process.env.PORT;

connectDatabase();

app.use("/api/admin", adminRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})