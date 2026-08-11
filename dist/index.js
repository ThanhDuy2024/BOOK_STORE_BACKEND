"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_route_1 = __importDefault(require("./routers/admin/index.route"));
const index_route_2 = __importDefault(require("./routers/client/index.route"));
const database_1 = require("./configs/database");
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, database_1.connectDatabase)();
app.use((0, cors_1.default)({
    origin: String(process.env.FE_HOST),
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'set-cookie', 'token'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/admin", index_route_1.default);
app.use("/api/client", index_route_2.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
