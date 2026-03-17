import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import CheckoutItem from '@/components/CheckoutItem';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart } = useCart();
  useAuth();
  const navigate = useNavigate();

  const handleProceedToDetails = () => {
    navigate('/order-details');
  };

  {
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
        <div>
          {cart.items.map((cart) => (
            <CheckoutItem key={cart.id} item={cart} productid={cart.id} />
          ))}

          {/* Total */}
          <div className="flex justify-end mt-6">
            <p className="text-xl font-semibold">
              Total: <span className="text-green-600">${cart.totalPrice}</span>
            </p>
          </div>

          {/* Proceed to Order Details */}
          <div className="mt-8 flex justify-end gap-4">
            <Link to="/products">
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition">
                Continue Shopping
              </button>
            </Link>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              onClick={handleProceedToDetails}
            >
              Proceed to Details
            </button>
          </div>
        </div>
      );
    }
  }
};

export default Checkout;
