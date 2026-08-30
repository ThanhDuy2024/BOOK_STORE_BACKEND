"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../configs/database");
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
// Admin.belongsTo(Roles, {
//     foreignKey: "roleId",
//     as: "role",
// });
// Roles.hasMany(Admin, {
//     foreignKey: "roleId",
//     as: "admins",
// });
// Admin.hasMany(Roles, {
//     foreignKey: "createdBy",
//     as: "createdRoles",
// });
// Roles.belongsTo(Admin, {
//     foreignKey: "createdBy",
//     as: "creator",
// });
// Admin.hasMany(Roles, {
//     foreignKey: "updatedBy",
//     as: "updatedRoles",
// });
// Roles.belongsTo(Admin, {
//     foreignKey: "updatedBy",
//     as: "updater",
// });
