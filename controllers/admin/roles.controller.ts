import { Request, Response } from "express";
import { admin } from "../../interfaces/admin.interface";
import { Roles } from "../../models/roles.model";
import { Op } from "sequelize";
import { Admin } from "../../models/admin.model";
import moment from "moment";
import { funcPagination } from "../../helpers/pagination.helper";
const limit = 10;
export const CreateRoleController = async (req: Request, res: Response) => {
    try {
        const { roleName, permission } = req.body;


        const checkRoleName = await Roles.findOne({
            where: {
                roleName: {
                    [Op.iLike]: `${roleName}`
                }
            }
        });

        if (checkRoleName) {
            return res.status(400).json({
                status: false,
                msg: "Role name has been existed!"
            })
        };

        await Roles.create({
            roleName: roleName,
            permission: permission,
            status: req.body.status,
            createdBy: 1,
            updatedBy: 1
        });

        res.status(200).json({
            status: true,
            msg: "Role has been created"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        })
    }
}

export const GetRoleController = async (req: admin, res: Response) => {
    try {
        const query: any = {
            include: [
                {
                    model: Admin,
                    attributes: ["id", "adminName"],
                    as: "creator"
                },
                {
                    model: Admin,
                    attributes: ["id", "adminName"],
                    as: "updater"
                },
            ],
            where: {
                status: {
                    [Op.in]: ["active", "inactive"]
                }
            },
            order: [
                ["updatedAt", "DESC"]
            ],
            offset: 0,
            limit: limit
        }

        if(req.query.search != "null") {
            query.where.roleName = {
                [Op.iLike]: `%${req.query.search}%`
            }
        };

        if(req.query.status != "all") {
            query.where.status = req.query.status;
        }

        const page = req.query.page || 1;

        const totalItem = await Roles.count(query);

        const pagination = funcPagination(totalItem, Number(page), limit);

        query.offset = pagination.skip;
        
        const roles: any = await Roles.findAll(query);
        const data: any = [];
        for (const item of roles) {
            const rawData = {
                ...item.dataValues,
                createdAtFormat: moment(item.dataValues.createdAt).format("HH:mm DD/MM/YYYY"),
                updatedAtFormat: moment(item.dataValues.updatedAt).format("HH:mm DD/MM/YYYY"),
            }
            data.push(rawData);
        };

        res.status(200).json({
            status: true,
            data: data,
            totalPage: pagination.totalPages
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        })
    }
}

export const UpdateRoleController = async (req: admin, res: Response) => {
    try {
        const { roleName, status, permission } = req.body;

        const role = await Roles.findByPk(Number(req.params.id));

        if (!role) {
            return res.status(404).json({
                status: false,
                msg: "Role not found"
            })
        };

        await role.update({
            roleName: roleName,
            status: status,
            permission: permission,
            updatedBy: req.admin.id,
        });

        res.status(200).json({
            status: true,
            msg: "Role has been updated"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        })
    }
}

export const DetailRoleController = async (req: admin, res: Response) => {
    try {
        const { id } = req.params;

        const role: any = await Roles.findOne({
            where: {
                id: id,
                status: {
                    [Op.in]: ["active", "inactive"]
                }
            }
        });

        if (!role) {
            return res.status(404).json({
                status: false,
                msg: "Role not found!"
            })
        };

        res.status(200).json({
            status: true,
            data: role
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        })
    }
}

export const DeleteRoleController = async (req: admin, res: Response) => {
    try {
        const { id } = req.params;

        const role = await Roles.findOne({
            where: {
                id: id,
                status: {
                    [Op.in]: ["active", "inactive"]
                }
            }
        });

        if (!role) {
            return res.status(404).json({
                status: false,
                msg: "Role not found!"
            })
        };

        await role.update({
            status: "deleted"
        });

        res.status(200).json({
            status: true,
            msg: "Role has been deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        })
    }
}