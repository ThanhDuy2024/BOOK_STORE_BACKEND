import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database";
export const Roles = sequelize.define("roles", {
    roleName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    permission: {
        type: DataTypes.JSON,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: true
})