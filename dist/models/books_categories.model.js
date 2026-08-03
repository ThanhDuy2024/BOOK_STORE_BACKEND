"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books_Categories = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../configs/database");
exports.Books_Categories = database_1.sequelize.define("Books_Categories", {
    bookId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});
