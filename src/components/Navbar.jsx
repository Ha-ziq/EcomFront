import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
    setOpen(false);
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-[#0A0A0A] ${
        scrolled ? 'border-b border-[#262626] shadow-md shadow-black/50' : 'border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center">
            <HiSparkles className="text-white text-sm" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#FAFAFA]">
            NexShop
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 text-sm font-medium">
          {[
            { to: '/home', label: 'Home' },
            { to: '/products', label: 'Products' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="px-4 py-2 rounded-lg text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-[#141414] transition-all"
            >
              {label}
            </Link>
          ))}

          {/* Admin Dropdown */}
          {user?.role === 'admin' && (
            <div className="relative">
              <button
                onClick={() => setAdminOpen((s) => !s)}
                className="px-4 py-2 rounded-lg text-[#3B82F6] hover:bg-blue-500/10 transition-all font-semibold"
              >
                Admin ▾
              </button>
              {adminOpen && (
                <div className="absolute mt-2 w-48 bg-[#141414] rounded-xl shadow-2xl py-2 z-40 border border-[#262626]">
                  <Link
                    to="/add-product"
                    className="block px-4 py-2 text-sm text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-[#1A1A1A] transition-colors"
                    onClick={() => setAdminOpen(false)}
                  >
                    + Add Product
                  </Link>
                  <Link
                    to="/products"
                    className="block px-4 py-2 text-sm text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-[#1A1A1A] transition-colors"
                    onClick={() => setAdminOpen(false)}
                  >
                    Manage Products
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Cart + User */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 rounded-lg text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-[#141414] transition-all"
            aria-label="Shopping cart"
          >
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#3B82F6] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-[#0A0A0A]">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#262626] hover:bg-[#141414] transition-all text-sm"
              >
                <FaUserCircle size={20} className="text-[#737373]" />
                <span className="hidden sm:inline text-[#FAFAFA] font-medium max-w-[80px] truncate">
                  {user?.name || 'Me'}
                </span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-[#141414] rounded-xl shadow-2xl py-2 z-50 border border-[#262626]">
                  <p className="px-4 py-2 text-xs text-[#737373] uppercase tracking-wider font-semibold">
                    Account
                  </p>
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-[#1A1A1A] transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/MyOrders"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-[#1A1A1A] transition-colors"
                  >
                    My Orders
                  </Link>
                  <div className="border-t border-[#262626] mt-1 pt-1">
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-[#EF4444] hover:bg-red-500/10 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/"
                className="px-4 py-2 rounded-lg text-sm text-[#A3A3A3] hover:text-[#FAFAFA] font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 rounded-lg text-sm text-white font-medium bg-[#3B82F6] hover:bg-blue-600 transition-colors"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-[#A3A3A3] hover:bg-[#141414] transition-colors"
            onClick={() => setMobileOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-b border-[#262626] px-4 py-4 flex flex-col gap-1 shadow-md absolute w-full left-0 top-16">
          <Link to="/home" className="px-3 py-3 text-sm font-medium text-[#A3A3A3] active:bg-[#141414] rounded-lg" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/products" className="px-3 py-3 text-sm font-medium text-[#A3A3A3] active:bg-[#141414] rounded-lg" onClick={() => setMobileOpen(false)}>Products</Link>
          {!user && (
            <div className="mt-2 pt-2 border-t border-[#262626] flex flex-col gap-2">
              <Link to="/" className="px-3 py-3 text-sm font-medium text-[#FAFAFA] text-center border border-[#262626] rounded-lg" onClick={() => setMobileOpen(false)}>Login</Link>
              <Link to="/register" className="px-3 py-3 text-sm font-medium text-white bg-[#3B82F6] rounded-lg text-center" onClick={() => setMobileOpen(false)}>Register</Link>
            </div>
          )}
          {user && (
            <div className="mt-2 pt-2 border-t border-[#262626] flex flex-col">
              <Link to="/MyOrders" className="px-3 py-3 text-sm text-[#A3A3A3] active:bg-[#141414] rounded-lg" onClick={() => setMobileOpen(false)}>My Orders</Link>
              <button onClick={logout} className="px-3 py-3 text-sm text-[#EF4444] text-left active:bg-red-500/10 rounded-lg">Logout</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
