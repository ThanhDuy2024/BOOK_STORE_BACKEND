import 'dotenv/config';
import express from "express";
import cors from "cors";
import adminRoute from "./routers/admin/index.route";
import { connectDatabase } from "./configs/database";

const app = express();
const port = process.env.PORT;

connectDatabase();

app.use(cors({
  origin: String(process.env.FE_HOST),
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'set-cookie'],
  credentials: true,
}));

app.use(express.json());
app.use("/api/admin", adminRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})