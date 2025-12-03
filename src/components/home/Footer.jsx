import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-12">
      <div className="container py-12 grid md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-medium mb-3">MW</h4>
          <p className="text-sm text-slate-600">Quiet luxury for modern women. Sign up for updates and exclusive offers.</p>
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
        </div>

        <div>
          <h5 className="font-medium mb-2">Join our list</h5>
          <form className="flex flex-col sm:flex-row gap-3">
            <input aria-label="Email" type="email" placeholder="Email address" className="px-3 py-2 border rounded-md text-sm w-full" />
            <button className="px-4 py-2 bg-black text-white rounded-md text-sm">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="container py-6 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
          <div>© {new Date().getFullYear()} MW. All rights reserved.</div>
          <div className="flex gap-4 mt-3 md:mt-0">
            <Link to="/terms" className="text-slate-500">Terms</Link>
            <Link to="/privacy" className="text-slate-500">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
