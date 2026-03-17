import React from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const ProductCard = ({ p }) => {
  const { addToCart } = useCart();
  const { imageUrl, description, name, price, id } = p;
  const { user } = useAuth();

  return (
    <article className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 overflow-hidden flex flex-col">
      <Link to={`/products/${id}`} className="block flex-1">
        <div className="relative w-full h-56 bg-gray-50 flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="object-contain max-h-full p-4"
            />
          ) : (
            <div className="text-gray-300">No image</div>
          )}

          <div className="absolute left-3 top-3 bg-white/80 text-sm text-gray-800 px-2 py-1 rounded-md font-semibold">
            ${price}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {name}
          </h3>
          <p
            className="text-gray-600 mt-2 text-sm overflow-hidden"
            style={{ maxHeight: '4.5rem' }}
          >
            {description}
          </p>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => addToCart(id)}
            className="flex-1 bg-gradient-to-r from-sky-600 to-indigo-600 text-white py-2 rounded-lg font-medium hover:from-sky-700 hover:to-indigo-700 transition"
          >
            Add to cart
          </button>

          {/* admin edit icon visible on hover */}
          {user?.role === 'admin' && (
            <Link
              to={`/products/${id}/edit`}
              className="opacity-0 group-hover:opacity-100 bg-white p-2 rounded-full shadow text-gray-700 hover:text-gray-900 transition"
              title="Edit product"
            >
              <FaEdit />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
