import { Plus, Minus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '@/context/CartContext';

const CartItem = ({ product, productid }) => {
  const { fetchCart } = useCart();
  const token = localStorage.getItem('token');

  const handleRemove = async (id) => {
    try {
      const response = await fetch('http://localhost:3000/api/cart', {
        method: 'delete',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: id,
        }),
      });

      if (response.ok) {
        toast.success('product Removed');
        fetchCart();
      }
    } catch (err) {
      console.log({ error: err.message });
    }
  };

  const handleIncrement = async (id,action) => {
    try {
      console.log("increment")
      const response = await fetch('http://localhost:3000/api/cart', {
        method: 'put',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: id,
          action: action,
        }),
      });

      if (response.ok) {
        toast.success('Quantity Updated');
        fetchCart();
      }
    } catch (err) {
      console.log({ error: err.message });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 p-4 border rounded-xl shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200">
      {/* Image */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-24 h-24 object-contain rounded md:w-20 md:h-20"
      />

      {/* Info */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="font-semibold text-lg">{product.name}</h2>
        <p className="text-gray-600">${product.price}</p>
      </div>

      {/* Quantity + Remove */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Quantity */}
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
          onClick={() => handleIncrement(productid,"decrement")}>
            <Minus size={18} />
          </button>

          <span className="px-2 font-medium text-lg">{product.quantity}</span>

          <button
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
            onClick={() => handleIncrement(productid,"increment")}
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Remove */}
        <button
          className="mt-2 sm:mt-0 flex items-center gap-1 px-3 py-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 font-medium transition"
          onClick={() => handleRemove(productid)}
        >
          <Trash2 size={18} />
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
