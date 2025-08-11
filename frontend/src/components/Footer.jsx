import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="f">

      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">

        <div className="">
          <img src={assets.logo_footer} alt="" className="mb-5 w-32 " />
          <p className="w-full sm:w-2/3 text-gray-600">
            Shop with Forever and experience the convenience of online shopping
            like never before.
          </p>
        </div>

        <div className="">
          <p className="text-xl font-medium mb-5">COMPANY</p>

          <ul className="flex flex-col flex-1 text-gray-600 cursor-pointer">
            <Link className="mb-2" onClick={scrollToTop} to='/'>Home</Link>
            <Link className="mb-2" onClick={scrollToTop} to='/about'>About Us</Link>
            <li onClick={scrollToTop} className="mb-2">
              Delivery
            </li>
            <li onClick={scrollToTop} className="mb-2">
              Privacy policy
            </li>
          </ul>
        </div>

        <div className="">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col flex-1 text-gray-600">
            <li className="mb-2">+91 9458 789 xxx</li>
            <li className="mb-2">contact@clothify.com </li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ clothify - All Rights Reserved
        </p>
      </div>

    </div>
  );
};

export default Footer;
