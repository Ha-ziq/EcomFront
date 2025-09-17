import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold mb-2">MyShop</h2>
          <p className="text-gray-400">Your one-stop shop for quality products.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul>
            <li className="hover:text-blue-400 cursor-pointer">Home</li>
            <li className="hover:text-blue-400 cursor-pointer">Products</li>
            <li className="hover:text-blue-400 cursor-pointer">Cart</li>
            <li className="hover:text-blue-400 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-xl justify-center">
            <FaFacebook className="hover:text-blue-600 cursor-pointer size-10" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer size-10" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer size-10" />
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-6">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
