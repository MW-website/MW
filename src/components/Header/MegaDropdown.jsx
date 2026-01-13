/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 02/12/2025 - 22:36:56
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 02/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
/**
 * @description      : Mega dropdown menu for Shop category navigation
 * @author           : fortu
 * @created          : 02/12/2025
 * 
 * MODIFICATION LOG
 * - Version         : 1.1.0
 * - Date            : 02/12/2025
 * - Modification    : Fixed positioning, added react-icons
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Star, Shirt, Backpack, Scissors, Diamond, ChevronDown } from "lucide-react";

export default function MegaDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onScroll = () => setIsOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  const categories = [
    { name: "All", icon: ShoppingBag },
    { name: "Dresses", icon: Star },
    { name: "Tops", icon: Shirt },
    { name: "Bags", icon: Backpack },
    { name: "Skirts", icon: Scissors },
    { name: "Shirts", icon: Shirt },
    { name: "Accessories", icon: Diamond },
  ];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="hover:text-black transition uppercase text-xs tracking-wide text-gray-700 flex items-center gap-1">
        Shop
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* MEGA DROPDOWN MENU */}
      <div
        className={`
          absolute top-full -left-[28rem]
          w-[600px]
          bg-white shadow-xl
          rounded-lg border border-gray-200
          transition-all duration-200 ease-in-out transform
          origin-top
          ${isOpen ? "opacity-100 visible translate-y-2" : "opacity-0 invisible -translate-y-2"}
          z-40
        `}
      >
        <div className="p-8">
          <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-6">Categories</p>
          <div className="grid grid-cols-3 gap-6">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              const name = cat.name;
              const to = name === 'All' ? '/shop' : `/shop?category=${name.toLowerCase()}`;
              return (
                <Link key={name} to={to} className="text-center group/item">
                  <div className="flex justify-center mb-3 transition-transform group-hover/item:scale-110">
                    <IconComponent className="w-8 h-8 text-gray-800" />
                  </div>
                      <h3 className="text-sm font-semibold text-gray-800 tracking-wide hover:text-gray-600 transition luxury uppercase">
                        {name.toUpperCase()}
                      </h3>
                </Link>
              );
            })}
          </div>
        </div>

        {/* FEATURED SECTION + QUICK FILTERS */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Quick Filters</p>
              <div className="flex gap-3 mt-2">
                <Link to="/shop?filter=onsale" className="text-xs text-gray-700 hover:text-black">On Sale</Link>
                <Link to="/shop?price=under-2000" className="text-xs text-gray-700 hover:text-black">Under $2000</Link>
              </div>
            </div>

            <Link to="/shop" className="text-xs uppercase tracking-wide font-semibold text-gray-700 hover:text-black transition border-b border-gray-700 pb-1">View All Shop →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
