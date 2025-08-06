import OrderModel from '../models/order.model.js'
import UserModel from '../models/user.model.js'
import stripe from 'stripe'
import razorpay from 'razorpay'

export const getAllOrders = async (req, res) => {
    try {
        const orders = OrderModel.find({});

        return res.status(200).json({message: 'Fetched all orders', orders});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUserOrders = async (req, res) => {
    try {

        const userOrders = OrderModel.find()

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const placeOrderCOD = async (req, res) => {
    try {

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

export const updateOrderStatus = async (req, res) => {
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
