import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database";

export const Books_Categories = sequelize.define(
  "Books_Categories",
  {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);