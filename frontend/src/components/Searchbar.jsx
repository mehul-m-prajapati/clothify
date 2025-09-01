import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {assets} from '../assets/assets'

function Searchbar() {

  // Extract context values related to search and visibility from ShopContext
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);



  return showSearch ? (
    <div className='border-t border-b text-center '>
        <div className='w-3/4 sm:w-1/2 inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full'>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className=" flex-1 outline-none bg-inherit text-sm "
            ></input>
            <img src={assets.search_icon} alt="" className="w-4" />
        </div>
        <img
            src={assets.cross_icon}
            alt=""
            className="w-3 inline cursor-pointer"
            onClick={() => setShowSearch(false)}
        />
    </div>
  ) : null
}

export default Searchbar
