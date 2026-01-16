/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 14:33:50
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
/**
 * Wishlist Page — MW Store
 * Clean grid, quick-view, remove, add-to-cart
 */

import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import QuickViewModal from "../components/shop/QuickViewModal";
import { fetchAllProducts } from "../services/productApi";

export default function WishlistPage() {
  const { wish, remove, hideBadge } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();
  const [quickViewId, setQuickViewId] = React.useState(null);

  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    hideBadge();
  }, [hideBadge]);

  React.useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const all = await fetchAllProducts();
      if (!mounted) return;
      const filtered = all.filter((p) => wish.includes(p.id));
      setItems(filtered);
      setLoading(false);
    }
    load();
    return () => (mounted = false);
  }, [wish]);

  return (
    <main className="container py-6 md:py-12">

      <h1 className="text-2xl md:text-3xl font-[var(--font-serif)] mb-8">Your Wishlist</h1>

      {/* Login Prompt Banner */}
      {!isAuthenticated && items.length > 0 && (
        <div className="mb-6 p-4 md:p-6 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-base md:text-lg mb-1">Save Your Wishlist</h3>
              <p className="text-xs md:text-sm text-slate-600">Create an account to save your wishlist across all devices</p>
            </div>
            <div className="flex gap-2">
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm bg-slate-900 text-white rounded-md hover:bg-slate-800 transition"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 text-sm border border-slate-300 rounded-md hover:bg-white transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="py-24 text-center text-gray-400">
          <svg className="mx-auto mb-4 animate-spin" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" strokeOpacity=".2"/><path d="M22 12a10 10 0 0 1-10 10"/></svg>
          <p className="text-base md:text-lg">Loading your wishlist...</p>
        </div>
      )}
      {/* Empty */}
      {!loading && items.length === 0 && (
        <div className="py-24 text-center text-[color-mix(in srgb,var(--color-mw-muted) 40%,black)]">
          <p className="text-base md:text-lg">Your wishlist is empty.</p>
          <a
            href="/shop"
            className="inline-block mt-6 px-4 md:px-6 py-2 md:py-3 rounded-md bg-black text-white text-sm md:text-base"
          >
            Browse Shop
          </a>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <div
            key={p.id}
            className="group border rounded-lg sm:rounded-xl bg-white/70 backdrop-blur shadow-sm hover:shadow-lg transition-all p-2 sm:p-3"
          >
            {/* Image */}
            <div
              className="aspect-[4/5] w-full rounded-lg overflow-hidden bg-slate-100 cursor-pointer"
              onClick={() => setQuickViewId(p.id)}
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
            </div>

            <div className="mt-2 sm:mt-3">
              <h3 className="font-medium text-[11px] sm:text-xs md:text-sm line-clamp-2">{p.name}</h3>
              <p className="text-[10px] sm:text-[11px] text-slate-500">{p.category}</p>
              <p className="font-semibold text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1">${p.price}</p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                <button
                  className="flex-1 w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs bg-black text-white rounded-md hover:bg-gray-900 transition cursor-pointer"
                  onClick={() => { addItem(p, 1); showToast("Added to cart successfully!"); }}
                >
                  Add to Cart
                </button>

                <button
                  className="w-full sm:w-auto px-2 py-1.5 sm:py-2 text-xs rounded-md border border-slate-300 hover:bg-slate-100 transition cursor-pointer"
                  onClick={() => remove(p.id)}
                >
                  ✕
                </button>
              </div>

              {/* Quick View */}
              <button
                className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs underline text-slate-600 hover:text-black w-full text-left"
                onClick={() => setQuickViewId(p.id)}
              >
                Quick View
              </button>
            </div>
          </div>
        ))}
      </div>

      {quickViewId && items.length > 0 && (
        <QuickViewModal 
          product={items.find((p) => p.id === quickViewId)} 
          onClose={() => setQuickViewId(null)} 
        />
      )}
    </main>
  );
}
