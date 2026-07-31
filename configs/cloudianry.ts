import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from "multer-storage-cloudinary"
import 'dotenv/config';
cloudinary.config({ 
  cloud_name: String(process.env.CLOUD_NAME), 
  api_key: String(process.env.CLOUD_API), 
  api_secret: String(process.env.CLOUD_SECRET)
});

export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});