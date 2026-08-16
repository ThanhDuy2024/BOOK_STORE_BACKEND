import { Request, Response } from "express";
import { Orders } from "../../models/order.model";
import { Orders_items } from "../../models/orders_items.model";
import { Books } from "../../models/books.model";
import { Op, literal } from "sequelize";
import axios from "axios";
import CryptoJS from "crypto-js";
import moment from "moment";
import { ZALOPAY_CONFIG } from "../../configs/zalopay"
export const PostOrderClientController = async (req: Request, res: Response) => {
    try {
        let redFlag: boolean = true;
        for (const item of req.body.items) {
            const checkBook = await Books.findOne({
                where: {
                    id: item.id,
                    status: "active",
                    quantity: {
                        [Op.gte]: item.buyQuantity
                    }
                }
            });

            if (!checkBook) {
                redFlag = false;
                break;
            };
        }

        if (redFlag === false) {
            return res.status(404).json({
                status: false,
                msg: "Number of books exceeds the limit"
            })
        }

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

            await Books.update(
                { quantity: literal(`quantity - ${item.buyQuantity}`) },
                { where: { id: item.id } }
            )
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

export const PostOrderZaloClientController = async (req: Request, res: Response) => {
    try {
        let redFlag: boolean = true;
        for (const item of req.body.items) {
            const checkBook = await Books.findOne({
                where: {
                    id: item.id,
                    status: "active",
                    quantity: {
                        [Op.gte]: item.buyQuantity
                    }
                }
            });

            if (!checkBook) {
                redFlag = false;
                break;
            };
        }

        if (redFlag === false) {
            return res.status(404).json({
                status: false,
                msg: "Number of books exceeds the limit"
            })
        }

        const orderItem = await Orders.create({
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
                orderId: orderItem.dataValues.id
            })

            await Books.update(
                { quantity: literal(`quantity - ${item.buyQuantity}`) },
                { where: { id: item.id } }
            )
        }

        const embed_data = {
            redirecturl: `${process.env.FRONTEND_URL}/order/success`,
        };

        const items = [{
            itemname: "Thanh toán dịnh vụ cửa hàng sách"
        }];

        const transID = Math.floor(Math.random() * 1000000);

        const order: any = {
            app_id: ZALOPAY_CONFIG.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: "user123",
            app_time: Date.now(), // miliseconds
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: Number(req.body.totalAmount),
            description: `Thông tin đơn hàng #${transID}`,
            bank_code: "",
            callback_url: `${process.env.FRONTEND_URL}/order/success`,
        };

        const data = ZALOPAY_CONFIG.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
        order.mac = CryptoJS.HmacSHA256(data, ZALOPAY_CONFIG.key1).toString();

        const response = await axios.post(ZALOPAY_CONFIG.endpoint, null, { params: order })

        if (response.data.return_code == 1) {
            console.log(response)
            res.status(200).json({
                status: true,
                paymentUrl: response.data.order_url,
                msg: "Order successful!"
            })
        } else {
            return res.redirect("/");
        }

        await orderItem.update({
            paymentStatus: "paid"
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        })
    }
}