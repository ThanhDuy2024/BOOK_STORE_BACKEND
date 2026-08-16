"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders_items = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../configs/database");
exports.Orders_items = database_1.sequelize.define("orders_items", {
    bookId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    bookName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    buyQuantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
});
