/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 03/12/2025 - 00:57:16
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
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
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import CategoryDropdown from "../components/shop/CategoryDropdown";
import MiniNav from "../components/shop/MiniNav";
import ProductGrid from "../components/shop/ProductGrid";
import QuickViewModal from "../components/shop/QuickViewModal";
import Toast from "../components/Toast";
import { fetchAllProducts } from "../services/productApi";
import { Search, X } from "lucide-react";


export default function Shop() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [sort, setSort] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [priceFilter, setPriceFilter] = useState(searchParams.get("price") || null);
  const [quickProduct, setQuickProduct] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [minRating, setMinRating] = useState(0);
  const [saleOnly, setSaleOnly] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);


  // sync query params
  useEffect(() => {
    const cat = searchParams.get("category") || "All";
    setCategory(cat);
    setPriceFilter(searchParams.get("price") || null);
    const qFilter = searchParams.get("filter");
    const qPrice = searchParams.get("price");
    setSaleOnly(qFilter === "onsale");

    if (qPrice === "under-2000") {
      setMaxPrice(2000);
    } else {
      setMaxPrice(Infinity);
    }
  }, [searchParams]);

  // fetch products
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

  // derive categories
  const categories = useMemo(() => {
    const productCategories = new Set(products.map((p) => p.category));
    const keyCategories = ["Dresses", "Bags", "Skirts", "Tops", "Shirts", "Accessories"];
    const allCategories = new Set([...productCategories, ...keyCategories]);
    return ["All", ...Array.from(allCategories).sort()];
  }, [products]);

  // filtering + sorting
  const filtered = useMemo(() => {
    let data = [...products];

    if (category === "All" && searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      data = data.filter((p) =>
        (p.name || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q)
      );
    }

    if (category !== "All") {
      const catLower = category.toLowerCase();
      data = data.filter((p) => (p.category || "").toLowerCase() === catLower);
    }

    const qFilter = searchParams.get("filter");
    const qPrice = searchParams.get("price");

    if (qFilter === "onsale") {
      data = data.filter((p) => p.onSale);
    }

    if (qPrice === "under-2000") {
      data = data.filter((p) => p.price < 2000);
    }

    data = data.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    if (minRating > 0) {
      data = data.filter((p) => (p.rating || 0) >= minRating);
    }

    if (saleOnly) {
      data = data.filter((p) => p.onSale);
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
  }, [category, sort, products, minPrice, maxPrice, minRating, saleOnly, searchParams, searchTerm]);

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
    <>
{/* MOBILE SEARCH FLOATING ICON */}
<div className="fixed top-3 right-4 z-50 md:hidden">
  {!mobileSearchOpen && (
    <button
      onClick={() => setMobileSearchOpen(true)}
      className="p-2 rounded-full bg-transparent text-black shadow-none flex items-center justify-center"
    >
      <Search size={22} strokeWidth={2} />
    </button>
  )}
</div>


{/* MOBILE SEARCH BAR */}
{mobileSearchOpen && (
  <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 px-4 py-3 md:hidden shadow-sm">
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-sm"
      />

      <button
        onClick={() => setMobileSearchOpen(false)}
        className="ml-3 p-1 text-gray-700"
      >
        <X size={22} />
      </button>
    </div>
  </div>
)}



      <motion.main
        initial={category === "All" ? { opacity: 0, y: 8 } : false}
        animate={category === "All" ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container py-6 md:py-10 pt-16"
      >
        {/* Fashion hero only for All */}
        {category === "All" && (
          <section className="shop-hero glass-card mb-8 md:mb-10">
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="flex-1">
                <h2 className="title text-2xl md:text-4xl">Discover Timeless Fashion</h2>
                <p className="subtitle mt-3 md:mt-4 text-sm md:text-base">
                  A curated edit of beautiful pieces — effortless silhouettes, soft neutrals and modern classics.
                </p>
                <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-2 md:gap-3">
                  <button onClick={() => setCategory("Dresses")} className="btn-shop-ghost cursor-pointer text-sm px-3 md:px-4 py-2">
                    Explore Dresses
                  </button>
                  <button onClick={() => setCategory("Tops")} className="px-3 md:px-4 py-2 bg-black text-white rounded-md cursor-pointer text-sm">
                    Explore Tops
                  </button>
                  <button onClick={() => setCategory("Bags")} className="px-3 md:px-4 py-2 bg-white text-black border border-black rounded-md cursor-pointer text-sm">
                    Explore Bags
                  </button>
                </div>
              </div>

              <div className="hidden md:block md:w-1/3">
                <img
                  src="https://thelimitedclothes.com/wp-content/uploads/2024/06/The-Limited-7.webp"
                  alt="fashion hero"
                  className="w-full h-[260px] object-cover rounded-md shadow(--shadow-soft)"
                />
              </div>
            </div>
          </section>
        )}

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
          <div className="w-full lg:hidden">
            <CategoryDropdown
              categories={categories}
              active={category}
              onSelect={setCategory}
            />
          </div>

          <section className="flex-1 min-w-0 w-full">
            <div className="hidden lg:block mb-6">
              <CategoryDropdown
                categories={categories}
                active={category}
                onSelect={setCategory}
              />
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden md:block w-full mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {category !== "All" && (
              <h2 className="text-3xl md:text-4xl luxury font-semibold mb-8 tracking-wide text-gray-900 uppercase">
                {category}
              </h2>
            )}

            <MiniNav
              sort={sort}
              onSort={setSort}
              category={category}
              onClear={() => setCategory("All")}
              onSelect={setCategory}
              categories={categories}
              search={searchTerm}
              onSearch={setSearchTerm}
              productCount={filtered.length}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              minRating={minRating}
              setMinRating={setMinRating}
              saleOnly={saleOnly}
              setSaleOnly={setSaleOnly}
            />

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
      </motion.main>
    </>
  );
}
