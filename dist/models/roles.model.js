"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../configs/database");
exports.Roles = database_1.sequelize.define("roles", {
    roleName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    permission: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    updatedBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    createdBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: true
});
