import { Response } from "express";
import { admin } from "../../interfaces/admin.interface";
import { Categories } from "../../models/categories.model";
import { Op } from "sequelize";
import { Books } from "../../models/books.model";
import moment from "moment";
import { Books_Categories } from "../../models/books_categories.model";

export const PostBookController = async (req: admin, res: Response) => {
    try {
        if(req.file) {
            req.body.image = req.file.path;
        } else {
            delete req.body.image;
        };
        
        const categories = JSON.parse(req.body.categories);

        const checkCategories = await Categories.findAll({
            where: {
                id: {
                    [Op.in]: categories
                }
            }
        });

        if(checkCategories.length === 0) {
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
            status: 200,
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