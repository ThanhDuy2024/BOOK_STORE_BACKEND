"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../configs/database");
const admin_model_1 = require("./admin.model");
const categories_model_1 = require("./categories.model");
const books_categories_model_1 = require("./books_categories.model");
exports.Books = database_1.sequelize.define("books", {
    bookName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    publishing: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    publication: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
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
admin_model_1.Admin.hasMany(exports.Books, {
    foreignKey: "createdBy",
    as: "createdBooks"
});
exports.Books.belongsTo(admin_model_1.Admin, {
    foreignKey: "createdBy",
    as: "creator"
});
admin_model_1.Admin.hasMany(exports.Books, {
    foreignKey: "updatedBy",
    as: "updatedBooks"
});
exports.Books.belongsTo(admin_model_1.Admin, {
    foreignKey: "updatedBy",
    as: "updater"
});
exports.Books.belongsToMany(categories_model_1.Categories, {
    through: books_categories_model_1.Books_Categories,
    as: "categories",
    foreignKey: "bookId",
    otherKey: "categoryId"
});
