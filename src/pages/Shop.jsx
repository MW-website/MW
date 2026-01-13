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
import Toast from "../components/ui/Toast";
import { fetchAllProducts } from "../services/productApi";
import { Search, X, ArrowUp } from "lucide-react";


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
  const [showScrollTop, setShowScrollTop] = useState(false);


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

  // scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (category === "All") {
        setShowScrollTop(window.scrollY > 400);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [category]);

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

  // handle category change with scroll to top for "All"
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    if (newCategory === "All") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
      <main className="min-h-screen bg-[var(--color-mw-beige)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
          <p className="text-slate-600 font-light" style={{ fontFamily: 'var(--font-serif)' }}>Loading collection...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[var(--color-mw-beige)] flex items-center justify-center">
        <div className="text-center glass-card p-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 transition-colors"
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
<div className="fixed top-20 right-4 z-40 md:hidden">
  {!mobileSearchOpen && (
    <button
      onClick={() => setMobileSearchOpen(true)}
      className="p-3 rounded-full glass-card shadow-lg flex items-center justify-center hover:bg-white/90 transition"
    >
      <Search size={20} strokeWidth={2} />
    </button>
  )}
</div>


{/* MOBILE SEARCH BAR */}
{mobileSearchOpen && (
  <div className="fixed top-16 left-0 right-0 z-50 glass-card border-b border-slate-200 px-4 py-4 md:hidden shadow-lg">
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Search fashion..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 px-4 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-white"
      />

      <button
        onClick={() => setMobileSearchOpen(false)}
        className="ml-3 p-1.5 text-slate-700 hover:text-slate-900"
      >
        <X size={20} />
      </button>
    </div>
  </div>
)}



      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-screen bg-[var(--color-mw-beige)] py-6 md:py-10 pt-16 md:pt-24"
      >
        <div className="container">
        {/* Fashion hero only for All */}
        {category === "All" && (
          <motion.section 
            className="glass-card mb-8 md:mb-12 p-8 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4" style={{ fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em', color: '#0f1724' }}>
                  Discover Timeless Fashion
                </h1>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-6">
                  A curated edit of beautiful pieces — effortless silhouettes, soft neutrals and modern classics.
                </p>
                <div className="flex flex-wrap gap-3">
                  <motion.button 
                    onClick={() => handleCategoryChange("Dresses")} 
                    className="px-5 py-2.5 border border-slate-300 rounded-md hover:bg-white hover:border-slate-900 transition-colors text-sm font-medium"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Dresses
                  </motion.button>
                  <motion.button 
                    onClick={() => handleCategoryChange("Tops")} 
                    className="px-5 py-2.5 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors text-sm font-medium"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Tops
                  </motion.button>
                  <motion.button 
                    onClick={() => handleCategoryChange("Bags")} 
                    className="px-5 py-2.5 border border-slate-900 text-slate-900 rounded-md hover:bg-slate-900 hover:text-white transition-colors text-sm font-medium"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Bags
                  </motion.button>
                </div>
              </motion.div>

              <motion.div 
                className="hidden md:block md:w-1/3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src="https://thelimitedclothes.com/wp-content/uploads/2024/06/The-Limited-7.webp"
                  alt="fashion hero"
                  className="w-full h-[300px] object-cover rounded-lg shadow-md"
                />
              </motion.div>
            </div>
          </motion.section>
        )}

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="w-full lg:hidden">
            <CategoryDropdown
              categories={categories}
              active={category}
              onSelect={handleCategoryChange}
            />
          </div>

          <section className="flex-1 min-w-0 w-full">
            <div className="hidden lg:block mb-6">
              <CategoryDropdown
                categories={categories}
                active={category}
                onSelect={handleCategoryChange}
              />
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden md:block w-full mb-6">
              <div className="relative glass-card p-1">
                <input
                  type="text"
                  placeholder="Search fashion..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 transition bg-white"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {category !== "All" && (
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 tracking-tight" 
                style={{ fontFamily: 'var(--font-serif)', color: '#0f1724' }}
                key={category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                {category}
              </motion.h2>
            )}

            <MiniNav
              sort={sort}
              onSort={setSort}
              category={category}
              onClear={() => handleCategoryChange("All")}
              onSelect={handleCategoryChange}
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
              <div className="glass-card text-center py-16">
                <p className="text-slate-600 text-lg" style={{ fontFamily: 'var(--font-serif)' }}>No products found in this category.</p>
              </div>
            )}
          </section>
        </div>
        </div>

        <Toast message="Added successfully!" show={showToast} onClose={() => setShowToast(false)} />

        {/* Scroll to Top Button - Only for All category */}
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-24 right-8 z-50 p-4 rounded-full bg-slate-900 text-white shadow-lg hover:bg-slate-800 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} strokeWidth={2} />
          </motion.button>
        )}
      </motion.main>
    </>
  );
}
