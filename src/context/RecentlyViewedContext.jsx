// src/context/RecentlyViewedContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const RecentlyViewedContext = createContext();

export function RecentlyViewedProvider({ children }) {
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mw_recently_viewed")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("mw_recently_viewed", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  function addProduct(product) {
    setRecentlyViewed((prev) => {
      // Remove if already exists
      const filtered = prev.filter((p) => p.id !== product.id);
      // Add to front, limit to 10 items
      return [product, ...filtered].slice(0, 10);
    });
  }

  function clearHistory() {
    setRecentlyViewed([]);
  }

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addProduct, clearHistory }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export const useRecentlyViewed = () => useContext(RecentlyViewedContext);
