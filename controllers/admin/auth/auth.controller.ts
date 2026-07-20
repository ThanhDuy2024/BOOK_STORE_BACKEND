import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import moment from "moment";
import jwt from "jsonwebtoken";
import { Admin } from "../../../models/admin.model";
import { admin } from "../../../interfaces/admin.interface";
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

        if (adminNameCheck?.dataValues || emailCheck?.dataValues) {
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
        const { adminName, password } = req.body;

        const adminNameCheck = await Admin.findOne({
            where: {
                adminName: adminName,
                status: "active",
            }
        });

        if (!adminNameCheck?.dataValues) {
            return res.status(400).json({
                status: false,
                msg: "Wrong adminName or passowrd",
            })
        };

        const compare = bcrypt.compare(password, adminNameCheck?.dataValues.password);

        if (!compare) {
            return res.status(400).json({
                status: false,
                msg: "Wrong adminName or passowrd",
            })
        };

        const adminAccount = adminNameCheck.dataValues;
        const data = {
            id: adminAccount.id,
            adminName: adminAccount.adminName,
            fullName: adminAccount.fullName,
            email: adminAccount.email,
            address: adminAccount.address || "",
            phone: adminAccount.phone || "",
            image: adminAccount.image || "",
            status: adminAccount.status || "",
            roleId: adminAccount.roleId || 1,
            updatedBy: adminAccount.updatedBy || 1,
            createdBy: adminAccount.createdBy || 1,
            createdAt: moment(adminAccount.createdAt).format("HH:mm DD/MM/YYYY"),
            updatedAt: moment(adminAccount.updatedAt).format("HH:mm DD/MM/YYYY")
        }

        const token = jwt.sign({
            id: data.id,
            fullName: data.fullName,
            image: data.image
        }, String(process.env.JWT_SECRET), { expiresIn: 30 * 24 * 60 * 60})

        res.status(200).json({
            status: true,
            msg: "Login completed!",
            token: token,
            data: data
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}

export const AdminProfile = async (req: admin, res: Response) => {
    try {
        res.status(200).json({
            status: true,
            data: req.admin,
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        })
    }
}