import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database";
import { Roles } from "./roles.model";

export const Admin = sequelize.define(
    "Admin",
    {
        adminName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullName: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "active",
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    }
);


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