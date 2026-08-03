"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBookController = exports.UpdateBookController = exports.DetailBookController = exports.GetBookController = exports.PostBookController = void 0;
const PostBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            status: 200
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        });
    }
});
exports.PostBookController = PostBookController;
const GetBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            status: 200
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        });
    }
});
exports.GetBookController = GetBookController;
const DetailBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            status: 200
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        });
    }
});
exports.DetailBookController = DetailBookController;
const UpdateBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            status: 200
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        });
    }
});
exports.UpdateBookController = UpdateBookController;
const DeleteBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            status: 200
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        });
    }
});
exports.DeleteBookController = DeleteBookController;
