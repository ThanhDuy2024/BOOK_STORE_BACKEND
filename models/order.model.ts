import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database";
import { Orders_items } from "./orders_items.model";

export const Orders = sequelize.define("orders", {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paymentStatus: {
        type: DataTypes.STRING,
        defaultValue: "unpaid"
    },
    totalAmount: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "init"
    }
}, {
    timestamps: true
})

Orders.hasMany(Orders_items, {
    foreignKey: "orderId",
    as: "items"
})

Orders_items.belongsTo(Orders, {
    foreignKey: "orderId",
    as: "orders"
})