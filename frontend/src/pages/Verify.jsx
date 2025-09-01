import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Verify() {

  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyStripePayment = async () => {

    try {
        if (!token)
            return null;

        const resp = await axios.post(backendUrl + '/api/order/verifyStripe', {success, orderId}, {headers: {token}});

        if (resp.status === 200) {
            setCartItems({});
            navigate('/orders');
        }
        else {
            navigate('/cart');
            toast.error(resp.message);
        }

    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
  }

  useEffect(() => {
    verifyStripePayment();
  }, [token]);

  return (
    <div>
        <p className=''>Verifying payment...</p>
    </div>
  )
}

export default Verify
