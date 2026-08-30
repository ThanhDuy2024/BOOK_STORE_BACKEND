"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// export const sequelize = new Sequelize(String(process.env.PG_DATABASE), String(process.env.PG_USER), String(process.env.PG_PASSWORD), {
//   host: 'localhost',
//   port: 5432,
//   dialect: 'postgres'
// });
exports.sequelize = new sequelize_1.Sequelize(String(process.env.DATABASE_URL), {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.sequelize.authenticate();
        yield exports.sequelize.sync({
            alter: true
        });
        console.log("Database has connected!");
    }
    catch (error) {
        console.log(error);
        console.log("Error db!");
    }
});
exports.connectDatabase = connectDatabase;
