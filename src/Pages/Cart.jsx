import CartItem from '../components/CartItem';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { FiShoppingCart, FiArrowRight } from 'react-icons/fi';

const Cart = () => {
  const { fetchCart, cart, loading } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCart = () => {
    if (!user) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 bg-[#141414] border border-[#262626] rounded-2xl p-10 max-w-lg mx-auto mt-10">
          <div className="w-16 h-16 rounded-full bg-[#0A0A0A] border border-[#262626] flex items-center justify-center text-[#737373]">
            <FiShoppingCart size={24} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-[#FAFAFA]">Sign in required</h2>
            <p className="text-sm text-[#A3A3A3]">
              You need to login to view and manage your cart.
            </p>
          </div>
          <Link
            to="/"
            className="w-full flex justify-center items-center gap-2 bg-[#3B82F6] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
          >
            Login to your account
          </Link>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="flex justify-center items-center h-64 text-[#A3A3A3] text-sm font-medium">
          <span className="w-6 h-6 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin mr-3" />
          Loading cart...
        </div>
      );
    }

    if (!cart?.items || cart.items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 bg-[#141414] border border-[#262626] rounded-2xl p-10 mt-10 max-w-2xl mx-auto shadow-lg">
          <div className="w-20 h-20 rounded-full bg-[#0A0A0A] border border-[#262626] flex items-center justify-center text-[#737373] mb-2">
            <FiShoppingCart size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-[#FAFAFA]">Your cart is empty</h2>
            <p className="text-sm text-[#A3A3A3] max-w-sm mx-auto">
              Looks like you haven't added anything to your cart yet. Discover our premium minimal collection.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-[#3B82F6] text-white px-8 py-3.5 mt-2 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
          >
            Browse Products
            <FiArrowRight size={16} />
          </Link>
        </div>
      );
    }

    return (
      <div className="grid lg:grid-cols-12 gap-8 items-start mt-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-[#FAFAFA] mb-2">Shopping Cart ({cart.items.length})</h1>
          {cart.items.map((item) => (
            <CartItem key={item.id} product={item} productid={item.id} />
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-[#141414] border border-[#262626] rounded-2xl p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6 text-sm">
            <div className="flex justify-between text-[#A3A3A3]">
              <span>Subtotal</span>
              <span className="text-[#FAFAFA] font-medium">${cart.totalPrice}</span>
            </div>
            <div className="flex justify-between text-[#A3A3A3]">
              <span>Shipping</span>
              <span className="text-[#22C55E] font-medium">Free</span>
            </div>
            <div className="flex justify-between text-[#A3A3A3]">
              <span>Tax</span>
              <span className="text-[#FAFAFA] font-medium">Calculated at checkout</span>
            </div>
          </div>

          <div className="h-px bg-[#262626] w-full mb-6" />

          <div className="flex justify-between items-center mb-8">
            <span className="text-[#FAFAFA] font-medium">Total</span>
            <span className="text-2xl font-semibold text-[#3B82F6]">${cart.totalPrice}</span>
          </div>

          <Link
            to="/order-details"
            className="w-full flex justify-center items-center gap-2 bg-[#3B82F6] text-white px-6 py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
          >
            Proceed to Checkout
            <FiArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {renderCart()}
      </div>
    </div>
  );
};

export default Cart;
