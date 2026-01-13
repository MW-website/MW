import React from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiFacebook, FiMessageCircle } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-12">
      <div className="container py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-medium mb-3">MW</h4>
          <p className="text-sm text-slate-600">Quiet luxury for modern living. Sign up for updates and exclusive offers.</p>
        </div>

        <div>
          <h5 className="font-medium mb-2">Shop</h5>
          <ul className="text-sm text-slate-600 space-y-1">
            <li><Link to="/shop">All Products</Link></li>
            <li><Link to="/shop?category=Dresses">Dresses</Link></li>
            <li><Link to="/shop?category=Accessories">Accessories</Link></li>
            <li><Link to="/shop?category=Essentials">Essentials</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-medium mb-2">Company</h5>
          <ul className="text-sm text-slate-600 space-y-1">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-gray-900 transition" aria-label="Instagram">
              <FiInstagram size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-gray-900 transition" aria-label="Twitter">
              <FiTwitter size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-gray-900 transition" aria-label="Facebook">
              <FiFacebook size={18} />
            </a>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-gray-900 transition" aria-label="WhatsApp">
              <FiMessageCircle size={18} />
            </a>
          </div>
        </div>

        <div>
          <h5 className="font-medium mb-2">Join our list</h5>
          <form className="flex flex-col sm:flex-row gap-3">
            <input aria-label="Email" type="email" placeholder="Email address" className="px-3 py-2 border rounded-md text-sm w-full" />
            <button className="px-4 py-2 bg-black text-white rounded-md text-sm whitespace-nowrap">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="container py-6 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-3">
          <div>© {new Date().getFullYear()} MW. All rights reserved.</div>
          <div className="flex gap-4 flex-wrap justify-center md:justify-end">
            <Link to="/terms" className="text-slate-500 hover:text-gray-900">Terms</Link>
            <Link to="/privacy" className="text-slate-500 hover:text-gray-900">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
