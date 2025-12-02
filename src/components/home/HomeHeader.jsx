/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 15:55:58
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
// src/components/home/HomeHeader.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

export default function HomeHeader() {
  const { wish } = useWishlist();
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-sm border-b">
      <div className="container flex items-center justify-between py-3">

        {/* LEFT SMALL SOCIAL ICONS */}
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <a href="#" className="hidden sm:inline">f</a>
          <a href="#" className="hidden sm:inline">ig</a>
          <a href="#" className="hidden sm:inline">p</a>
        </div>

        {/* CENTER NAVIGATION + BRAND */}
        <div className="flex flex-col items-center flex-1">

          {/* NAV LINKS */}
          <nav className="flex items-center gap-6 text-sm mb-1">
            <Link to="/" className="font-medium">Home</Link>
            <a href="#about" className="text-slate-600">About Me</a>

            <div className="relative group">
              <button className="text-slate-600">Pages ▾</button>
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block bg-white border rounded shadow p-2 text-xs">
                <a href="#" className="block px-3 py-1">Page 1</a>
                <a href="#" className="block px-3 py-1">Page 2</a>
              </div>
            </div>

            <Link to="/shop" className="text-slate-600">Shop</Link>
            <Link to="/blog" className="text-slate-600">Blog</Link>
            <Link to="/contact" className="text-slate-600">Contact</Link>
            <Link to="/faq" className="text-slate-600">FAQ</Link>
          </nav>

          {/* BRAND */}
          <div className="text-center">
            <div className="text-[22px] font-[var(--font-serif)] tracking-wide">
              MW
            </div>
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          
          {/* SEARCH */}
          <button
            className="p-2 rounded-md border bg-white/70 hover:bg-white transition"
            title="Search"
          >
            🔍
          </button>

          {/* WISHLIST */}
          <button
            onClick={() => (window.location.href = "/wishlist")}
            className="p-2 rounded-md border bg-white/70 hover:bg-white transition flex items-center gap-1 text-sm"
            title="Wishlist"
          >
            ♡ <span className="text-xs">{wish.length}</span>
          </button>

          {/* CART */}
          <button
            onClick={() => (window.location.href = "/checkout")}
            className="p-2 rounded-md border bg-white/70 hover:bg-white transition flex items-center gap-1 text-sm"
            title="Cart"
          >
            🛒 <span className="text-xs">{items.length}</span>
          </button>

        </div>

      </div>
    </header>
  );
}
