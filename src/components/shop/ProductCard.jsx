/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 16:18:12
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
// src/components/shop/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductCard({ product, variant = "default", onAddToCart, onQuickView }) {
  if (!product) return null;

  const { addItem } = useCart();
  const { wish, toggle } = useWishlist();

  // is this product wishlisted?
  const isWish = wish.includes(product.id);

  const isFashion = variant === "fashion";

  const rootClass = isFashion
    ? "product-fashion relative"
    : "relative rounded-xl overflow-hidden bg-white shadow-[var(--shadow-soft)] hover:shadow-lg transition-all";

  return (
    <div className={rootClass}>

      {/* WISHLIST HEART OVERLAY */}
      <button
        onClick={() => toggle(product.id)}
        className="
          absolute top-3 right-3 
          z-20 
          w-9 h-9 
          rounded-full 
          bg-white/80 
          backdrop-blur 
          shadow 
          flex items-center justify-center 
          hover:bg-white 
          transition
        "
      >
        <span className={`text-lg ${isWish ? "text-red-500" : "text-slate-700"}`}>
          {isWish ? "♥" : "♡"}
        </span>
      </button>

      {/* IMAGE */}
      {isFashion ? (
        <div className="image-wrap w-full overflow-hidden bg-slate-100">
          <img src={product.image} alt={product.name} />
        </div>
      ) : (
        <div className="aspect-square w-full overflow-hidden bg-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition"
          />
        </div>
      )}

      {/* CONTENT */}
      <div className={isFashion ? "info" : "p-4 space-y-2"}>

        {/* TAGS */}
        <div className="flex gap-2 flex-wrap">
          {product.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-1 rounded-full bg-black text-white uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* TITLE */}
        <h3 className={isFashion ? "text-lg font-serif leading-tight" : "text-[15px] font-medium leading-tight"}>{product.name}</h3>

        {/* RATING */}
        {product.rating && (
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-600">({product.reviews || 0})</span>
          </div>
        )}

        {/* PRICE */}
        <div className="text-sm text-slate-500">
          ${product.price.toLocaleString()}
          {product.onSale && <span className="ml-2 text-red-600 font-semibold">SALE</span>}
        </div>

        {/* COLORS */}
        {product.colors && (
          <div className="flex gap-2 mt-1">
            {product.colors.map((c) => (
              <span
                key={c}
                className="w-3 h-3 rounded-full border"
                style={{ backgroundColor: c }}
              ></span>
            ))}
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex justify-between items-center pt-3">

          {/* QUICK VIEW */}
          <button
            onClick={() => onQuickView && onQuickView(product)}
            className="px-3 py-2 border text-xs rounded-md hover:bg-slate-50"
          >
            Quick View
          </button>

          {/* ADD TO CART */}
          <button
            onClick={() => {
              addItem(product, 1);
              onAddToCart && onAddToCart();
            }}
            className="px-4 py-2 bg-black text-white text-xs rounded-md hover:bg-black/90 transition cursor-default"
          >
            Add to Cart
          </button>

        </div>

      </div>
    </div>
  );
}
