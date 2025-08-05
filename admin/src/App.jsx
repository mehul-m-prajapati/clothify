import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './components/Login'

import { ToastContainer } from 'react-toastify';
import {Route, Routes} from 'react-router-dom'

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$';

function App() {

  return (
    <div className='bg-gray-50 min-h-screen'>
        <ToastContainer />

        <>
            <Navbar />
            <hr />
            <div className='flex w-full'>
                <Sidebar />
                <div className='w-[70%] mx-auto ml-[max(5vw, 25px)] my-8  text-gray-600 text-base'>
                    <Routes>
                        <Route path='/add' />
                        <Route path='/list' />
                        <Route path='/orders' />
                    </Routes>
                </div>
            </div>
        </>
    </div>
  )
}

export default App
