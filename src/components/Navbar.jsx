import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const { user, setUser } = useAuth();
  console.log({user:user})
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {cartCount}=useCart();
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
      {/* Left: Logo */}
      <Link to="/home" className="text-2xl font-extrabold tracking-wide text-blue-400">
        MyShop
      </Link>

      {/* Center: Nav Links */}
      <div className="hidden md:flex gap-8 text-lg font-medium">
        <Link to="/home" className="hover:text-blue-400 transition">Home</Link>
        <Link to="/products" className="hover:text-blue-400 transition">Products</Link>
        <Link to="/about" className="hover:text-blue-400 transition">About</Link>
        <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
      </div>

      {/* Right: Cart & User */}
      <div className="flex items-center gap-6 relative">
        {/* Cart */}
        <Link to="/cart" className="relative hover:text-blue-400 transition">
          <FaShoppingCart size={22} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-0.5 rounded-full">
           {cartCount}
          </span>
        </Link>

        {/* User Dropdown */}
        {user ? (
          <div className="relative">
            <button onClick={() => setOpen(!open)} className="focus:outline-none">
              <FaUserCircle size={26} className="hover:text-blue-400 transition" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg py-2 z-50">
                <p className="px-4 py-2 text-sm">Hello, {user}</p>
                <hr />
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Profile
                </Link>
                <Link
                  to="/MyOrders"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Orders
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/"
              className="hover:text-blue-400 border px-3 py-1 rounded transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
