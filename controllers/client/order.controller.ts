import { Request, Response } from "express";
import { Orders } from "../../models/order.model";
import { Orders_items } from "../../models/orders_items.model";

export const PostOrderClientController = async (req: Request, res: Response) => {
    try {
        const order = await Orders.create({
            fullName: req.body.customer.fullName,
            email: req.body.customer.email,
            address: req.body.customer.address,
            phone: req.body.customer.phone,
            paymentMethod: req.body.customer.paymentMethod,
            totalAmount: req.body.totalAmount
        });

        for (const item of req.body.items) {
            await Orders_items.create({
                bookId: item.id,
                bookName: item.bookName,
                image: item.image,
                buyQuantity: item.buyQuantity,
                price: item.price,
                orderId: order.dataValues.id
            })
        }
        res.status(200).json({
            status: true,
            msg: "Order successful!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        })
    }
}