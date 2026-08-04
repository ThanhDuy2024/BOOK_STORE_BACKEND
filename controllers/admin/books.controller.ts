import { Response } from "express";
import { admin } from "../../interfaces/admin.interface";
import { Categories } from "../../models/categories.model";
import { Op } from "sequelize";
import { Books } from "../../models/books.model";
import moment from "moment";
import { Books_Categories } from "../../models/books_categories.model";
import { Admin } from "../../models/admin.model";
import { funcPagination } from "../../helpers/pagination.helper";
const limit = 10;
export const PostBookController = async (req: admin, res: Response) => {
    try {
        if (req.file) {
            req.body.image = req.file.path;
        } else {
            delete req.body.image;
        };

        //const categories = JSON.parse(req.body.categories);
        const categories = req.body.categories;

        const checkCategories = await Categories.findAll({
            where: {
                id: {
                    [Op.in]: categories
                }
            }
        });

        if (checkCategories.length === 0) {
            return res.status(404).json({
                status: false,
                msg: "Categories not found!"
            })
        };

        const book: any = await Books.create({
            bookName: req.body.bookName,
            quantity: Number(req.body.quantity),
            author: req.body.author,
            publishing: req.body.publishing,
            price: Number(req.body.price),
            publication: moment(req.body.publication).format("DD/MM/YYYY"),
            status: req.body.status,
            image: req.body.image || "",
            description: req.body.description,
            createdBy: req.admin.id,
            updatedBy: req.admin.id,
        })

        const categoriesData = categories.map((item: any) => ({
            bookId: book.id,
            categoryId: item
        }));

        await Books_Categories.bulkCreate(categoriesData);

        res.status(200).json({
            status: true,
            msg: "Book has been created!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        })
    }
}

export const GetBookController = async (req: admin, res: Response) => {
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
                },
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
                status: {
                    [Op.in]: ["active", "inactive"]
                }
            },
            order: [
                ['updatedAt', 'desc']
            ],
            offset: 0,
            limit: limit
        };

        if (req.query.search !== "null") {
            query.where.bookName = {
                [Op.iLike]: `%${String(req.query.search).trim()}%`
            };
        };

        if (req.query.status !== "all") {
            query.where.status = req.query.status;
        };

        if (req.query.sortUpdatedAt === "desc") {
            query.order = [["updatedAt", "DESC"]];
        } else {
            query.order = [["updatedAt", "ASC"]];
        }

        if(req.query.priceFilter !== "null") {
            query.order = [
                ["price", String(req.query.priceFilter).toUpperCase()]
            ]
        };

        if(req.query.quantityFilter !== "null") {
            query.order = [
                ["quantity", String(req.query.quantityFilter).toUpperCase()]
            ]
        };

        const page = Number(req.query.page) || 1;
        const totalItem = await Books.count(query);
        const pagination = funcPagination(Number(totalItem), page, limit);
        query.offset = pagination.skip;

        const books = await Books.findAll(query);

        const data: any = [];

        for (const item of books) {
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

export const DetailBookController = async (req: admin, res: Response) => {
    try {
        res.status(200).json({
            status: 200
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        })
    }
}

export const UpdateBookController = async (req: admin, res: Response) => {
    try {
        res.status(200).json({
            status: 200
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        })
    }
}

export const DeleteBookController = async (req: admin, res: Response) => {
    try {
        res.status(200).json({
            status: 200
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        })
    }
}