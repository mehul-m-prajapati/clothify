import UserModel from '../models/user.model.js'


// add products to user cart
const addToCart = async (req, res) => {
    try {

        const { userId, itemId, size } = req.body;
        const user = await UserModel.findById(userId);
        if (!user)
            return res.status(404).json({message: 'User not found'});

        const cartData = user.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size])
                cartData[itemId][size] += 1;
            else
                cartData[itemId][size] = 1;
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await user.save();

        return res.status(200).json({message: 'Item updated to cart successfully'});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateCart = async (req, res) => {
    try {

        const { userId, itemId, size, quantity } = req.body;

        const user = await UserModel.findById(userId);
        if (!user)
            return res.status(404).json({message: 'User not found'});

        const cartData = user.cartData;

        if (!cartData[itemId])
            cartData[itemId] = {};
        else
            cartData[itemId][size] = quantity;

        await user.save();

        return res.status(200).json({message: 'cart updated successfully'});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUserCart = async (req, res) => {
    try {
        const {userId} = req.body;

        const user = await UserModel.findById(userId);
        if (!user)
            return res.status(404).json({message: 'User not found'});

        return res.status(200).json({cartData: user.cartData});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export {
    addToCart,
    updateCart,
    getUserCart
}
