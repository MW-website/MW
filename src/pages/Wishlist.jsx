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
 * Wishlist Page — Joelle Boutique
 * Clean grid, quick-view, remove, add-to-cart
 */

import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import products from "../data/products";
import QuickViewModal from "../components/shop/QuickViewModal";

export default function WishlistPage() {
  const { wish, remove } = useWishlist();
  const { add } = useCart();
  const [quickViewId, setQuickViewId] = React.useState(null);

  const items = products.filter((p) => wish.includes(p.id));

  return (
    <main className="container py-12">

      <h1 className="text-2xl font-[var(--font-serif)] mb-8">Your Wishlist</h1>

      {/* Empty */}
      {items.length === 0 && (
        <div className="py-24 text-center text-[color-mix(in srgb,var(--color-joelle-muted) 40%,black)]">
          <p className="text-lg">Your wishlist is empty.</p>
          <a
            href="/shop"
            className="inline-block mt-6 px-6 py-3 rounded-md bg-black text-white"
          >
            Browse Shop
          </a>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((p) => (
          <div
            key={p.id}
            className="group border rounded-xl bg-white/70 backdrop-blur shadow-sm hover:shadow-lg transition-all p-3"
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

            <div className="mt-3">
              <h3 className="font-medium text-sm">{p.name}</h3>
              <p className="text-xs text-slate-500">{p.category}</p>
              <p className="font-semibold mt-1">${p.price}</p>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-3">
                <button
                  className="flex-1 px-3 py-2 text-xs bg-black text-white rounded-md"
                  onClick={() => add(p.id)}
                >
                  Add to Cart
                </button>

                <button
                  className="px-2 py-2 text-xs rounded-md border border-slate-300"
                  onClick={() => remove(p.id)}
                >
                  ✕
                </button>
              </div>

              {/* Quick View */}
              <button
                className="mt-2 text-xs underline text-slate-600 hover:text-black"
                onClick={() => setQuickViewId(p.id)}
              >
                Quick View
              </button>
            </div>
          </div>
        ))}
      </div>

      {quickViewId && (
        <QuickViewModal id={quickViewId} onClose={() => setQuickViewId(null)} />
      )}
    </main>
  );
}
