/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 14:03:18
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mw_cart_v1")) || [];
    } catch {
      return [];
    }
  });

  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    localStorage.setItem("mw_cart_v1", JSON.stringify(items));
  }, [items]);

  function addItem(product, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      const newItems = existing
        ? prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + qty } : i))
        : [...prev, { ...product, quantity: qty }];
      // Show badge when an item is added
      setShowBadge(true);
      return newItems;
    });
  }

  function removeItem(productId) {
    setItems((prev) => prev.filter((i) => i.id !== productId));
    // Don't show badge when removing items
  }

  function updateQuantity(productId, quantity) {
    setItems((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, quantity } : i))
    );
  }

  function clearCart() {
    setItems([]);
  }

  function hideBadge() {
    // Hide the badge (called when cart modal is opened)
    setShowBadge(false);
  }

  const total = items.reduce((s, i) => s + (i.price || 0) * (i.quantity || 0), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, hideBadge, showBadge, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
