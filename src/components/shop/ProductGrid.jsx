/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 16:13:30
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
// src/components/shop/ProductGrid.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, layout = "default", onAddToCart, onQuickView }) {
  if (!products || products.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-24 text-center text-slate-500"
      >
        No products found.
      </motion.div>
    );
  }
  const gridClass =
    layout === "fashion"
    ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
    : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6";

  return (
    <div className={gridClass}>
      <AnimatePresence mode="popLayout">
        {products.map((p, index) => (
          <ProductCard 
            key={p.id} 
            product={p} 
            variant={layout === "fashion" ? "fashion" : "default"} 
            onAddToCart={onAddToCart} 
            onQuickView={onQuickView}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
