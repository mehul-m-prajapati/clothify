import ProductModel from '../models/product.model.js'
import {uploadToCloudinary, deleteFromCloudinaryByUrl} from '../config/cloudinary.js'

const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestseller,
        } = req.body;

        // Check if images are availabe in req.files then it`ll store image in image variable
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];

        // Filter out undefined images
        const images = [image1, image2].filter((image) => image !== undefined);

        // Check if images are not available then it`ll throw an error
        if (images.length === 0) {
            throw new Error('Please upload at least one image');
        }

        let imgUrls = await Promise.all(
            images.map(async (image) => {
                const result = await uploadToCloudinary(image.path);
                return result.secure_url;
            })
        )

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === 'true' ? true : false,
            image: imgUrls,
            date: Date.now(),
        };

        const product = new ProductModel(productData);
        await product.save();

        return res.status(201).json({message: 'Product added successfully', product});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getListProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json({products});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const removeProduct = async (req, res) => {
    try {
        const id = req.body.id;

        const product = await ProductModel.findByIdAndDelete(id);
        if (!product)
            return res.status(404).json({message: 'Product not found'});

        await deleteFromCloudinaryByUrl(product.image[0]);

        return res.status(200).json({message: 'Product removed successfully'});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const {productId} = req.params;

        const product = await ProductModel.findById(productId);
        if (!product)
            return res.status(404).json({message: 'Product not found'});

        return res.status(200).json({product});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export {
    addProduct,
    getListProducts,
    removeProduct,
    getSingleProduct,
}
