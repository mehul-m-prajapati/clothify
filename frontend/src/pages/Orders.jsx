import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from "../components/Title"
import { toast } from 'react-toastify';
import axios from 'axios';

function Orders() {

  const { orders, products, currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const fetchOrderData = async () => {
    try {
        if (!token)
            return null;

        const resp = await axios.post(backendUrl + '/api/order/userorders', {}, {headers: {token}});

        if (resp.status === 200) {
            let allOrderItems = [];

            resp.data.orders.map(order => {
                order.items.map(item => {
                    item['orderStatus'] = order.orderStatus;
                    item['payment'] = order.payment;
                    item['paymentMethod'] = order.paymentMethod;
                    item['date'] = order.date;

                    allOrderItems.push(item);
                });
            });

            setOrderData(allOrderItems.reverse());
        }
        else {
            toast.error(resp.message);
        }

    } catch (error) {
        toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchOrderData();
  }, [token]);

  // Function to format the current date
  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Get the current date
  const currentDate = formatDate(new Date());

  return (
    <div className="pt-16 border-t">
        <div className="mb-3 text-2xl">
            <Title text1={'MY'} text2={'ORDERS'} />
        </div>

        {orderData.length === 0 ? (
            <p className="text-gray-500">You have no orders.</p>
        ) : (
            <div>
                {
                    orderData.map((order, index) => {
                        return (
                            <div
                                key={index}
                                className="py-4 border-t border-b text-gray-700 flex flex-col
                                md:flex-row md:items-center md:justify-between g4"
                            >
                                <div className="flex items-start gap-6">
                                    <img
                                        src={order.image[0]}
                                        alt=""
                                        className="w-16 sm:w-20"
                                    />
                                    <div>
                                        <p className="sm:text-base font-medium">
                                            {order.name}
                                        </p>

                                        <div className="flex items-center gap-5 mt-2 text-base text-gray-700">
                                            <p>
                                                {currency}
                                                {order.price}
                                            </p>
                                            <p>Quantity: {order.quantity}</p>
                                            <p>Size: {order.size}</p>
                                        </div>
                                        <p className="mt-2">
                                            Date: <span className="">{new Date(order.date).toDateString()}</span>
                                        </p>
                                        <p className='mt-1'>
                                            Payment Method:{' '}
                                            <span className=''>
                                                {order.paymentMethod}
                                            </span>
                                        </p>
                                        <p className='mt-1'>
                                            Payment Status:{' '}
                                            <span className=''>
                                                {order.payment ? 'Done' : 'Pending'}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-between md:w-1/2">
                                    <div className="flex items-center gap-2">
                                        <p className="min-w-2 h-2 rounded-full bg-green-400"></p>
                                        <p className="text-sm md:text-base">{order.orderStatus}</p>
                                    </div>
                                    <button onClick={fetchOrderData} className="cursor-pointer border px-4 py-2 text-sm font-medium rounded-sm">
                                        Track Order
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )}
    </div>
  )
}

export default Orders
