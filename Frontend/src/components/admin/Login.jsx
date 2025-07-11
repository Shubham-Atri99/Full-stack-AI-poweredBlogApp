import React, { useState } from 'react';
import { useAppcontext } from '../../contexts/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate=useNavigate();
  const {axios,settoken}=useAppcontext();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('')

  const handleSubmit = async (e) => {
  e.preventDefault(); 

  try {
    const { data } = await axios.post('/api/admin/login', { email, password });

    if (data.success) {
      settoken(data.token);
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = data.token;

      toast.success("Logged in successfully");
      navigate('/admin'); 
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Login</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={ e=> setemail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
              required

            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
               value={password}
              onChange={ e=> setpassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
              required
            />
          </div>

          <button
           
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-xl font-semibold hover:bg-opacity-90 transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
