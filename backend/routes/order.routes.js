import express from 'express'
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  placeOrderRazorpay,
  placeOrderStripe,
  updateOrderStatus,
  verifyStripePayment,
} from '../controllers/order.controller.js';

import adminAuth from '../middlewares/adminAuth.js'
import userAuth from '../middlewares/userAuth.js';

const orderRouter = express.Router();

// Admin features
orderRouter.get('/list', adminAuth, getAllOrders);
orderRouter.post('/status', adminAuth, updateOrderStatus);

// Place order / Payment features
orderRouter.post('/place', userAuth, placeOrderCOD);
orderRouter.post('/stripe', userAuth, placeOrderStripe);
orderRouter.post('/razorpay', userAuth, placeOrderRazorpay);

// User features
orderRouter.get('/userorders', userAuth, getUserOrders);

// verify payment
orderRouter.post('/verifyStripe', userAuth, verifyStripePayment);


export default orderRouter;
