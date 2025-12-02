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
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, layout = "default", onAddToCart, onQuickView }) {
  if (!products || products.length === 0) {
    return (
      <div className="py-24 text-center text-slate-500">
        No products found.
      </div>
    );
  }
  const gridClass =
    layout === "fashion"
    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-8";  return (
    <div className={gridClass}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} variant={layout === "fashion" ? "fashion" : "default"} onAddToCart={onAddToCart} onQuickView={onQuickView} />
      ))}
    </div>
  );
}
