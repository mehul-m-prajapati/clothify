import OrderModel from '../models/order.model.js'
import UserModel from '../models/user.model.js'
import stripe from 'stripe'
import razorpay from 'razorpay'

// Get all order data for admin panel --> /api/order/list
export const getAllOrders = async (req, res) => {
    try {
        const orders = OrderModel.find({});

        return res.status(200).json({message: 'Fetched all orders', orders});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// order data of a user --> /api/order/userorders
export const getUserOrders = async (req, res) => {

    try {
        const {userId} = req.body;
        const orders = OrderModel.find({userId});

        return res.status(200).json({message: 'Orders found', orders})

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Place order using COD method --> /api/order/place
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            orderStatus: 'Order Placed',
            paymentMethod: 'COD',
            payment: false,
            date: Date.now(),
        }

        const order = await OrderModel.create(orderData);

        // clear user cart
        await UserModel.findByIdAndUpdate(userId, {cartData: {}});

        return res.status(200).json({message: 'Order placed successfully'})

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const placeOrderRazorpay = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const placeOrderStripe = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const verifyStripePayment = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// update order status --> /api/order/status
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, orderStatus } = req.body;

        await OrderModel.findByIdAndUpdate(orderId, {orderStatus});

        return res.status(200).json({message: 'Order status updated successfully'})

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
