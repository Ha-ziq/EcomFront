import React, { useState } from 'react';

const HeroSection = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery.trim());
  };

  return (
    <section className="w-full bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Discover quality products, curated for you
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-lg text-white/90 mb-6">
            Fast delivery. Secure payments. Excellent customer support. Shop
            with confidence and find the perfect items for your life.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4"
          >
            <div className="w-full sm:w-96 relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products"
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Search products, categories or brands"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    onSearch('');
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                >
                  ×
                </button>
              )}
            </div>

            <button
              type="submit"
              className="flex-shrink-0 bg-white text-sky-600 font-semibold px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Search
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Free shipping</span>
              <span className="opacity-80">on orders over $50</span>
            </div>
            <div className="hidden sm:block border-l border-white/10 h-4" />
            <div className="flex items-center gap-2">
              <span className="font-semibold">30 day returns</span>
              <span className="opacity-80">hassle-free</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
