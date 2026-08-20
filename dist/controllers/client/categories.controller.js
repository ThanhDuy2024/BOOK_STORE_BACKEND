"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllCategoriesClientController = void 0;
const categories_model_1 = require("../../models/categories.model");
const sequelize_1 = require("sequelize");
const GetAllCategoriesClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categories_model_1.Categories.findAll({
            attributes: ["id", "categoryName"],
            where: {
                status: {
                    [sequelize_1.Op.in]: ["active", "inactive"]
                }
            }
        });
        res.status(200).json({
            status: true,
            data: categories
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        });
    }
});
exports.GetAllCategoriesClientController = GetAllCategoriesClientController;
