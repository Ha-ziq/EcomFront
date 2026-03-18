import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';

const ProductCard = ({ p }) => {
  const { addToCart } = useCart();
  const { imageUrl, description, name, price, id } = p;
  const { user } = useAuth();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault(); // Prevent navigating to product detail when clicking add to cart
    setAdding(true);
    addToCart(id);
    setTimeout(() => setAdding(false), 800);
  };

  return (
    <article className="group relative bg-[#141414] rounded-xl overflow-hidden flex flex-col card-hover border border-[#262626]">
      {/* Image area */}
      <Link to={`/products/${id}`} className="block relative bg-[#0A0A0A] border-b border-[#262626] p-4">
        <div className="relative w-full h-48 overflow-hidden flex items-center justify-center bg-white rounded-lg">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="object-contain max-h-full transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-[#919191]">
              <FiShoppingCart size={32} opacity={0.5} />
              <span className="text-xs">No image</span>
            </div>
          )}

          {/* Price badge */}
          <div className="absolute top-3 right-3 bg-[#0A0A0A] shadow-lg rounded-lg px-2.5 py-1 text-sm font-bold text-[#FAFAFA] border border-[#262626]">
            ${price}
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 bg-[#141414]">
        <Link to={`/products/${id}`} className="block flex-1 mb-3">
          <h3 className="text-base font-semibold text-[#FAFAFA] line-clamp-1 mb-1">
            {name}
          </h3>
          <p className="text-sm text-[#A3A3A3] line-clamp-2 leading-relaxed">
            {description}
          </p>
        </Link>

        {/* Bottom row */}
        <div className="flex items-center gap-2 mt-auto">
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              adding
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-[#3B82F6] hover:bg-blue-600 text-white'
            }`}
          >
            <FiShoppingCart size={16} />
            {adding ? 'Added!' : 'Add to Cart'}
          </button>

          {user?.role === 'admin' && (
            <Link
              to={`/products/${id}/edit`}
              className="p-2.5 rounded-lg border border-[#262626] text-[#A3A3A3] hover:bg-[#1A1A1A] hover:border-[#FAFAFA] transition-colors"
              title="Edit product"
            >
              <FaEdit size={16} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
