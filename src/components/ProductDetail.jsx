import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { FiShoppingCart, FiArrowLeft, FiCheck } from "react-icons/fi";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [adding, setAdding] = useState(false);
  const { id } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchProductDetail();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    setAdding(true);
    addToCart(product._id || id);
    setTimeout(() => setAdding(false), 800);
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-[#A3A3A3] text-sm font-medium pt-16">
        <span className="w-5 h-5 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin mr-3" />
        Loading product...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-[#A3A3A3] hover:text-[#FAFAFA] transition-colors mb-8 group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: Product Image */}
          <div className="bg-[#141414] rounded-2xl border border-[#262626] p-8 flex items-center justify-center card-hover overflow-hidden h-[400px] md:h-[500px]">
            {product.imageUrl ? (
              <div className="w-full h-full bg-white rounded-xl flex items-center justify-center p-8">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-[#737373]">
                <FiShoppingCart size={48} opacity={0.5} />
                <span className="text-sm">No image available</span>
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#141414] text-[#22C55E] border border-[#262626]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                In Stock
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-semibold text-[#FAFAFA] mb-4 leading-tight tracking-tight">
              {product.name}
            </h1>

            <p className="text-xl sm:text-2xl font-semibold text-[#FAFAFA] mb-8">
              ${product.price}
            </p>

            <div className="h-px bg-[#262626] w-full mb-8" />

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-[#737373] uppercase tracking-wider mb-3">
                Description
              </h3>
              <p className="text-[#A3A3A3] leading-relaxed text-sm sm:text-base">
                {product.description || "No description provided for this premium item. Enjoy the minimalist aesthetic and robust build quality intrinsic to our curated selection."}
              </p>
            </div>

            <div className="h-px bg-[#262626] w-full mb-8" />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  adding
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : "bg-[#3B82F6] text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20"
                }`}
              >
                {adding ? (
                  <>
                    <FiCheck size={18} /> Added to Cart!
                  </>
                ) : (
                  <>
                    <FiShoppingCart size={18} /> Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Guarantees */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {['Free Delivery', '30-Day Returns'].map((text) => (
                <div key={text} className="flex items-center gap-2 text-sm text-[#A3A3A3]">
                  <FiCheck className="text-[#3B82F6]" size={16} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
