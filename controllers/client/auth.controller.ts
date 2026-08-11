import { Request, Response } from "express";
import { sendOtpNodemailer } from "../../helpers/nodemailer.helper";
import { cache } from "../../helpers/nodeCache.helper";
import { Customer } from "../../models/customer.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

        const { fullName, email, password, address, phone } = req.body;

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
            address: address,
            phone: phone
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
        }, String(process.env.JWT_CLIENT), { expiresIn: 30 * 24 * 60 * 60});

        res.status(200).json({
            status: true,
            msg: "Login successful!",
            data: {
                id: account?.dataValues.id,
                fullName: account?.dataValues.fullName,
                email: account?.dataValues.email,
                address: account?.dataValues.address,
                phone: account?.dataValues.phone
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