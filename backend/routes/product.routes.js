import {addProduct, getListProducts, removeProduct, getSingleProduct} from '../controllers/product.controller.js'
import express from 'express'
import adminAuth from '../middlewares/adminAuth.js'
import upload from '../middlewares/multer.js'


const productRouter = express.Router();


/* /api/product */
productRouter.get('/list', getListProducts);
productRouter.get('/single', getSingleProduct);

productRouter.post('/add', adminAuth, upload.fields([{name: 'image1', maxCount: 1}]), addProduct);
productRouter.post('/remove', adminAuth, removeProduct);

export default productRouter;
