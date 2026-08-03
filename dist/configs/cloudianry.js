"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
require("dotenv/config");
cloudinary_1.v2.config({
    cloud_name: String(process.env.CLOUD_NAME),
    api_key: String(process.env.CLOUD_API),
    api_secret: String(process.env.CLOUD_SECRET)
});
exports.storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
});
