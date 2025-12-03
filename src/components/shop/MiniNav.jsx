/**
 * Shop navigation bar with sort and filter options
 */
import React, { useState } from "react";
import { MdTune } from "react-icons/md";

export default function MiniNav({ sort, onSort, category, onClear, productCount = 0, minPrice, setMinPrice, maxPrice, setMaxPrice, minRating, setMinRating, saleOnly, setSaleOnly }) {
  const [showFilters, setShowFilters] = useState(false);
  const isFiltered = category !== "All";

  const handleReset = () => {
    onSort("default");
    onClear();
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-3 bg-white/60 py-3 px-4 rounded-lg border border-gray-100">

        <div className="flex items-center gap-3">
          {isFiltered && (
            <button
              onClick={onClear}
              className="px-3 py-2 rounded-md bg-black text-white text-xs hover:bg-gray-900 transition cursor-pointer"
            >
              ⬅ Back
            </button>
          )}

          <div className="text-sm text-slate-600">
            <span className="font-medium">{category}</span>
            {productCount > 0 && <span className="ml-2 text-xs">({productCount})</span>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 py-2 rounded-md border bg-white text-xs hover:bg-gray-50 transition flex items-center gap-2 cursor-pointer"
          >
            <MdTune size={16} />
            Filters
          </button>

          <select
            value={sort}
            onChange={(e) => onSort(e.target.value)}
            className="px-3 py-2 rounded-md border bg-white text-xs focus:outline-none"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="az">A → Z</option>
            <option value="rating">Top Rated</option>
          </select>

          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-md border bg-white text-xs hover:bg-gray-50 transition cursor-pointer"
          >
            Reset All
          </button>
        </div>
      </div>

      {/* FILTER PANEL */}
      {showFilters && (
        <div className="mt-3 bg-white/80 border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-2">Price Range</label>
              <div className="flex gap-2">
                <input type="number" placeholder="Min" min="0" value={minPrice} onChange={(e) => setMinPrice(Math.max(0, parseFloat(e.target.value) || 0))} className="w-full px-2 py-1 border rounded text-xs" />
                <input type="number" placeholder="Max" value={maxPrice === Infinity ? "" : maxPrice} onChange={(e) => setMaxPrice(parseFloat(e.target.value) || Infinity)} className="w-full px-2 py-1 border rounded text-xs" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-2">Rating</label>
              <select value={minRating} onChange={(e) => setMinRating(parseInt(e.target.value))} className="w-full px-2 py-1 border rounded text-xs cursor-pointer">
                <option value="0">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-2">On Sale</label>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input type="checkbox" checked={saleOnly} onChange={(e) => setSaleOnly(e.target.checked)} className="w-4 h-4 cursor-pointer" />
                Sale Items Only
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-2">Availability</label>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                In Stock
              </label>
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            <button onClick={() => setShowFilters(false)} className="px-3 py-1 bg-black text-white text-xs rounded hover:bg-gray-900 transition cursor-pointer">Apply</button>
            <button onClick={() => setShowFilters(false)} className="px-3 py-1 border text-xs rounded hover:bg-gray-50 transition cursor-pointer">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
