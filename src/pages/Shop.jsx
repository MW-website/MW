/**
 * @description      : Shop page with API integration
 * @author           : fortu
 * @created          : 01/12/2025
 * 
 * MODIFICATION LOG
 * - Version         : 2.0.0
 * - Date            : 02/12/2025
 * - Modification    : Integrated API for full product catalog
 */

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CategorySidebar from "../components/shop/CategorySidebar";
import MiniNav from "../components/shop/MiniNav";
import ProductGrid from "../components/shop/ProductGrid";
import QuickViewModal from "../components/shop/QuickViewModal";
import Toast from "../components/Toast";
import { fetchAllProducts } from "../services/productApi";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [sort, setSort] = useState("default");
  const [showToast, setShowToast] = useState(false);
  const [priceFilter, setPriceFilter] = useState(searchParams.get("price") || null);
  const [quickProduct, setQuickProduct] = useState(null);

  // sync query params to local state when the URL changes
  useEffect(() => {
    const cat = searchParams.get("category") || "All";
    setCategory(cat);
    setPriceFilter(searchParams.get("price") || null);
  }, [searchParams]);

  // Fetch products from API on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Derive distinct categories
  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((p) => p.category))];
  }, [products]);

  // Filtering + Sorting
  const filtered = useMemo(() => {
    let data = [...products];

    if (category !== "All") {
      const catLower = String(category || "").toLowerCase();
      data = data.filter((p) => String(p.category || "").toLowerCase() === catLower);
    }

    // quick filters from query params
    const qFilter = searchParams.get("filter");
    const qPrice = searchParams.get("price");
    if (qFilter === "onsale") {
      data = data.filter((p) => p.onSale);
    }
    if (qPrice === "under-2000") {
      data = data.filter((p) => p.price < 2000);
    }

    switch (sort) {
      case "price-asc":
        data.sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        data.sort((a, b) => b.price - a.price);
        break;

      case "az":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "rating":
        data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;

      default:
        break;
    }

    return data;
  }, [category, sort, products]);

  if (loading) {
    return (
      <main className="container py-10 flex gap-5 justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading collection...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container py-10 flex gap-5 justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-800 text-white uppercase text-xs font-semibold rounded hover:bg-gray-700 transition"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-10">
      {/* Fashion hero only for All */}
      {category === "All" && (
        <section className="shop-hero glass-card mb-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="title">Discover Timeless Fashion</h2>
              <p className="subtitle mt-4">A curated edit of beautiful pieces — effortless silhouettes, soft neutrals and modern classics. Shop our full collection and find staples that last.</p>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setCategory("Dresses")} className="btn-shop-ghost">Explore Dresses</button>
                <button onClick={() => setCategory("Bags")} className="px-4 py-2 bg-black text-white rounded-md">Explore Bags</button>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <img src="/images/hero-fashion.jpg" alt="fashion hero" className="w-full h-[260px] object-cover rounded-md shadow-[var(--shadow-soft)]" />
            </div>
          </div>
        </section>
      )}

      <div className="flex gap-5">
        {/* LEFT SIDEBAR (only when filtering) */}
        {category !== "All" && (
          <aside className="hidden md:block w-[220px] shrink-0">
            <CategorySidebar
              categories={categories}
              active={category}
              onSelect={setCategory}
            />
          </aside>
        )}

        {/* MAIN PRODUCT AREA */}
        <section className="flex-1 min-w-0">
          <MiniNav
            sort={sort}
            onSort={setSort}
            category={category}
            onClear={() => setCategory("All")}
            productCount={filtered.length}
          />

          {/* PRODUCT GRID */}
          {filtered.length > 0 ? (
            <>
            <ProductGrid 
              products={filtered} 
              layout={category === "All" ? "fashion" : "default"}
              onAddToCart={() => setShowToast(true)}
              onQuickView={(p) => setQuickProduct(p)}
            />
            {quickProduct && (
              <QuickViewModal product={quickProduct} onClose={() => setQuickProduct(null)} />
            )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found in this category.</p>
            </div>
          )}
        </section>

      </div>

      <Toast message="Added successfully!" show={showToast} onClose={() => setShowToast(false)} />
    </main>
  );
}
