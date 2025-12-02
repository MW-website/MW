/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 14:06:11
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
// src/components/shop/CategorySidebar.jsx
import React from "react";

export default function CategorySidebar({ categories, active, onSelect }) {
  return (
    <div className="glass-card p-4 sticky top-24 rounded-xl">
      <h4 className="font-semibold mb-3">Categories</h4>

      <div className="flex flex-col gap-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`
              text-left px-3 py-2 rounded-md transition
              ${active === cat
                ? "bg-black text-white"
                : "bg-white/70 hover:bg-black/5"}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      <hr className="my-4 border-slate-200" />

      <h4 className="font-semibold mb-2">Quick Filters</h4>
      <div className="flex flex-col gap-1">
        <button className="px-3 py-2 text-left rounded-md bg-white/70 hover:bg-black/5">
          On Sale
        </button>
        <button className="px-3 py-2 text-left rounded-md bg-white/70 hover:bg-black/5">
          Under ₦20,000
        </button>
      </div>
    </div>
  );
}
