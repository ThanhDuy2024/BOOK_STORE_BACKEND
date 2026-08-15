import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database";

export const Orders_items = sequelize.define("orders_items", {
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bookName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buyQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
})