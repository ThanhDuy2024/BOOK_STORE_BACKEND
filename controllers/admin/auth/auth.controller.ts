import { Request, Response } from "express";

export const LoginAdminController = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            status: true,
            msg: "Login completed!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}