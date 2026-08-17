import { Request, Response } from "express";
import { Categories } from "../../models/categories.model";
import { Op } from "sequelize";

export const GetAllCategoriesClientController = async (req: Request, res: Response) => {
    try {
        const categories = await Categories.findAll({
            attributes: ["id", "categoryName"],
            where: {
                status: {
                    [Op.in]: ["active", "inactive"]
                }
            }
        });

        res.status(200).json({
            status: true,
            data: categories
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}