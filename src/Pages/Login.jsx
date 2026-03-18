import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { useCart } from '@/context/CartContext';
import { HiSparkles } from 'react-icons/hi2';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { setCartCount } = useCart();

  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.user?.id && data.token) {
        try {
          const decoded = jwtDecode(data.token);
          setUser(decoded);
        } catch (err) {
          console.error('Token decode failed', err);
          setUser(data.user.name);
        }
        localStorage.setItem('token', data.token);
        setCartCount(data.user.cart.length);
        navigate('/home');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center">
            <HiSparkles className="text-white text-sm" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#FAFAFA]">
            NexShop
          </span>
        </div>

        {/* Form card */}
        <div className="bg-[#141414] rounded-xl p-8 border border-[#262626] card-shadow">
          <h1 className="text-2xl font-semibold text-[#FAFAFA] mb-2 text-center">
            Welcome back
          </h1>
          <p className="text-sm text-[#A3A3A3] mb-8 text-center">
            Sign in to your account to continue shopping.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373]" size={16} />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#262626] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#FAFAFA] placeholder:text-[#737373] focus:outline-none focus:border-[#3B82F6] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373]" size={16} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full bg-[#0A0A0A] border border-[#262626] rounded-lg pl-10 pr-10 py-2.5 text-sm text-[#FAFAFA] placeholder:text-[#737373] focus:outline-none focus:border-[#3B82F6] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#FAFAFA] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-lg bg-[#3B82F6] text-white font-semibold text-sm hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <FiArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="text-sm text-center text-[#A3A3A3] mt-6">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-[#3B82F6] hover:text-blue-400 font-medium transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
