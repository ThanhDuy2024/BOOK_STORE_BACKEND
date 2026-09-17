"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contacts = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../configs/database");
exports.Contacts = database_1.sequelize.define("Contacts", {
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    message: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "init"
    }
}, {
    timestamps: true
});
