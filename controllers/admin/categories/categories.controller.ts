import { Response } from "express";
import { admin } from "../../../interfaces/admin.interface";
import { Categories } from "../../../models/categories.model";
import { Admin } from "../../../models/admin.model";
import { Op } from "sequelize";

export const CreateCategoryController = async (req: admin, res: Response) => {
    try {
        if(req.file) {
            req.body.image = req.file.path;
        } else {
            delete req.body.image;
        };
        
        await Categories.create({
            categoryName: req.body.categoryName,
            status: req.body.status,
            image: req.body.image || "",
            updatedBy: req.admin.id,
            createdBy: req.admin.id
        });

        res.status(200).json({
            status: true,
            msg: "Category has created"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}

export const GetCategoryController = async (req: admin, res: Response) => {
    try {
        const query: any = {
            nest: true,
            include: [
                {
                    model: Admin,
                    as: "creator",
                    attributes: ["id", "adminName"]
                },
                {
                    model: Admin,
                    as: "updater",
                    attributes: ["id", "adminName"]
                }
            ],
            where: {
                status: ['active', 'inactive']
            },
            order: [
                ["updatedAt", "desc"]
            ]
        }

        if(req.query.search){
            query.where.categoryName = {
                [Op.iLike]: `%${String(req.query.search).trim()}%`
            }
        }

        if(req.query.status != "all") {
            query.where.status = req.query.status
        }

        if(req.query.updatedAt != "desc") {
            query.order = [["updatedAt", 'desc']]
        };

        const categories = await Categories.findAll(query);

        res.status(200).json({
            status: true,
            data: categories
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}