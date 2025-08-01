import {v2 as cloudinary} from 'cloudinary'


export const connectToCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    });
}


export const uploadToCloudinary = async (image) => {
  const result = await cloudinary.uploader.upload(image);
  console.log(result);
}
