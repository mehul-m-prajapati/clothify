import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import axios from 'axios';
import { toast } from 'react-toastify';

function PlaceOrder() {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const initPay = (order) => {

    const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Order Payment',
        description: 'Order Payment',
        order_id: order.id,
        receipt: order.receipt,
        handler: async (response) => {

            try {
                const resp = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, {headers: token});
                if (resp.status === 200) {
                    navigate('/orders');
                    setCartItems({});
                }
                else {
                    toast.error(resp.message);
                }
            }
            catch (error) {
                toast.error(error.message);
            }
        }
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // [name] means: use the value of the name variable as the key.
    // e.g. <input name="email" value="someone@example.com" />
    /*
        {
            ...prev,
            email: 'someone@example.com'
        }
    */
    setFormData(prev => ({...prev, [name]: value}))
  }

  const onSubmitHandler = async (e) => {

    e.preventDefault();

    try {

        const orderItems = [];

        for (const itemId in cartItems) {

            for (const size in cartItems[itemId]) {

                if (cartItems[itemId][size] > 0) {

                    const itemInfo = structuredClone(products.find(p => p._id === itemId));
                    if (itemInfo) {
                        itemInfo.size = size;
                        itemInfo.quantity = cartItems[itemId][size];
                        orderItems.push(itemInfo);
                    }
                }
            }
        }

        const orderData = {
            address: formData,
            items: orderItems,
            amount: getCartAmount() + delivery_fee
        }

        switch (paymentMethod) {
            // API call for COD payment method
            case 'cod': {
                const resp = await axios.post(backendUrl + '/api/order/place', orderData, {headers: {token}});
                if (resp.status === 200) {
                    setCartItems({});
                    navigate('/orders');
                }
                else {
                    toast.error(resp.message);
                }
                break;
            }

            // API calls for Stripe payment method
            case 'stripe': {
                const resp = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers: {token}});

                if (resp.status === 200) {
                    const {sessionUrl} = resp.data;
                    window.location.replace(sessionUrl);
                }
                else {
                    toast.error(resp.message);
                }
                break;
            }

            case 'razorpay': {
                const resp = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers: {token}});

                if (resp.status === 200) {
                    initPay(resp.data.order);
                }
                else {
                    toast.error(resp.message);
                }
                break;
            }

            default:
                break;

        }
    }
    catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
  }

  return (
    <form onSubmit={onSubmitHandler}
    className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">

      {/* --------------- Left Side ----------------------- */}

      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

        <div className="text-xl sm:text-2xl my-3 ">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            name='firstName'
            onChange={onChangeHandler}
            value={formData.firstName}
            type="text"
            required
            placeholder="First Name"
            className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            name='lastName'
            onChange={onChangeHandler}
            value={formData.lastName}
            type="text"
            placeholder="Last Name"
            className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          name='email'
          onChange={onChangeHandler}
          value={formData.email}
          type="email"
          placeholder="Email Address"
          className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          name='street'
          required
          onChange={onChangeHandler}
          value={formData.street}
          type="text"
          placeholder="Street"
          className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex flex-col sm:flex-row  gap-3">
          <input
            name='city'
            required
            onChange={onChangeHandler}
            value={formData.city}
            type="text"
            placeholder="City"
            className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            name='state'
            required
            onChange={onChangeHandler}
            value={formData.state}
            type="text"
            placeholder="State"
            className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex flex-col sm:flex-row  gap-3">
          <input
            name='zipcode'
            required
            onChange={onChangeHandler}
            value={formData.zipcode}
            type="text"
            placeholder="Zipcode"
            className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            name='country'
            required
            onChange={onChangeHandler}
            value={formData.country}
            type="text"
            placeholder="Country"
            className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          name='phone'
          required
          onChange={onChangeHandler}
          value={formData.phone}
          type="number"
          placeholder="Phone "
          className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      {/* --------------- Right Side ----------------------- */}
      <div className="mt-8">
        <div className="mt8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          {/* -------------- Payment method selection : start -------------- */}

          <div className="flex flex-col lg:flex-row gap-4">

            <div
              onClick={() => {
                setPaymentMethod('stripe');
              }}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={` min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === 'stripe' ? 'bg-green-400' : ''
                }`}
              ></p>
              <img className="h5 mx-4" src={assets.stripe_logo} alt="" />
            </div>

            <div
              onClick={() => {
                setPaymentMethod('razorpay');
              }}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={` min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === 'razorpay' ? 'bg-green-400' : ''
                }`}
              ></p>
              <img className="h5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>

            <div
              onClick={() => {
                setPaymentMethod('cod');
              }}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={` min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === 'cod' ? 'bg-green-400' : ''
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                {' '}
                CASH ON DELIVARY
              </p>
            </div>
          </div>

          {/* -------------- Payment method selection : end -------------- */}

          <div className="w-full text-end mt-8">
            <button
              type='submit'
              className="bg-black text-white px-16 py-3 text-sm cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
