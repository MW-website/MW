import React, { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function CategoryDropdown({ categories, active, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (category) => {
    onSelect(category);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onScroll = () => setIsOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border rounded-lg bg-white text-sm font-medium flex items-center justify-between hover:bg-gray-50 transition"
      >
        <span className="luxury uppercase tracking-wide">{active}</span>
        <FiChevronDown size={18} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleSelect(cat)}
              className={`w-full text-left px-4 py-3 transition ${
                active === cat
                  ? "bg-black text-white font-medium luxury uppercase"
                  : "hover:bg-gray-50 text-gray-700 luxury uppercase"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
