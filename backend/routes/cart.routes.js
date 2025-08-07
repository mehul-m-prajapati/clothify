import express from 'express'
import {addToCart, updateCart, getUserCart} from '../controllers/cart.controller.js'
import userAuth from '../middlewares/userAuth.js'

const cartRouter = express.Router();

// /api/cart
cartRouter.post('/add', userAuth, addToCart);
cartRouter.post('/update', userAuth, updateCart);
cartRouter.get('/', userAuth, getUserCart);

export default cartRouter;
