/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 14:03:40
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
// src/context/WishlistContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const WishContext = createContext();

export function WishlistProvider({ children }) {
  // Clear stale wishlist data on first mount to fix badge counting
  useEffect(() => {
    const migrated = localStorage.getItem("mw_wish_migrated_v2");
    if (!migrated) {
      localStorage.removeItem("mw_wish_v1");
      localStorage.setItem("mw_wish_migrated_v2", "true");
    }
  }, []);

  const [wish, setWish] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mw_wish_v1")) || [];
    } catch {
      return [];
    }
  });

  // Initialize showBadge to false; it shows only after the first add in this session
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    localStorage.setItem("mw_wish_v1", JSON.stringify(wish));
  }, [wish]);

  function toggle(id) {
    setWish((prev) => {
      const newWish = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      // Show badge only when an item is added (wish grows), not when removed
      if (newWish.length > prev.length) {
        setShowBadge(true);
      }
      return newWish;
    });
  }

  function remove(id) {
    setWish((prev) => prev.filter((x) => x !== id));
    // Don't show badge when removing items
  }

  function hideBadge() {
    // Hide the badge (called when wishlist page is opened)
    setShowBadge(false);
  }

  function clearWishlist() {
    // Completely clear the wishlist
    setWish([]);
    setShowBadge(false);
  }

  return <WishContext.Provider value={{ wish, toggle, remove, hideBadge, showBadge, clearWishlist }}>{children}</WishContext.Provider>;
}

export const useWishlist = () => useContext(WishContext);
