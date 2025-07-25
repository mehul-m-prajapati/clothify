import { useContext } from 'react'
import {assets} from "../assets/assets"
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext'

function Navbar() {

  const [visible, setVisible] = useState(false);
  const {setShowSearch} = useContext(ShopContext);

  return (
    <div className='flex items-center justify-between py-5 font-medium'>

        {/* My site logo - extreme top left */}
        <Link to='/' >
            <img src={assets.logo_new} alt='test' className='w-20' />
        </Link>

        {/* Navbar menu for >= 640px screens - middle */}
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
            <NavLink to="/" className="flex flex-col items-center gap-1">
                <p>HOME</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>

            <NavLink to="/collection" className="flex flex-col items-center gap-1">
                <p>COLLECTION</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>

            <NavLink to="/about" className="flex flex-col items-center gap-1">
                <p>ABOUT</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>

            <NavLink to="/contact" className="flex flex-col items-center gap-1">
                <p>CONTACT</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
        </ul>

        {/* Right menu icons i.e. profile, search, cart */}
        <div className="flex items-center gap-6">

            {/* search icon */}
            <img onClick={() => {setShowSearch(true);}} src={assets.search_icon} alt="" className="w-5 cursor-pointer "/>

            {/* <Link to="/login">Login</Link> */}
            {/* profile icon */}
            <div className="group relative">

                <img src={assets.profile_icon}  alt="" className="w-5 cursor-pointer"/>
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <p className='cursor-pointer hover:text-black'>Orders</p>
                        <p className='cursor-pointer hover:text-black'>Logout</p>
                    </div>
                </div>
            </div>

            {/* cart icon */}
            <Link to="/cart" className="relative ">
                <img src={assets.cart_icon} alt="" className="w-5 min-w-5 " />
                <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                    10{/*getCartCount()*/}
                </p>
            </Link>

            {/* side menu icon for mobile screens */}
            <img
                src={assets.menu_icon}
                alt=""
                onClick={() => setVisible(true)}
                className="w-5 cursor-pointer sm:hidden"
            />
        </div>

        {/* Sidebar menu for small screens */}
        <div
            className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white ease-in duration-300
                ${visible ? 'w-full' : 'w-0'}`}>

            <div className="flex flex-col text-gray-600 ">
                <div onClick={() => {setVisible(false);}} className="flex items-center gap-4 p-3 cursor-pointer">
                    <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
                    <p className="font-semibold">Back</p>
                </div>
                <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">HOME</NavLink>
                <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection">COLLECTION</NavLink>
                <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">ABOUT</NavLink>
                <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">CONTACT</NavLink>
            </div>
        </div>
    </div>
  )
}

export default Navbar
