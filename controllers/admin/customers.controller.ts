import { Response } from "express";
import { admin } from "../../interfaces/admin.interface";
import { Customer } from "../../models/customer.model";
import { Op } from "sequelize";
import moment from "moment";
import { funcPagination } from "../../helpers/pagination.helper";
import { Comments } from "../../models/comments.model";

export const GetAllCustomerAdminController = async (req: admin, res: Response) => {
    try {
        const query: any = {
            attributes: { exclude: ['password'] },
            where: {
                status: {
                    [Op.in]: ["active", "inactive"]
                },
            },
            order: [
                ["createdAt", "desc"]
            ],
            offset: 0,
            limit: req.query.limit || 10
        };

        if(req.query.search != "null") {
            query.where.fullName = {
                [Op.iLike]: `%${req.query.search}%`
            }
        };

        if(req.query.email_search != "null") {
            query.where.email = `${req.query.email_search}`
        };

        if(req.query.status != "null") {
            query.where.status = req.query.status;
        };

        const page = Number(req.query.page) || 1;
        const totalCustomers = await Customer.count(query);
        const pagination = funcPagination(totalCustomers, page, Number(req.query.limit));
        query.offset = pagination.skip;

        const customers = await Customer.findAll(query);

        const data: any = [];
        for (const item of customers) {
            const rawData: any = {
                ...item.dataValues,
                createdAtFormat: moment(item.dataValues.createdAt).format("HH:mm DD/MM/YYYY")
            };
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

export const GetCustomerAdminController = async (req: admin, res: Response) => {
    try {
        const customer: any = await Customer.findOne({
            attributes: { exclude: ["password"] },
            include: [
                {
                    model: Comments,
                    as: "comments"
                }
            ],
            where: {
                id: req.params.id,
                status: {
                    [Op.in]: ["active", "inactive"]
                }
            }
        });

        if(!customer) {
            return res.status(404).json({
                status: false,
                msg: "Customer not found!"
            })
        }

        customer.dataValues.createdAtFormat = moment(customer.dataValues.createdAt).format("HH:mm DD/MM/YYYY");
        
        const comments = customer.dataValues.comments;

        const newCommentsList: any = [];
        for (const item of comments) {
            const rawData: any = {
                ...item.dataValues,
                createdAtFormat: moment(item.dataValues.createdAt).format("HH:mm DD/MM/YYYY")
            }
            newCommentsList.push(rawData);
        };

        customer.dataValues.comments = newCommentsList;
        
        res.status(200).json({
            status: true,
            data: customer.dataValues
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}