import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database";
import { Admin } from "./admin.model";

export const Categories = sequelize.define("categories", {
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
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
    timestamps: true,
})

Admin.hasMany(Categories, {
    foreignKey: "createdBy",
    as: "createdCategories"
});

Categories.belongsTo(Admin, {
    foreignKey: "createdBy",
    as: "creator"
});

Categories.belongsTo(Admin, {
    foreignKey: "updatedBy",
    as: "updater"
});