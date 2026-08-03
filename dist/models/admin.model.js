"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../configs/database");
exports.Admin = database_1.sequelize.define('Admin', {
    adminName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "active"
    },
    roleId: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1
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
    timestamps: true,
});
