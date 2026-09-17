import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database";

export const Contacts = sequelize.define("Contacts", {
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "init"
    }
}, {
    timestamps: true
});