import { Request, Response } from "express";
import { Contacts } from "../../models/contacts.model";

export const PostContactController = async (req: Request, res: Response) => {
    try {
        const { email, message } = req.body;
    
        await Contacts.create({
            email: email,
            message: message
        });
        
        res.status(200).json({
            status: true,
            msg: "Send contact successful!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}