import axios from 'axios'
import {backendUrl} from '../App'
import { toast } from 'react-toastify';
import { useState } from 'react';


function Login( {setToken} ) {

  const [email, seteMail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
        e.preventDefault();

        const resp = await axios.post(backendUrl + '/api/user/admin', {email, password});

        if (resp.status === 200) {
            const token = resp.data.data.token;
            setToken(token);
            toast.success('Login Successful!');
        }
        else {
            toast.error(resp.data.message);
        }
    } catch (error) {
        console.log('Err: onSubmitHandler:', error.message);
        toast.error(error.response.data.message);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>

        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>
                    Email Address
                </p>
                <input
                    className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                    type='email'
                    placeholder='Enter your email address'
                    required
                    value={email}
                    onChange={(e) => {seteMail(e.target.value);}}
                />
            </div>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                <input
                    className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                    type='password'
                    placeholder='Enter your password please'
                    required
                    value={password}
                    onChange={(e) => {setPassword(e.target.value);}}
                />
            </div>
            <button
                className='mt-2 w-full py-2 px-4 rounded-md text-white bg-gray-800 cursor-pointer'
                type='submit'
            >Login
            </button>
        </form>
      </div>
    </div>
  )
}

export default Login
