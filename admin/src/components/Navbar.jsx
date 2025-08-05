import { assets } from '../assets/assets.js';

function Navbar({setToken}) {
  return (
    <div className='flex justify-between items-center py-2 px-[4%] bg-gray-200'>
      <img className='w-[max(7%,40px)]' src={assets.logo} alt='' />
      <button
        onClick={() => {
          setToken('');
        }}
        className='bg-red-800 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer'
      >
        logout
      </button>
    </div>
  )
}

export default Navbar
