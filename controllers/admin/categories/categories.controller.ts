import { Request, Response } from "express";
import { admin } from "../../../interfaces/admin.interface";

export const CreateCategoryController = async (req: admin, res: Response) => {
    try {
        res.status(200).json({
            status: true,
            msg: "Category has created"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}