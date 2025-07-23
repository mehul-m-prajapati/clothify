import { createContext } from "react";
import { products } from "../assets/assets";
import PropTypes from 'prop-types';


export const ShopContext = createContext();

const ShopContextProvider = ({children}) => {

    const currency = '$';
    const delivery_fee = 10;


    const addToCart = async () => {

    }

    const addOrder = () => {
    }

    const getCartCount = () => {
    }

    const updateQuantity = async() => {

    }

    const getCartAmount = () => {
    }

    const contextValue = {
        products,
        currency,
        delivery_fee,
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
