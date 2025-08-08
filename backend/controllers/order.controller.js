import OrderModel from '../models/order.model.js'
import UserModel from '../models/user.model.js'
import Stripe from 'stripe'
import Razorpay from 'razorpay'

const currency = 'inr';
const deliveryCharge = 10;

// Stripe payment configuration
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Get all order data for admin panel --> /api/order/list
export const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({});

        return res.status(200).json({message: 'Fetched all orders', orders});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// order data of a user --> /api/order/userorders
export const getUserOrders = async (req, res) => {

    try {
        const {userId} = req.body;
        const orders = await OrderModel.find({userId});

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

// /api/order/razorpay
export const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            orderStatus: 'Order Placed',
            paymentMethod: 'Razorpay',
            payment: false,
            date: Date.now(),
        }

        const order = await OrderModel.create(orderData);

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: order._id.toString(),
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);

                return res.status(406).json({message: error});
            }
            else {
                return res.status(200).json({message: 'Payment successful', order});
            }
        });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Place order using Stripe method --> /api/order/stripe
export const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now(),
        };

        const order = await OrderModel.create(orderData);

        const line_items = items.map(item => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery fee',
                },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${order._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
            line_items,
            mode: 'payment'
        });

        return res.status(200).json({sessionUrl: session.url});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const verifyRazorpay = async (req, res) => {
    try {

        const {userId, razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === 'paid') {
            await OrderModel.findByIdAndUpdate(orderInfo.receipt, {payment: true});
            await UserModel.findByIdAndUpdate(userId, {cartData: {}});

            return res.status(200).json({message: 'Payment successful'});
        }
        else {
            return res.status(406).json({message: 'Payment failed'});
        }

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// verify Stripe payment success or failure --> /api/order/verifyStripe
export const verifyStripePayment = async (req, res) => {

    const { orderId, success, userId } = req.body;

    try {
        if (success === 'true') {
            await OrderModel.findByIdAndUpdate(orderId, {payment: true});
            await UserModel.findByIdAndUpdate(userId, {cartData: {}});

            return res.status(200).json({message: 'Payment successful'});
        }
        else {
            await OrderModel.findByIdAndDelete(orderId);

            return res.status(406).json({message: 'Payment failed'});
        }
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
