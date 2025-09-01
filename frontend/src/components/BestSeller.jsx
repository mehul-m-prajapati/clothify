import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import Title from './Title';

function BestSeller() {

  const {products} = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestSellerProducts = products?.filter(p => p.bestseller == true);
    setBestSeller(bestSellerProducts.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">

      <div className="text-center text-3xl py-8">
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base">
            Our best-selling products that our customers can not get enough of.
            Shop the most popular items from our store.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
            bestSeller.map((product, idx) => (
                <ProductItem key={idx} id={product._id} name={product.name} image={product.image} price={product.price} />
            ))
        }
      </div>
    </div>
  )
}

export default BestSeller
