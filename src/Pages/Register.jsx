import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HiSparkles } from 'react-icons/hi2';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheck } from 'react-icons/fi';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e?.preventDefault();
    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await response.json();
      if (data.user?._id) {
        navigate('/');
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength =
    password.length === 0 ? null
    : password.length < 6 ? 'weak'
    : password.length < 10 ? 'medium'
    : 'strong';

  const strengthConfig = {
    weak:   { color: 'bg-red-500',    label: 'Weak',   width: 'w-1/3' },
    medium: { color: 'bg-amber-500',  label: 'Medium', width: 'w-2/3' },
    strong: { color: 'bg-emerald-500',label: 'Strong', width: 'w-full' },
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
            Create account
          </h1>
          <p className="text-sm text-[#A3A3A3] mb-8 text-center">
            Join thousands of shoppers on NexShop.
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider mb-2" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373]" size={16} />
                <input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#262626] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#FAFAFA] placeholder:text-[#737373] focus:outline-none focus:border-[#3B82F6] transition-colors"
                />
              </div>
            </div>

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
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

              {/* Password strength bar */}
              {passwordStrength && (
                <div className="mt-2.5">
                  <div className="h-1.5 w-full bg-[#262626] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strengthConfig[passwordStrength].color} ${strengthConfig[passwordStrength].width}`}
                    />
                  </div>
                  <p className={`text-xs mt-1.5 font-medium ${
                    passwordStrength === 'weak' ? 'text-red-500'
                    : passwordStrength === 'medium' ? 'text-amber-500'
                    : 'text-emerald-500'
                  }`}>
                    {strengthConfig[passwordStrength].label} password
                  </p>
                </div>
              )}
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
                  Create Account
                  <FiArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Benefits */}
          <div className="mt-6 pt-6 border-t border-[#262626] flex flex-col gap-2">
            {['Free to join, no hidden fees', 'Exclusive member deals', 'Fast & secure checkout'].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-[#A3A3A3]">
                <FiCheck size={14} className="text-[#3B82F6] flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>

          <p className="text-sm text-center text-[#A3A3A3] mt-6">
            Already have an account?{' '}
            <Link
              to="/"
              className="text-[#3B82F6] hover:text-blue-400 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
