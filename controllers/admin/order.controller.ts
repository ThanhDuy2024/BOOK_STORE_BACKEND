import { Response } from "express";
import { admin } from "../../interfaces/admin.interface";

export const GetOrderAdminController = async (req: admin, res: Response) => {
    try {
        res.status(200).json({
            status: true,
            data: [],
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"

        })
    }
}