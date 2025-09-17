// import React from "react";

import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ p }) => {
  const { addToCart } = useCart();
  const { imageUrl, description, name, price, id } = p;

  return (
    <>
      <div className="border rounded-lg shadow p-4 hover:shadow-lg transition mt-3">
        <Link to={`/products/${id}`}>
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-48 object-contain rounded"
          />
          <h3 className="mt-2 font-semibold text-lg">{name}</h3>
          <p className="text-gray-600 mt-1">{description}</p>
          <p className="text-gray-600 mt-1">{price}</p>
        </Link>
        <button
          className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          onClick={() => {
            addToCart(id);
          }}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default ProductCard;
