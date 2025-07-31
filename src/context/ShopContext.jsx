import { createContext, useEffect, useReducer, useState } from "react";
import { products } from "../assets/assets";
import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({children}) => {

    const currency = '$';
    const delivery_fee = 10;
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState('');
    const location = useLocation();
    const [cartItems, setCartItems] = useState({});

    useEffect(() => {
        if (location.pathname.includes('collection') )
            setShowSearch(true);
        else
            setShowSearch(false);

    }, [location]);

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Please select a size');
            return;
        }

        let cartData = structuredClone(cartItems);

        /*
        const cartItems = {
            "item123": {
                "M": 2,
                "L": 1
            },
            "item456": {
                "S": 1
            }
        };
        */
        if (cartData[itemId]) {
            cartData[itemId][size] ? (cartData[itemId][size] += 1) : (cartData[itemId][size] = 1);
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);
    };

    const addOrder = () => {
    }

    const getCartCount = () => {
        let totalCount = 0;

        for (const itemId in cartItems) {
            const sizes = cartItems[itemId];
            for (const sizeType in sizes) {
                try {
                    let sizeCnt = sizes[sizeType];
                    if (sizeCnt > 0)
                        totalCount += sizeCnt;
                } catch (error) {
                    console.log("Err: getCartCount:", error);
                }
            }
        }

        return totalCount;
    }

    const updateQuantity = async(itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            const productInfo = products.find(p => p._id === item);

            for (const itemSize in cartItems[item]) {
                try {
                    const itemQuantity = cartItems[item][itemSize];
                    if (itemQuantity > 0)
                        totalAmount += productInfo.price * itemQuantity;
                } catch (error) {
                    console.log('error', error);
                }
            }
        }

        return totalAmount;
    }

    const contextValue = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        addOrder,
        getCartAmount,
        getCartCount,
        updateQuantity,
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )

}



ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ShopContextProvider;
