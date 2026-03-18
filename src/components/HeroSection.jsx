import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 bg-[#0A0A0A] border-b border-[#262626]">
      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Subtle badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#262626] text-[#A3A3A3] bg-[#141414] text-xs font-semibold mb-6 tracking-wide">
          <HiSparkles size={12} className="text-[#3B82F6]" />
          Curated for you, every day
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#FAFAFA] leading-tight tracking-tight mb-6">
          Discover Premium <br className="hidden sm:block" />
          <span className="text-[#3B82F6]">Everyday Finds</span>
        </h1>

        <p className="text-base text-[#A3A3A3] max-w-md mx-auto mb-10 leading-relaxed font-medium">
          Thousands of products. Fast shipping. Secure checkout. The ultimate minimalist shopping experience.
        </p>

        {/* Action */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#3B82F6] hover:bg-blue-600 transition-colors"
        >
          Browse all products
          <FiArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
