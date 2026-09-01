import { Response } from "express";
import { admin } from "../../interfaces/admin.interface";
import { Orders } from "../../models/order.model";
import { Op } from "sequelize";
import moment from "moment";
import { funcPagination } from "../../helpers/pagination.helper";

export const GetAllOrderAdminController = async (req: admin, res: Response) => {
    try {
        const query: any = {
            where: {
                status: {
                    [Op.notIn]: ["deleted"]
                }
            },
            order: [
                ["createdAt", "DESC"]
            ],
            offset: 0,
            limit: req.query.limit || 10
        }

        if(req.query.search_email !== "null") {
            query.where.email = req.query.search_email;
        }

        if(req.query.paymentMethod !== "null") {
            query.where.paymentMethod = req.query.paymentMethod;
        };

        if(req.query.paymentStatus !== "null") {
            query.where.paymentStatus = req.query.paymentStatus;
        };

        if(req.query.totalAmount !== "null") {
            query.order =  [
                ["totalAmount", `${req.query.totalAmount}`]
            ]
        };

        if(req.query.status !== "null") {
            query.where.status = req.query.status;
        };

        if(req.query.createdAt != "null") {
            query.order = [
                ["createdAt", `${req.query.createdAt}`]
            ];
        };

        const totalOrder = await Orders.count(query);
        const page = Number(req.query.page) || 1;
        const pagination = funcPagination(totalOrder, page, Number(req.query.limit));
        query.offset = pagination.skip;

        const orderList = await Orders.findAll(query);

        const data: any = [];
        for (const item of orderList) {
            const rawData: any = {
                ...item.dataValues,
                createdAtFormat: moment(item.dataValues.createdAt).format("HH:mm DD/MM/YYYY"),
                updatedAtFormat: moment(item.dataValues.updatedAt).format("HH:mm DD/MM/YYYY")
            }
            data.push(rawData);
        };

        res.status(200).json({
            status: true,
            data: data,
            totalPage: pagination.totalPages,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"

        })
    }
}