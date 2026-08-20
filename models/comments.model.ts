import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/database';
import { Customer } from "../models/customer.model"
export const Comments = sequelize.define('comments', {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'customers', // Tên bảng Customer trong Database
            key: 'id'
        }
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "active"
    }
}, {
    timestamps: true
});

Customer.hasMany(Comments, {
    foreignKey: 'customerId',
    as: 'comments'
});

Comments.belongsTo(Customer, {
    foreignKey: 'customerId',
    as: 'customer'
});