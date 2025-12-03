/**
 * @description      : Category-specific page showing only products from selected category
 * @author           : fortu
 * @created          : 02/12/2025
 * 
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 02/12/2025
 * - Modification    : Single category page with clean layout
 */

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryDropdown from "../components/shop/CategoryDropdown";
import ProductCard from "../components/shop/ProductCard";
import { fetchProductsByCategory } from "../services/productApi";

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("default");

  // Capitalize category name
  const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : "Products";

  // Fetch products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProductsByCategory(categoryName);
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
  }, [categoryName]);

  // Sorting logic
  const sorted = useMemo(() => {
    let data = [...products];

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
  }, [products, sort]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading {categoryName}...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-800 text-white uppercase text-xs font-semibold rounded hover:bg-gray-700 transition"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="mb-8 border-b pb-6">
          {/* Back button hidden on mobile (dropdown used instead) */}
          <button
            onClick={() => navigate(-1)}
            className="hidden lg:inline-block text-sm text-gray-600 hover:text-black mb-4 transition"
          >
            ← Back
          </button>

          {/* Category dropdown for mobile (and small screens) */}
          <div className="lg:hidden mb-4">
            {/** categories are a small curated set to navigate between category pages **/}
            <CategoryDropdown
              categories={["All", "Dresses", "Bags", "Skirts", "Tops", "Shirts", "Accessories"]}
              active={categoryName}
              onSelect={(cat) => {
                if (!cat) return;
                if (cat === "All") {
                  navigate("/shop");
                } else {
                  navigate(`/category/${String(cat).toLowerCase()}`);
                }
              }}
            />
          </div>

          <h1 className="text-4xl luxury text-gray-900 mb-2 uppercase">
            {categoryName}
          </h1>
          <p className="text-gray-600">{sorted.length} products available</p>
        </div>

        {/* SORT BAR */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 font-medium">Sort by:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="az">A → Z</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-6">No products found in this category.</p>
            <button
              onClick={() => navigate("/shop")}
              className="px-4 py-2 bg-gray-800 text-white uppercase text-xs font-semibold rounded hover:bg-gray-700 transition"
            >
              Browse All Products
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
