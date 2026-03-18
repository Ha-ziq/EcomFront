import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { FiMail, FiArrowRight } from 'react-icons/fi';

const LINKS = {
  Shop: [
    { label: 'All Products', to: '/products' },
    { label: 'New Arrivals', to: '/products' },
    { label: 'Best Sellers', to: '/products' },
  ],
  Account: [
    { label: 'My Orders', to: '/MyOrders' },
    { label: 'Cart', to: '/cart' },
    { label: 'Profile', to: '/profile' },
  ],
};

const SOCIAL = [
  { Icon: FaFacebook, href: '#', label: 'Facebook' },
  { Icon: FaTwitter, href: '#', label: 'Twitter' },
  { Icon: FaInstagram, href: '#', label: 'Instagram' },
  { Icon: FaYoutube, href: '#', label: 'YouTube' },
];

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/home" className="flex items-center gap-2 mb-4 w-fit">
              <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center">
                <HiSparkles className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#FAFAFA]">
                NexShop
              </span>
            </Link>
            <p className="text-sm text-[#A3A3A3] leading-relaxed mb-6">
              Minimalist design. Premium products. Delivered to your door with care.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center text-[#A3A3A3] hover:bg-[#1A1A1A] hover:border-[#FAFAFA] hover:text-[#FAFAFA] transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-sm font-semibold text-[#FAFAFA] mb-5">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-[#A3A3A3] hover:text-[#3B82F6] transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-[#FAFAFA] mb-5">
              Newsletter
            </h4>
            <p className="text-sm text-[#A3A3A3] mb-4 leading-relaxed">
              Get exclusive deals and new arrivals straight to your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <div className="flex-1 flex items-center bg-[#141414] rounded-lg px-3 border border-[#262626] focus-within:border-[#3B82F6] transition-colors">
                <FiMail size={14} className="text-[#737373] flex-shrink-0 mr-2" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-transparent text-sm text-[#FAFAFA] placeholder:text-[#737373] focus:outline-none py-2.5 w-full"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-[#3B82F6] text-white hover:bg-blue-600 transition-colors flex-shrink-0"
                aria-label="Subscribe"
              >
                <FiArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#737373]">
            © {new Date().getFullYear()} NexShop. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-[#737373] hover:text-[#FAFAFA] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
