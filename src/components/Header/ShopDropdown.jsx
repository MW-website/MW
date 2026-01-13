import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

export default function ShopDropdown({ onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onScroll = () => setIsOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  const categories = ["All", "Dresses", "Tops", "Shirts", "Skirts", "Accessories", "Bags"];

  const handleSelect = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-700 hover:text-gray-900 py-2 flex items-center gap-1 transition"
      >
        Shop
        <FiChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg z-50 min-w-[150px]">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={cat === "All" ? "/shop" : `/shop?category=${cat}`}
              onClick={handleSelect}
              className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700 first:rounded-t-lg last:rounded-b-lg transition luxury uppercase"
            >
              {cat.toUpperCase()}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
