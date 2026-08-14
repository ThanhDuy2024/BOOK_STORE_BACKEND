import { Request, Response } from "express";
export const EventClientController = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            status: true,
            msg: ""
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        })
    }
}