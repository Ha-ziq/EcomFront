import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setProduct(data);

        if (!data) {
          console.log("no product found");
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchProductDetail();
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-lg font-medium">
        Loading product...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* Left: Product Image */}
      <div className="flex justify-center items-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full max-h-[450px] rounded-2xl shadow-xl object-contain border transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        />
      </div>

      {/* Right: Product Info */}
      <div className="flex flex-col justify-center space-y-6 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center md:gap-3">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            {product.name}
          </h1>
          <span className="mt-2 md:mt-0 text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full self-start md:self-auto">
            In Stock
          </span>
        </div>

        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          {product.description}
        </p>

        <p className="text-2xl md:text-3xl font-semibold text-green-600">
          ${product.price}
        </p>

        <hr className="my-4 border-black border-2" />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            Add to Cart
          </button>
          <button className="flex-1 bg-gray-100 text-gray-800 px-6 py-3 rounded-xl shadow-md hover:bg-gray-200 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
