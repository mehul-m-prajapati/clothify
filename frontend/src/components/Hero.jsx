import React from 'react'
import { assets } from '../assets/assets'

function Hero() {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* Hero Left Side */}
        <div className="w-full sm:w-[60%] flex items-center justify-center py-10 sm:py-0">
            <div className="">
                <div className="flex items-center gap-2 ">
                    <p className="w-8 md:w-11 h-[2px] bg-[#414141] dark:bg-white"></p>
                    <p className="font-medium text-sm md:text-base ">OUR BESTSELLERS</p>
                </div>

                <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed ">
                    {' '}
                    Latest Arrivals
                </h1>

                <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm md:text-base ">SHOP NOW</p>
                    <p className="w-8 md:w-11 h-[1px] bg-[#414141] dark:bg-gray-100"></p>
                </div>
            </div>
        </div>

        {/* Hero Right Side */}
        <img src={assets.woman} alt="" className="w-full sm:w-[40%]" />
    </div>
  )
}

export default Hero
