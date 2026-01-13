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
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useToast } from "../../context/ToastContext";

export default function ProductCard({ product, variant = "default", onAddToCart, onQuickView, index = 0 }) {
  if (!product) return null;

  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { wish, toggle } = useWishlist();
  const { showToast } = useToast();

  // is this product wishlisted?
  const isWish = wish.includes(product.id);

  const isFashion = variant === "fashion";

  const rootClass = isFashion
    ? "product-fashion relative"
    : "relative rounded-xl overflow-hidden bg-white shadow-[var(--shadow-soft)] transition-all";

  return (
    <motion.div 
      className={rootClass}
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >

      {/* WISHLIST HEART OVERLAY */}
      <motion.button
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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          scale: isWish ? [1, 1.2, 1] : 1 
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.span 
          className={`text-lg ${isWish ? "text-red-500" : "text-slate-700"}`}
          animate={{ rotate: isWish ? [0, -10, 10, 0] : 0 }}
        >
          {isWish ? "♥" : "♡"}
        </motion.span>
      </motion.button>

      {/* IMAGE */}
      {isFashion ? (
        <div className="image-wrap w-full overflow-hidden bg-slate-100">
          <motion.img 
            src={product.image} 
            alt={product.name}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      ) : (
        <div className="aspect-square w-full overflow-hidden bg-slate-100">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      )}

      {/* CONTENT */}
      <div className={isFashion ? "info" : "p-2 sm:p-3 md:p-4 space-y-1.5 sm:space-y-2"}>

        {/* TAGS */}
        <div className="flex gap-0.5 sm:gap-1 md:gap-2 flex-wrap">
          {product.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[7px] sm:text-[8px] md:text-[10px] px-1 sm:px-1.5 md:px-2 py-0.5 rounded-full bg-black text-white uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* TITLE */}
        <h3 className={isFashion ? "text-base sm:text-lg font-serif leading-tight" : "text-xs sm:text-sm md:text-[15px] font-medium leading-tight line-clamp-2"}>{product.name}</h3>

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
        <div className="text-[11px] sm:text-xs md:text-sm text-slate-500 font-semibold">
          ${product.price.toLocaleString()}
          {product.onSale && <span className="ml-1 text-red-600">SALE</span>}
        </div>

        {/* COLORS */}
        {product.colors && (
          <div className="flex gap-1.5 sm:gap-2 mt-1">
            {product.colors.map((c) => (
              <span
                key={c}
                className="w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 rounded-full border"
                style={{ backgroundColor: c }}
              ></span>
            ))}
          </div>
        )}

        {/* BUTTONS */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-2 pt-2 sm:pt-3"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
        >

          {/* QUICK VIEW */}
          <motion.button
            onClick={() => onQuickView && onQuickView(product)}
            className="w-full sm:flex-1 px-1.5 sm:px-2 md:px-3 py-1.5 sm:py-2 border text-[11px] sm:text-xs rounded-md hover:bg-slate-50 cursor-pointer transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Quick View
          </motion.button>

          {/* ADD TO CART */}
          <motion.button
            onClick={() => {
              addItem(product, 1);
              showToast("Added successfully!");
              onAddToCart && onAddToCart();
            }}
            className="w-full sm:flex-1 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-black text-white text-[11px] sm:text-xs rounded-md hover:bg-black/90 transition cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add to Cart
          </motion.button>

        </motion.div>

      </div>
    </motion.div>
  );
}
