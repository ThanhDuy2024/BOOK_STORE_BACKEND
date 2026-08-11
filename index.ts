import 'dotenv/config';
import express from "express";
import cors from "cors";
import adminRoute from "./routers/admin/index.route";
import clientRoute from "./routers/client/index.route";
import { connectDatabase } from "./configs/database";

const app = express();
const port = process.env.PORT;

connectDatabase();

app.use(cors({
  origin: String(process.env.FE_HOST),
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'set-cookie', 'token'],
  credentials: true,
}));

app.use(express.json());
app.use("/api/admin", adminRoute);
app.use("/api/client", clientRoute);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})