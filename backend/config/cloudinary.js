import {v2 as cloudinary} from 'cloudinary'
import path from 'path';


export const connectToCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    });
}

export const uploadToCloudinary = async (image) => {
  const result = await cloudinary.uploader.upload(image, {resource_type: 'image'});
  return result;
}

export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  }
  catch (error) {
    console.error('Error deleting from Cloudinary:', error.message);
    throw error;
  }
}

export const deleteFromCloudinaryByUrl = async (url) => {
  try {
    // Step 1: Remove query string if any
    const cleanUrl = url.split('?')[0];

    // Step 2: Extract the part after /upload/ (e.g. "folder/imageName.jpg")
    const parts = cleanUrl.split('/upload/');
    if (parts.length < 2) throw new Error('Invalid Cloudinary URL');

    const imagePath = parts[1]; // "folder/imageName.jpg"

    // Step 3: Remove file extension to get public_id
    let pubId = imagePath.split('/')[1];
    const publicId = pubId.replace(path.extname(imagePath), '');

    // Step 4: Destroy the image
    const result = await cloudinary.uploader.destroy(publicId);

    return result;
  }
  catch (error) {
    console.error('Failed to delete image from Cloudinary:', error.message);
    throw error;
  }
};
