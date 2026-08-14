import { Request, Response } from "express";
import { Books } from "../../models/books.model";
import { Op } from "sequelize";
import { Categories } from "../../models/categories.model";
import { funcPagination } from "../../helpers/pagination.helper";

export const GetAllBookClientController = async (req: Request, res: Response) => {
    try {
        const query: any = {
            nest: true,
            include: [
                {
                    model: Categories,
                    as: "categories",
                    attributes: ["id", "categoryName"],
                    where: {
                        status: "active"
                    }
                }
            ],
            where: {
                status: "active",
                quantity: {
                    [Op.gte]: 0
                }
            },
            offset: 0,
            limit: req.query.limit || 10,
            order: [
                ["totalSale", "DESC"]
            ]
        }

        if (req.query.category != "all") {
            query.include[0].where.id = Number(req.query.category);
        };

        if (req.query.searchBookName != "null") {
            query.where.bookName = {
                [Op.iLike]: `%${req.query.searchBookName}%`
            }
        };

        if (req.query.searchAuthor != "null") {
            query.where.author = {
                [Op.iLike]: `%${req.query.searchAuthor}%`
            }
        };

        if (req.query.priceFilter != "null") {
            if (req.query.priceFilter === "desc") {
                query.order = [
                    ["price", "DESC"]
                ]
            } else {
                query.order = [
                    ["price", "ASC"]
                ]
            }
        }

        if (req.query.sortCreatedAt != "null") {
            if (req.query.sortCreatedAt === "desc") {
                query.order = [
                    ["createdAt", "DESC"]
                ]
            } else {
                query.order = [
                    ["createdAt", "ASC"]
                ]
            }
        }

        const page = Number(req.query.page) || 1
        const totalItem = await Books.count(query);
        const pagination = funcPagination(totalItem, page, Number(req.query.limit));
        query.offset = pagination.skip;
        
        const books: any = await Books.findAll(query);
        res.status(200).json({
            status: true,
            data: books,
            totalPage: pagination.totalPages
        })
    } catch (error) {
        console.log(error);
        res.status(200).json({
            status: true,
            msg: "Bad request!"
        })
    }
}

export const GetDetailBookClientController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const book = await Books.findOne({
            include: [
                {
                    model: Categories,
                    as: "categories",
                    attributes: ["id", "categoryName"],
                    where: {
                        status: "active"
                    }
                }
            ],
            where: {
                id: id,
                status: "active",
                quantity: {
                    [Op.gte]: 0
                }
            }
        });

        if (!book) {
            return res.status(404).json({
                status: false,
                msg: "Book not found!"
            })
        };

        res.status(200).json({
            status: true,
            data: book.dataValues
        })
    } catch (error) {
        console.log(error);
        res.status(200).json({
            status: true,
            msg: "Bad request!"
        })
    }
}