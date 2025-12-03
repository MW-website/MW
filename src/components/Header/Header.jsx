import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiHeart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import MegaDropdown from "./MegaDropdown";
import CartBottomSheet from "../cart/CartBottomSheet";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items, hideBadge: hideCartBadge, showBadge: showCartBadge } = useCart();
  const { wish, hideBadge: hideWishBadge, showBadge: showWishBadge } = useWishlist();

  const handleCartOpen = () => {
    setCartOpen(true);
    hideCartBadge();
  };

  const handleWishlistClick = () => {
    hideWishBadge();
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3 text-gray-600 text-sm">
          <a href="#" className="hover:text-gray-900 transition hidden md:inline">Follow</a>
          <a href="#" className="hover:text-gray-900 transition hidden md:inline">Support</a>
        </div>

        {/* CENTER LOGO */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/shop" className="text-2xl font-serif tracking-tight text-gray-900 hover:opacity-90 transition">
            MW <span className="font-light italic text-gray-700">Store</span>
          </Link>
        </div>

        {/* RIGHT NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <Link to="/" className="hover:text-gray-900 transition">Home</Link>
          <Link to="/about" className="hover:text-gray-900 transition">About</Link>
          <Link to="/blog" className="hover:text-gray-900 transition">Blog</Link>
          <Link to="/contact" className="hover:text-gray-900 transition">Contact</Link>
          <Link to="/faq" className="hover:text-gray-900 transition">FAQ</Link>

          <MegaDropdown />

          <Link to="/wishlist" onClick={handleWishlistClick} className="relative hover:text-gray-900 transition" aria-label={`Wishlist (${wish.length} items)`}>
            <FiHeart size={18} />
            {showWishBadge && wish.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 rounded-full w-3 h-3" aria-hidden="true" />
            )}
          </Link>

          <button onClick={handleCartOpen} className="relative hover:text-gray-900 transition" aria-label="Checkout">
            <HiOutlineShoppingBag size={20} />
            {showCartBadge && items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                {items.length}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-md border border-gray-200 bg-white/60">
            <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3">
            <Link to="/" onClick={() => setMobileOpen(false)} className="text-sm text-gray-700">Home</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="text-sm text-gray-700">About</Link>
            <Link to="/blog" onClick={() => setMobileOpen(false)} className="text-sm text-gray-700">Blog</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="text-sm text-gray-700">Contact</Link>
            <Link to="/faq" onClick={() => setMobileOpen(false)} className="text-sm text-gray-700">FAQ</Link>
            <Link to="/wishlist" onClick={() => { handleWishlistClick(); setMobileOpen(false); }} className="text-sm text-gray-700">Wishlist</Link>
            <button onClick={() => { handleCartOpen(); setMobileOpen(false); }} className="text-sm text-gray-700 text-left">View Cart ({items.length})</button>
          </div>
        </div>
      )}

      <CartBottomSheet open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}

