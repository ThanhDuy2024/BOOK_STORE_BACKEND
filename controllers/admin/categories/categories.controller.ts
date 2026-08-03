import { Response } from "express";
import { admin } from "../../../interfaces/admin.interface";
import { Categories } from "../../../models/categories.model";
import { Admin } from "../../../models/admin.model";
import { Op } from "sequelize";
import { funcPagination } from "../../../helpers/pagination.helper";
import moment from "moment";
const limit = 10;
export const CreateCategoryController = async (req: admin, res: Response) => {
    try {
        if (req.file) {
            req.body.image = req.file.path;
        } else {
            delete req.body.image;
        };

        const category = await Categories.findOne({
            where: {
                categoryName: {
                    [Op.iLike]: req.body.categoryName
                },
                status: {
                    [Op.in]: ["active", "inactive"]
                }
            }
        })

        if(category) {
            return res.status(400).json({
                status: false,
                msg: "Category has existed!"
            })
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
            distinct: true,
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
                status: {
                    [Op.in]: ['active', 'inactive']
                }
            },
            order: [
                ["updatedAt", "desc"]
            ],
            offset: 0,
            limit: limit
        }

        if (req.query.search !== "null") {
            query.where.categoryName = {
                [Op.iLike]: `%${String(req.query.search).trim()}%`
            }
        }

        if (req.query.status != "all") {
            query.where.status = req.query.status
        }

        if (req.query.updatedAt != "desc") {
            query.order = [["updatedAt", 'asc']]
        };

        const totalStatus = await Categories.count({
            where: {
                status: {
                    [Op.in]: ["active", "inactive"]
                }
            }
        });

        const totalStatusActive = await Categories.count({
            where: {
                status: "active"
            }
        });

        const totalStatusInactive = await Categories.count({
            where: {
                status: "inactive"
            }
        });

        const totalItem = await Categories.count(query);
        const pagination = funcPagination(Number(totalItem), Number(req.query.page), limit);
        query.offset = pagination.skip;    

        const categories: any = await Categories.findAll(query);

        const data: any = [];
        for (const item of categories) {
            const rawData: any = {
                ...item.dataValues,
                createdAtFormat: moment(item.dataValues.createdAt).format("HH:mm DD/MM/YYYY"),
                updatedAtFormat: moment(item.dataValues.updatedAt).format("HH:mm DD/MM/YYYY"),
            }
            data.push(rawData);
        };

        res.status(200).json({
            status: true,
            data: data,
            totalPages: pagination.totalPages,
            totalStatus: totalStatus,
            totalStatusActive: totalStatusActive,
            totalStatusInactive: totalStatusInactive
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}

export const UpdateCategoryController = async (req: admin, res: Response) => {
    try {
        if (req.file) {
            req.body.image = req.file.path;
        } else {
            delete req.body.image;
        };

        const category = await Categories.findByPk(Number(req.params.id));

        if (!category) {
            return res.status(404).json({
                status: true,
                msg: "Category not found!"
            })
        }

        if (req.body.image) {
            await category.update({
                categoryName: req.body.categoryName,
                status: req.body.status,
                image: req.body.image
            })
        } else {
            await category.update({
                categoryName: req.body.categoryName,
                status: req.body.status,
            })
        }

        res.status(200).json({
            status: true,
            msg: "Update successful!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}

export const DeleteCategoryController = async (req: admin, res: Response) => {
    try {
        const category = await Categories.findByPk(Number(req.params.id));

        if (!category) {
            return res.status(404).json({
                status: false,
                msg: "Category not found!"
            })
        };

        await category.update({
            status: "deleted"
        });

        res.status(200).json({
            status: true,
            msg: "Delete successful!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        })
    }
}

export const RecoveryCategoryController = async (req: admin, res: Response) => {
    try {
        const category = await Categories.findByPk(Number(req.params.id));

        if (!category) {
            return res.status(404).json({
                status: false,
                msg: "Category not found!"
            })
        };

        await category.update({
            status: "active"
        });

        res.status(200).json({
            status: true,
            msg: "Recovery successful!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        })
    }
}