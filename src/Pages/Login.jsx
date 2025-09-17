import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '.../context/AuthContext';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { setCartCount } = useCart();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (data.user.id) {
        setUser(data.user.name);
        localStorage.setItem('token', data.token);
        navigate('/home');
        setCartCount(data.user.cart.length);
      } else {
        console.log('error');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="h-screen md:flex">
      {/* Left Side */}
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">GoFinance</h1>
          <p className="text-white mt-1">Welcome back! Sign in to continue</p>
          <button
            type="button"
            className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Learn More
          </button>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>

      {/* Right Side / Form */}
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <div className="bg-white w-full max-w-md px-8 py-6 rounded-lg shadow-lg">
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Sign In</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">
            Enter your credentials to access your account
          </p>

          {/* Email / Username */}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
            onClick={handleLogin}
          >
            Login
          </button>

          <p className="text-sm text-center mt-4">
            Don't have an account?{' '}
            <span
              className="text-blue-500 hover:text-blue-700 cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
