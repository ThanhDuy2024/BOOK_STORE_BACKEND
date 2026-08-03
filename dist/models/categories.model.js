"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../configs/database");
const admin_model_1 = require("./admin.model");
exports.Categories = database_1.sequelize.define("categories", {
    categoryName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
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
admin_model_1.Admin.hasMany(exports.Categories, {
    foreignKey: "createdBy",
    as: "createdCategories"
});
exports.Categories.belongsTo(admin_model_1.Admin, {
    foreignKey: "createdBy",
    as: "creator"
});
exports.Categories.belongsTo(admin_model_1.Admin, {
    foreignKey: "updatedBy",
    as: "updater"
});
