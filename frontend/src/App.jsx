import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from "./pages/Home"
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Verify from './pages/Verify';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer';
import SearchBar from './components/Searchbar.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]
    bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-300'>
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <ScrollToTop />

        <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/verify" element={<Verify />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App
