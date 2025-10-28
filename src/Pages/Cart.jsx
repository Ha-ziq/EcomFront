import CartItem from '../components/CartItem';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
const Cart = () => {
  const { fetchCart, cart, loading } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    fetchCart();
  }, []);

  const renderCart = () => {
    if (user) {
      console.log(loading)
      if (loading) {
        return (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        );
      } else {
        if (!cart?.items || cart.items.length === 0) {
          return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 bg-gray-50 rounded-lg shadow-md p-8">
              <p className="text-lg font-medium text-gray-700">
                Your cart is currently{' '}
                <span className="font-bold text-gray-900">empty</span>.
              </p>
              <Link to="/products">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition transform hover:-translate-y-1">
                  Browse Products
                </button>
              </Link>
            </div>
          );
        } else {
          return (
            <div className="grid gap-6">
              {/* Cart Items */}
              {cart.items.map((cart) => (
                <CartItem key={cart.id} product={cart} productid={cart.id} />
              ))}

              {/* Total */}
              <div className="flex justify-end mt-6">
                <p className="text-xl font-semibold">
                  Total:{' '}
                  <span className="text-green-600">${cart.totalPrice}</span>
                </p>
              </div>

              {/* Checkout button */}

              <div className="flex justify-end">
          <Link to="/Checkout">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
                  Proceed to Checkout
                </button>
                </Link>
              </div>
            </div>
          );
        }
      }
    } else {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 bg-gray-50 rounded-lg shadow-md p-8">
          <p className="text-lg font-medium text-gray-700">
            You have to <span className="font-bold text-gray-900">Login</span>{' '}
            to view your Cart
          </p>
          <Link to="/">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition transform hover:-translate-y-1">
              Login
            </button>
          </Link>
        </div>
      );
    }
  };

  return <div>{renderCart()}</div>;
};

export default Cart;
