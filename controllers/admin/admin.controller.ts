import { Response } from "express";
import { admin } from "../../interfaces/admin.interface";
import { sendOtpNodemailer } from "../../helpers/nodemailer.helper";
import { cache } from "../../helpers/nodeCache.helper";
import { Admin } from "../../models/admin.model";
import bcrypt from "bcryptjs";
import { Roles } from "../../models/roles.model";
import { Op } from "sequelize";

export const RenderCreateAdminOtp = async (req: admin, res: Response) => {
    try {
        const { email } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000);
        sendOtpNodemailer(email, otp, `Mã OTP kích hoạt tài khoản là<p>${otp}</p>`)
        cache.set(`${otp}`, email, 120);
        res.status(200).json({
            status: true,
            msg: "Otp has been response"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
};

export const CreateAdminController = async (req: admin, res: Response) => {
    try {
        const checkOtp = cache.get(`${req.body.otp}`);

        if (!checkOtp) {
            return res.status(404).json({
                status: false,
                msg: "Otp expire or wrong!"
            })
        };

        if (req.file) {
            req.body.image = req.file.path;
        } else {
            delete req.body.image;
        };

        const checkAccount = await Admin.findOne({
            where: {
                adminName: req.body.adminName,
            }
        });

        if (checkAccount) {
            return res.status(400).json({
                status: false,
                msg: "Admin name was being exist!"
            })
        }

        const checkRole = await Roles.findOne({
            where: {
                id: req.body.roleId,
                status: "active"
            }
        });

        if (!checkRole) {
            return res.status(404).json({
                status: false,
                msg: "Role not found!"
            })
        };

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(String(req.body.password), salt);

        await Admin.create({
            adminName: req.body.adminName,
            fullName: req.body.fullName,
            email: req.body.email,
            password: hash,
            address: req.body.address,
            phone: req.body.phone,
            image: req.body.image || "",
            status: req.body.status,
            roleId: req.body.roleId,
            createdBy: req.admin.id,
            updatedBy: req.admin.id,
        })

        res.status(200).json({
            status: true,
            msg: "Admin has been created!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}

export const GetAdminController = async (req: admin, res: Response) => {
    try {
        res.status(200).json({
            status: true,
            msg: "Admin has been created!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}

export const DetailAdminController = async (req: admin, res: Response) => {
    try {
        const { id } = req.params;

        const account = await Admin.findOne({
            where: {
                id: id,
                status: {
                    [Op.in]: ["active", "inactive"]
                }
            }
        });

        if (!account) {
            return res.status(404).json({
                status: false,
                msg: "Admin account not found!"
            })
        };

        res.status(200).json({
            status: true,
            data: account,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}

export const UpdateAdminController = async (req: admin, res: Response) => {
    try {
        const { id } = req.params;

        const account = await Admin.findOne({
            where: {
                id: id,
                status: {
                    [Op.in]: ["active", "inactive"]
                }
            }
        });

        if (!account) {
            return res.status(404).json({
                status: false,
                msg: "Admin account not found!"
            })
        };

        if (req.file) {
            req.body.image = req.file.path;
        } else {
            delete req.body.image;
        };

        await account.update({
            fullName: req.body.fullName,
            address: req.body.address,
            phone: req.body.phone,
            image: req.body.image || account.dataValues.image,
            status: req.body.status,
            roleId: req.body.roleId,
            updatedBy: req.admin.id,
        })

        res.status(200).json({
            status: true,
            msg: "Admin has been updated!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}

export const DeleteAdminController = async (req: admin, res: Response) => {
    try {
        const { id } = req.params;

        const account = await Admin.findOne({
            where: {
                id: id,
                status: {
                    [Op.in]: ["active", "inactive"]
                }
            }
        });

        if (!account) {
            return res.status(404).json({
                status: false,
                msg: "Admin account not found!"
            })
        };

        await account.update({
            status: "deleted"
        });

        res.status(200).json({
            status: true,
            msg: "Admin has been deleted!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}

export const RecoveryAdminController = async (req: admin, res: Response) => {
    try {
        res.status(200).json({
            status: true,
            msg: "Admin has been created!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}