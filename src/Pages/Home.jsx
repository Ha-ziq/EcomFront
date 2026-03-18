import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import ProductList from '@/components/ProductList';
import { Link } from 'react-router-dom';
import { FiTruck, FiShield, FiRefreshCw, FiHeadphones, FiSearch, FiX } from 'react-icons/fi';

const PERKS = [
  { Icon: FiTruck, title: 'Free Shipping', desc: 'On orders over $50' },
  { Icon: FiShield, title: 'Secure Payments', desc: '256-bit SSL encryption' },
  { Icon: FiRefreshCw, title: '30-Day Returns', desc: 'Hassle-free refunds' },
  { Icon: FiHeadphones, title: '24/7 Support', desc: 'Always here to help' },
];

const CATEGORIES = [
  'Electronics',
  'Apparel',
  'Jewelry',
  'Bags',
  'Home Goods',
  'Home Office',
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [focused, setFocused] = useState(false);

  const clearSearch = () => setSearchQuery('');

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-16">
      {/* ── Minimal Hero ── */}
      <HeroSection />

      {/* ── Perks bar ── */}
      <div className="bg-[#141414] border-b border-[#262626] py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {PERKS.map(({ Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 text-[#3B82F6] flex items-center justify-center">
                <Icon size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#FAFAFA]">{title}</p>
                <p className="text-xs text-[#A3A3A3] mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0A0A0A] border-b border-[#262626] pb-10 pt-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          {/* ── Category chips and Search area ── */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 mt-6">
            {/* Categories */}
            <div>
              <p className="text-xs font-semibold text-[#737373] uppercase tracking-widest mb-3">
                Browse by Category
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((label) => (
                  <button
                    key={label}
                    onClick={() => setActiveCategory(activeCategory === label ? null : label)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                      activeCategory === label
                        ? 'bg-[#3B82F6] text-white border-[#3B82F6]'
                        : 'bg-[#141414] text-[#A3A3A3] border-[#262626] hover:border-[#FAFAFA] hover:text-[#FAFAFA]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="w-full lg:w-96">
              <p className="text-xs font-semibold text-[#737373] uppercase tracking-widest mb-3">
                Search Products
              </p>
              <div
                className={`flex items-center gap-3 bg-[#141414] rounded-lg px-4 py-2.5 transition-colors border ${
                  focused ? 'border-[#3B82F6]' : 'border-[#262626]'
                }`}
              >
                <FiSearch size={16} className={focused ? 'text-[#3B82F6]' : 'text-[#737373]'} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Search..."
                  className="flex-1 bg-transparent text-sm text-[#FAFAFA] placeholder:text-[#737373] focus:outline-none"
                  aria-label="Search products"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="text-[#737373] hover:text-[#FAFAFA] transition-colors"
                    aria-label="Clear search"
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <div className="bg-[#0A0A0A]">
        {/* ── Products section ── */}
        <ProductList searchQuery={searchQuery} activeCategory={activeCategory} />
      </div>

      {/* ── Promo Banner ── */}
      <div className="bg-[#0A0A0A] px-4 sm:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#141414] rounded-xl overflow-hidden p-10 md:p-16 text-center border border-[#262626] card-shadow">
            <p className="text-xs text-[#3B82F6] font-bold uppercase tracking-widest mb-4">
              Limited Time Offer
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#FAFAFA] mb-4 leading-tight">
              Up to <span className="text-[#3B82F6]">50% OFF</span>
              <br />
              on Select Items
            </h2>
            <p className="text-[#A3A3A3] text-sm mb-8 max-w-sm mx-auto">
              Shop now before stocks run out. Enhance your minimalist setup today.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#3B82F6] text-white font-semibold text-sm hover:bg-blue-600 transition-colors"
            >
              Shop the Sale
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
