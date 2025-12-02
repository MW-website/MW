/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 16:47:05
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import MegaDropdown from "./MegaDropdown";
import CartBottomSheet from "../cart/CartBottomSheet";
import { useCart } from "../../context/CartContext";

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCart();

  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50
        bg-transparent/90 
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT SOCIAL ICONS */}
        <div className="flex items-center gap-4 text-gray-700 text-sm">
          <a href="#" className="hover:text-black transition">f</a>
          <a href="#" className="hover:text-black transition">ig</a>
          <a href="#" className="hover:text-black transition">p</a>
        </div>

        {/* CENTER LOGO */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/shop" className="text-xl font-serif tracking-wide hover:text-black transition">
            MW <span className="font-light italic">Store</span>
          </Link>
        </div>

        {/* RIGHT NAVIGATION */}
        <nav className="flex items-center gap-6 uppercase text-xs tracking-wide text-gray-700">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <Link to="/about" className="hover:text-black transition">About</Link>
          <Link to="/blog" className="hover:text-black transition">Blog</Link>
          <Link to="/contact" className="hover:text-black transition">Contact</Link>
          <Link to="/faq" className="hover:text-black transition">FAQ</Link>

          {/* MEGA DROPDOWN SHOP */}
          <MegaDropdown />

          {/* ICONS */}
          <Link to="/search" className="ml-4 hover:text-black transition hidden">
            <FiSearch size={18} />
          </Link>

          <button onClick={() => setCartOpen(true)} className="relative hover:text-black transition" aria-label="Checkout">
            <HiOutlineShoppingBag size={20} />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                {items.length}
              </span>
            )}
          </button>
        </nav>
      </div>

      <CartBottomSheet open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
