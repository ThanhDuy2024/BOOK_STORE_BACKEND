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
exports.PostContactController = void 0;
const contacts_model_1 = require("../../models/contacts.model");
const PostContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, message } = req.body;
        yield contacts_model_1.Contacts.create({
            email: email,
            message: message
        });
        res.status(200).json({
            status: true,
            msg: "Send contact successful!"
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: "Bad request!"
        });
    }
});
exports.PostContactController = PostContactController;
