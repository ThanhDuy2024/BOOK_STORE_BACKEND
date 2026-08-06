import { Response } from "express";
import { admin } from "../../interfaces/admin.interface";

export const CreateAdminController = async (req: admin, res: Response) => {
    try {
        if(req.file) {
            req.body.image = req.file.path;
        } else {
            delete req.body.image;
        };

        const roles = await JSON.parse(req.body.roles);

        //So I dont have roles model so I will check it in future

        
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

export const UpdateAdminController = async (req: admin, res: Response) => {
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

export const DeleteAdminController = async (req: admin, res: Response) => {
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