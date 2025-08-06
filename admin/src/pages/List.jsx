import { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import {ClipLoader} from 'react-spinners'

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: { token },
      });

      if (response.status === 200) {
        setList(response.data.products);
      }
      else {
        toast.error(response.data.message);
      }
    }
    catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const removeProduct = async (id) => {
    try {

      setLoadingId(id);

      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        {
          headers: { token },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        fetchList();
      }
      else {
        toast.error(response.data.message);
      }
    }
    catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
    finally {
        setLoadingId(null);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-2'>All Products List</p>

      <div className='flex flex-col gap-2'>
        {/* list table title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center
                    py-1 px-2 border bg-gray-100 text-sm text-gray-500'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Size</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product List  */}
        {list?.map((product, index) => (
          <div
            key={index}
            className='grid grid-cols-[1fr_3fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center
            py-1 px-2 border text-sm text-gray-500'
          >
            <img
              src={product.image[0]}
              alt={product.name}
              className='w-10 h-10 object-cover'
            />
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>{product.sizes.join(', ')}</p>

            <p>
              {currency}
              {product.price}
            </p>
            <button
              disabled={loadingId}
              onClick={() => removeProduct(product._id)}
              className='text-right md:text-center text-lg  cursor-pointer'
            >
              {loadingId === product._id ? <ClipLoader size={20} color="#000000" /> : <p className='text-red-700'>X</p>}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
