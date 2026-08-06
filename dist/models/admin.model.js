"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../configs/database");
const roles_model_1 = require("./roles.model");
exports.Admin = database_1.sequelize.define("Admin", {
    adminName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "active",
    },
    roleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    createdBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    updatedBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    timestamps: true,
});
exports.Admin.belongsTo(roles_model_1.Roles, {
    foreignKey: "roleId",
    as: "role",
});
roles_model_1.Roles.hasMany(exports.Admin, {
    foreignKey: "roleId",
    as: "admins",
});
exports.Admin.hasMany(roles_model_1.Roles, {
    foreignKey: "createdBy",
    as: "createdRoles",
});
roles_model_1.Roles.belongsTo(exports.Admin, {
    foreignKey: "createdBy",
    as: "creator",
});
exports.Admin.hasMany(roles_model_1.Roles, {
    foreignKey: "updatedBy",
    as: "updatedRoles",
});
roles_model_1.Roles.belongsTo(exports.Admin, {
    foreignKey: "updatedBy",
    as: "updater",
});
