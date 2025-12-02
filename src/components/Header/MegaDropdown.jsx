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

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineShoppingBag, MdOutlineCheckroom, MdOutlineStar } from "react-icons/md";
import { GiSkirt, GiDiamondRing } from "react-icons/gi";

export default function MegaDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { name: "All", icon: MdOutlineShoppingBag },
    { name: "Dresses", icon: MdOutlineStar },
    { name: "Tops", icon: MdOutlineCheckroom },
    { name: "Bags", icon: MdOutlineShoppingBag },
    { name: "Skirts", icon: GiSkirt },
    { name: "Shirts", icon: MdOutlineCheckroom },
    { name: "Accessories", icon: GiDiamondRing },
  ];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="hover:text-black transition uppercase text-xs tracking-wide text-gray-700 flex items-center gap-1">
        Shop
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {/* MEGA DROPDOWN MENU */}
      <div
        className={`
          absolute top-full -left-32
          w-[600px]
          bg-white shadow-xl
          rounded-lg border border-gray-200
          transition-all duration-200 ease-in-out transform
          origin-top
          ${isOpen ? "opacity-100 visible translate-y-2" : "opacity-0 invisible -translate-y-2"}
          z-40
        `}
      >
        <div className="grid grid-cols-3 gap-6 p-8">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const name = cat.name;
            const to = name === 'All' ? '/shop' : `/shop?category=${name.toLowerCase()}`;
            return (
              <Link key={name} to={to} className="text-center group/item">
                <div className="flex justify-center mb-3 transition-transform group-hover/item:scale-110">
                  <IconComponent className="w-8 h-8 text-gray-800" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide hover:text-gray-600 transition">
                  {name}
                </h3>
              </Link>
            );
          })}
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
