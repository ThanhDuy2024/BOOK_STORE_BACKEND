import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { Admin } from "../../../models/admin.model";
//Con check user name email trung nhau o day ne
export const RegisterAdminController = async (req: Request, res: Response) => {
    try {
        const { adminName, fullName, email, password } = req.body;

        const adminNameCheck = await Admin.findOne({
            where: {
               adminName: adminName, 
            }
        })

        const emailCheck = await Admin.findOne({
            where: {
                email: email,
            }
        });

        if(adminNameCheck?.dataValues || emailCheck?.dataValues) {
            return res.status(400).json({
                status: false,
                msg: "Admin name or email have existed!"
            })
        };

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        await Admin.create({
            adminName: adminName,
            fullName: fullName,
            email: email,
            password: hash
        });

        res.status(200).json({
            status: true,
            msg: "Register completed!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}

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