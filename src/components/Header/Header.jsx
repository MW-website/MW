import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiHeart, FiChevronDown, FiTag, FiGrid, FiShoppingBag, FiBriefcase } from "react-icons/fi";

import CartBottomSheet from "../cart/CartBottomSheet";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [logoSlide, setLogoSlide] = useState(false);

  const shopRef = useRef(null);
  const navigate = useNavigate();

  const { items, hideBadge: hideCartBadge, showBadge: showCartBadge } = useCart();
  const { wish, hideBadge: hideWishBadge, showBadge: showWishBadge } = useWishlist();

  // Quick shop category links
  const shopLinks = [
    { to: "/shop?cat=dresses",     label: "Dresses",     icon: <FiTag /> },
    { to: "/shop?cat=tops",        label: "Tops",        icon: <FiGrid /> },
    { to: "/shop?cat=bags",        label: "Bags",        icon: <FiBriefcase /> },
    { to: "/shop?cat=accessories", label: "Accessories", icon: <FiHeart /> },
    { to: "/shop?cat=skirts",      label: "Skirts",      icon: <FiTag /> },
    { to: "/shop?cat=shirts",      label: "Shirts",      icon: <FiGrid /> },
    { to: "/shop?cat=all",         label: "All Fashion", icon: <FiShoppingBag /> },
  ];

  const navItems = [
    { to: "/",      label: "Home" },
    { to: "/about", label: "About" },
    { to: "/blog",  label: "Blog" },
    { to: "/contact", label: "Contact" },
    { to: "/faq",   label: "FAQ" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!shopOpen) return;

    const handleClickOutside = (e) => {
      if (shopRef.current && !shopRef.current.contains(e.target)) {
        setShopOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [shopOpen]);

  const handleCartOpen = () => {
    setCartOpen(true);
    hideCartBadge();
  };

  const handleWishlistClick = () => {
    hideWishBadge();
    // If you want to navigate → add: navigate("/wishlist");
  };

  const handleStoreClick = (e) => {
    e.preventDefault();
    setLogoSlide(true);

    // Match CSS transition duration (600ms)
    setTimeout(() => {
      setLogoSlide(false);
      navigate("/shop?cat=all");
    }, 600);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo with expanding pill animation */}
        <div className="flex items-center gap-2 select-none">
          <div className="relative flex items-center" style={{ width: 160, height: 44 }}>
            <span
              className="absolute left-0 top-0 h-11 rounded-full bg-black transition-all duration-600 ease-[cubic-bezier(0.7,0.2,0.2,1)] z-0"
              style={{ width: logoSlide ? 160 : 64 }}
            />
            <span className="relative z-10 px-5 py-2 text-2xl font-extrabold tracking-[2px] text-white font-['Montserrat',sans-serif]">
              MW
            </span>
            <span
              className={`relative z-10 cursor-pointer pl-2 text-2xl italic text-gray-700 transition-colors duration-300 font-['Playfair_Display',serif] font-medium ${
                logoSlide ? "text-white" : ""
              }`}
              onClick={handleStoreClick}
            >
              Store
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-base font-medium font-['Playfair_Display',serif]">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-lg px-2 py-1 transition hover:text-black/80"
            >
              {item.label}
            </Link>
          ))}

          {/* Shop dropdown */}
          <div className="relative" ref={shopRef}>
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg px-2 py-1 transition hover:text-black/80"
              onClick={() => setShopOpen((prev) => !prev)}
              aria-expanded={shopOpen}
              aria-label="Shop categories"
            >
              Shop
              <FiChevronDown size={16} />
            </button>

            <div
              className={`absolute left-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-xl transition-all duration-300 ${
                shopOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
            >
              {shopLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-3 px-5 py-2 text-base transition hover:bg-gray-100 font-['Playfair_Display',serif]"
                  onClick={() => setShopOpen(false)}
                >
                  <span className="text-gray-500">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={handleWishlistClick}
            className="relative transition hover:text-black/80"
            aria-label="Wishlist"
          >
            <FiHeart size={22} />
            {showWishBadge && wish?.length > 0 && (
              <span className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-pink-500" />
            )}
          </button>

          <button
            type="button"
            onClick={handleCartOpen}
            className="relative transition hover:text-black/80"
            aria-label="Shopping Cart"
          >
            <HiOutlineShoppingBag size={24} />
            {showCartBadge && items?.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-semibold text-white">
                {items.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <CartBottomSheet open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}

// Remove any duplicate hook/variable declarations below this line (if present)