import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { Admin } from "../models/admin.model";
import { admin } from "../interfaces/admin.interface";
export const adminMiddleware = async (req: admin, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.token;

        if(!token) {
            return res.status(404).json({
                status: false,
                msg: "Token not found"
            })
        }
        
        const decode = jwt.verify(String(token), String(process.env.JWT_SECRET)) as JwtPayload;

        if(!decode) {
            return res.status(400).json({
                status: false,
                msg: "Token expires!"
            })
        };

        const adminAccountCheck = await Admin.findOne({
            attributes: { exclude: ["password"] },
            where: {
                id: decode.id,
            }
        });

        if(!adminAccountCheck?.dataValues) {
            return res.status(404).json({
                status: false,
                msg: "[Middleware] Account not found!"
            })
        };

        req.admin = adminAccountCheck.dataValues;
        next();
    } catch (error) {
        console.log(error);
    }
}