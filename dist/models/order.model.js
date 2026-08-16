"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../configs/database");
const orders_items_model_1 = require("./orders_items.model");
exports.Orders = database_1.sequelize.define("orders", {
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    paymentMethod: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    paymentStatus: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "unpaid"
    },
    totalAmount: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "init"
    }
}, {
    timestamps: true
});
exports.Orders.hasMany(orders_items_model_1.Orders_items, {
    foreignKey: "orderId",
    as: "items"
});
orders_items_model_1.Orders_items.belongsTo(exports.Orders, {
    foreignKey: "orderId",
    as: "orders"
});
