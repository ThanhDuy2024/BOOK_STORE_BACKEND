import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { client } from "../interfaces/client.interface";
import { Customer } from "../models/customer.model";
export const clientMiddleware = async (req: client, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.token;

        if(!token) {
            return res.status(404).json({
                status: false,
                msg: "Token not found"
            })
        }
        
        const decode = jwt.verify(String(token), String(process.env.JWT_CLIENT)) as JwtPayload;

        if(!decode) {
            return res.status(400).json({
                status: false,
                msg: "Token expires!"
            })
        };

        const customerAccountCheck = await Customer.findOne({
            attributes: { exclude: ["password"] },
            where: {
                id: decode.id,
            }
        });

        if(!customerAccountCheck?.dataValues) {
            return res.status(404).json({
                status: false,
                msg: "[Middleware] Account not found!"
            })
        };

        req.client = customerAccountCheck.dataValues;
        next();
    } catch (error) {
        console.log(error);
    }
}