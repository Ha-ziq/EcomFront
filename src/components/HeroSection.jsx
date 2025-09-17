import React from "react";

const HeroSection = () => {
  return (
    <div className="w-full h-96 bg-gradient-to-r from-blue-600 to-purple-600 flex flex-col items-center justify-center text-center text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Shop the Best Deals
      </h1>
      <p className="text-lg md:text-2xl mb-6">
        Find top-quality products at unbeatable prices
      </p>
      <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition">
        Shop Now
      </button>
    </div>
  );
};

export default HeroSection;
