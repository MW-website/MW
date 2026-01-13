import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecentlyViewed } from "../../context/RecentlyViewedContext";
import { useAuth } from "../../context/AuthContext";

export default function RecentlyViewed() {
  const { recentlyViewed } = useRecentlyViewed();
  const { isAuthenticated } = useAuth();

  // Don't show if no recently viewed products
  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif" style={{ fontFamily: 'var(--font-serif)' }}>
              {isAuthenticated ? "Your Recently Viewed" : "Recently Viewed"}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {isAuthenticated ? "Items you've browsed" : "Keep exploring your favorites"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recentlyViewed.slice(0, 5).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/product/${product.slug}`}
                className="group block border rounded-xl bg-white hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-xs md:text-sm font-medium line-clamp-1 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500">{product.category}</p>
                  <p className="text-sm md:text-base font-semibold mt-1">
                    ${product.price}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {recentlyViewed.length > 5 && (
          <div className="text-center mt-8">
            <p className="text-sm text-slate-600">
              {recentlyViewed.length - 5} more items in your history
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
