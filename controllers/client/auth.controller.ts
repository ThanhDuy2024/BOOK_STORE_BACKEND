import { Request, Response } from "express";
import { sendOtpNodemailer } from "../../helpers/nodemailer.helper";
import { cache } from "../../helpers/nodeCache.helper";
import { Customer } from "../../models/customer.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { client } from "../../interfaces/client.interface";
export const RenderOtpClientController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000);
        sendOtpNodemailer(email, otp, `Mã OTP kích hoạt tài khoản là<p>${otp}</p>`)
        cache.set(`${otp}`, email, 120);
        res.status(200).json({
            status: true,
            msg: "Otp has been response",
            otp: otp,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        });
    }
}

export const RegisterClientController = async (req: Request, res: Response) => {
    try {
        const checkOtp = cache.get(`${req.body.otp}`);

        if (!checkOtp) {
            return res.status(404).json({
                status: false,
                msg: "Otp expire or wrong!"
            })
        };

        const { fullName, email, password } = req.body;

        const checkEmail = await Customer.findOne({
            where: {
                email: email
            }
        });

        if (checkEmail) {
            return res.status(400).json({
                status: true,
                msg: "Your account has been existed"
            })
        };

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        await Customer.create({
            fullName: fullName,
            email: email,
            password: hash,
        });

        res.status(200).json({
            status: true,
            msg: "Register successful!"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        });
    }
}

export const LoginClientController = async (req: Request, res: Response) => {
    try {
        const account = await Customer.findOne({
            where: {
                email: req.body.email,
                status: "active"
            }
        });

        if (!account) {
            res.status(404).json({
                status: false,
                msg: "Email or password wrong!"
            })
        };

        const verifyPassword = bcrypt.compareSync(req.body.password, account?.dataValues.password);

        if (!verifyPassword) {
            res.status(404).json({
                status: false,
                msg: "Email or password wrong!"
            })
        };

        const clientToken = jwt.sign({
            id: account?.dataValues.id,
            fullName: account?.dataValues.fullName,
        }, String(process.env.JWT_CLIENT), { expiresIn: 30 * 24 * 60 * 60 });

        res.status(200).json({
            status: true,
            msg: "Login successful!",
            data: {
                id: account?.dataValues.id,
                fullName: account?.dataValues.fullName,
                email: account?.dataValues.email,
                address: account?.dataValues.address,
                phone: account?.dataValues.phone,
                image: account?.dataValues.image || "",
            },
            clientToken: clientToken
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: false,
            msg: "Email or password wrong!"
        })
    }
}

export const ProfileClientController = async (req: client, res: Response) => {
    try {
        res.status(200).json({
            status: true,
            data: {
                id: req.client.id,
                fullName: req.client.fullName,
                email: req.client.email,
                address: req.client.address,
                phone: req.client.phone,
                image: req.client.image || "",
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "bad request"
        })
    }
}

export const ProfileClientEditController = async (req: client, res: Response) => {
    try {
        const { id } = req.client;

        const account = await Customer.findOne({
            where: {
                id: id,
                status: "active"
            }
        });

        if(!account) {
            return res.status(404).json({
                status: false,
                msg: "Account not found!"
            })
        };

        if(req.file) {
            req.body.image = req.file.path;
        } else {
            delete req.body.image;
        }

        await account.update({
            fullName: req.body.fullName,
            address: req.body.address,
            phone: req.body.phone,
            image: req.body.image || account.dataValues.image
        });

        res.status(200).json({
            status: true,
            msg: "Your profile has been edited!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}