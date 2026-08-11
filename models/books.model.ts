import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database";
import { Admin } from "./admin.model";
import { Categories } from "./categories.model";
import { Books_Categories } from "./books_categories.model";

export const Books = sequelize.define("books", {
    bookName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalSale: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publishing: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    publication: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,      
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
    timestamps: true
})

Admin.hasMany(Books, {
    foreignKey: "createdBy",
    as: "createdBooks"
});

Books.belongsTo(Admin, {
    foreignKey: "createdBy",
    as: "creator"
});

Admin.hasMany(Books, {
    foreignKey: "updatedBy",
    as: "updatedBooks"
});

Books.belongsTo(Admin, {
    foreignKey: "updatedBy",
    as: "updater"
});

Books.belongsToMany(Categories, {
  through: Books_Categories,
  as: "categories",
  foreignKey: "bookId",
  otherKey: "categoryId"
});