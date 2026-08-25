import { Request, Response } from "express";
import { Books } from "../../models/books.model";
import { Comments } from "../../models/comments.model";
import { client } from "../../interfaces/client.interface";
import moment from "moment";
import { Customer } from "../../models/customer.model";
import { funcPagination } from "../../helpers/pagination.helper";

export const PostCommentClientController = async (req: client, res: Response) => {
    try {
        const book = await Books.findOne({
            where: {
                id: req.body.id,
                status: "active"
            }
        });

        if (!book) {
            return res.status(404).json({
                status: false,
                msg: "Book not found!"
            })
        };

        await Comments.create({
            productId: req.body.id,
            customerId: req.client.id,
            comment: req.body.comment,
        })
        res.status(200).json({
            status: true,
            msg: "Post comment successful!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}

export const GetAllCommentClientInProductController = async (req: Request, res: Response) => {
    try {
        const query: any = {
            include: [
                {
                    model: Customer,
                    as: 'customer',
                    attributes: ["id", "fullName", "image"]
                }
            ],
            where: {
                productId: req.params.id,
                status: "active"
            },
            order: [
                ["createdAt", "DESC"]
            ],
            offset: 0,
            limit: req.query.limit || 5
        };

        const totalItem = await Comments.count(query);
        const page = req.query.page || 1
        const limit = req.query.limit || 5
        const pagination = funcPagination(totalItem, page, limit);
    
        query.offset = pagination.skip;

        const comments = await Comments.findAll(query);

        const data: any = []
        for (const item of comments) {
            const rawData: any = {
                ...item.dataValues,
                createdAtFormat: moment(item.dataValues.createdAt).format("HH:mm DD/MM/YYYY")
            }
            data.push(rawData)
        }

        res.status(200).json({
            status: true,
            data: data,
            totalPage: pagination.totalPages
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        })
    }
}