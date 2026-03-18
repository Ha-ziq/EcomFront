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
        toast.success('Product Removed');
        fetchCart();
      }
    } catch (err) {
      console.log({ error: err.message });
    }
  };

  const handleIncrement = async (id, action) => {
    try {
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
    <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 p-4 sm:p-5 bg-[#141414] border border-[#262626] rounded-xl card-hover transition-all duration-200">
      {/* Image container - white to show off JPEG products cleanly */}
      <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center p-2 flex-shrink-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply"
        />
      </div>

      {/* Info */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="font-semibold text-lg text-[#FAFAFA] mb-1">{product.name}</h2>
        <p className="text-[#A3A3A3] font-medium">${product.price}</p>
      </div>

      {/* Quantity + Remove */}
      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
        {/* Quantity Controls */}
        <div className="flex items-center bg-[#0A0A0A] border border-[#262626] rounded-lg p-1">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#1A1A1A] text-[#A3A3A3] hover:text-[#FAFAFA] transition-colors"
            onClick={() => handleIncrement(productid, "decrement")}
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>

          <span className="w-10 text-center font-medium text-[#FAFAFA] text-sm">
            {product.quantity}
          </span>

          <button
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#1A1A1A] text-[#A3A3A3] hover:text-[#FAFAFA] transition-colors"
            onClick={() => handleIncrement(productid, "increment")}
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Remove */}
        <button
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-[#EF4444] hover:bg-red-500/10 transition-colors font-medium border border-transparent hover:border-red-500/20"
          onClick={() => handleRemove(productid)}
        >
          <Trash2 size={16} />
          <span className="hidden sm:inline">Remove</span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
