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
  const [wish, setWish] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("joelle_wish_v1")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("joelle_wish_v1", JSON.stringify(wish));
  }, [wish]);

  function toggle(id) {
    setWish((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function remove(id) {
    setWish((prev) => prev.filter((x) => x !== id));
  }

  return <WishContext.Provider value={{ wish, toggle, remove }}>{children}</WishContext.Provider>;
}

export const useWishlist = () => useContext(WishContext);
