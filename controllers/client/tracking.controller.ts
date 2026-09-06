import { Request, Response } from "express";
import { Orders } from "../../models/order.model";
import { Op } from "sequelize";
import { Orders_items } from "../../models/orders_items.model";
import moment from "moment";

export const PostTrackingClientController = async (req: Request, res: Response) => {
    try {
        const { orderId, email } = req.body;

        const order = await Orders.findOne({
            include: {
                model: Orders_items,
                as: "items"
            },
            where: {
                status: {
                    [Op.notIn]: ["deleted"]
                },
                id: orderId,
                email: email
            }
        });

        if(!order) {
            return res.status(404).json({
                status: false,
                msg: "Your order not found!"
            })
        };

        order.dataValues.createdAtFormat = moment(order.dataValues.createdAt).format("HH:mm DD/MM/YYYY");
        order.dataValues.updatedAtFormat = moment(order.dataValues.updatedAt).format("HH:mm DD/MM/YYYY");

        res.status(200).json({
            status: true,
            msg: "Tracking complete!",
            data: order.dataValues
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}