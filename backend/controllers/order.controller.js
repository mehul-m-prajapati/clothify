

export const getAllOrders = async (req, res) => {
    try {
        const orders = [];

        console.log('req received');


        return res.status(200).json({message: 'status: ok', orders});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUserOrders = async (req, res) => {
    try {

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
