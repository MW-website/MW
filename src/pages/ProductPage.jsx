/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 15:27:02
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
/**
 * Single Product Page — MW Store
 */

import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";
import Gallery from "../components/product/Gallery";
import SpecsAccordion from "../components/product/SpecsAccordion";
import ProductCard from "../components/shop/ProductCard";

export default function ProductPage() {
  const { slug } = useParams();
  const product = useMemo(
    () => products.find((x) => x.slug === slug),
    [slug]
  );

  const { add } = useCart();
  const { wish, toggle } = useWishlist();
  const { addProduct: addToRecentlyViewed } = useRecentlyViewed();

  // Track product view
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-xl font-[var(--font-serif)]">Product Not Found</h1>
        <a href="/shop" className="underline mt-4 block">Back to Shop</a>
      </div>
    );
  }

  return (
    <main className="container py-10 grid lg:grid-cols-2 gap-12">

      {/* LEFT: GALLERY */}
      <div className="gsap-reveal">
        <Gallery images={[product.image, product.image, product.image]} />
      </div>

      {/* RIGHT: INFO */}
      <div className="gsap-reveal flex flex-col">
        <h1 className="text-3xl font-[var(--font-serif)] tracking-wide">
          {product.name}
        </h1>

        <p className="text-sm text-slate-500 mt-1">{product.category}</p>

        <p className="text-2xl font-semibold mt-4">${product.price}</p>

        {/* Wishlist Button */}
        <button
          onClick={() => toggle(product.id)}
          className="text-sm mt-3 underline text-slate-600 hover:text-black"
        >
          {wish.includes(product.id) ? "♥ Remove from Wishlist" : "♡ Add to Wishlist"}
        </button>

        {/* Add to Cart */}
        <button
          onClick={() => add(product.id)}
          className="mt-6 bg-black text-white py-3 rounded-md text-sm"
        >
          Add to Cart
        </button>

        {/* Description */}
        <p className="mt-6 text-slate-700 leading-relaxed">
          {product.desc || "Beautiful high-quality item."}
        </p>

        {/* Specs Accordion */}
        <div className="mt-8">
          <SpecsAccordion />
        </div>
      </div>

      {/* RECOMMENDED */}
      <section className="col-span-2 mt-20">
        <h2 className="text-xl font-[var(--font-serif)] mb-6">
          You may also like
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((p) => (
              <ProductCard product={p} key={p.id} />
            ))}
        </div>
      </section>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur border-t py-4 px-6 flex items-center justify-between lg:hidden">
        <span className="font-semibold">${product.price}</span>
        <button
          onClick={() => add(product.id)}
          className="bg-black text-white px-5 py-2 rounded-md text-sm"
        >
          Add to Cart
        </button>
      </div>
    </main>
  );
}
