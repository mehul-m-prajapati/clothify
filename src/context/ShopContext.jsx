import { createContext, useEffect, useReducer, useState } from "react";
import { products } from "../assets/assets";
import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";


export const ShopContext = createContext();

const ShopContextProvider = ({children}) => {

    const currency = '$';
    const delivery_fee = 10;
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection') )
            setShowSearch(true);
        else
            setShowSearch(false);

    }, [location]);

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
        search,
        setSearch,
        showSearch,
        setShowSearch,
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
