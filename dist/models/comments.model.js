"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../configs/database");
const customer_model_1 = require("../models/customer.model");
exports.Comments = database_1.sequelize.define('comments', {
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    customerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'customers', // Tên bảng Customer trong Database
            key: 'id'
        }
    },
    comment: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "active"
    }
}, {
    timestamps: true
});
customer_model_1.Customer.hasMany(exports.Comments, {
    foreignKey: 'customerId',
    as: 'comments'
});
exports.Comments.belongsTo(customer_model_1.Customer, {
    foreignKey: 'customerId',
    as: 'customer'
});
