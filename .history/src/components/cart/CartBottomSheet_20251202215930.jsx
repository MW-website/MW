/**
 * Bottom-sheet cart that slides up from the bottom.
 */
import React from "react";
import { useCart } from "../../context/CartContext";

export default function CartBottomSheet({ open, onClose }) {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart();

  return (
    <div
      className={`fixed left-0 right-0 bottom-0 z-50 transition-transform duration-300 ${open ? "translate-y-0" : "translate-y-full"}`}
      aria-hidden={!open}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-t-xl shadow-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Your Cart </h3>
            <div className="flex items-center gap-2">
              <button onClick={clearCart} className="text-sm text-gray-600">Clear</button>
              <button onClick={onClose} className="px-3 py-1 bg-gray-100 rounded">Close</button>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="py-12 text-center text-gray-600">Your cart is empty.</div>
          ) : (
            <div className="space-y-4 max-h-[50vh] overflow-y-auto">
              {items.map((it) => (
                <div key={it.id} className="flex items-center gap-3">
                  <img src={it.image} alt={it.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-gray-500">${it.price}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(it.id, Math.max(1, it.quantity - 1))} className="px-2 py-1 border rounded">-</button>
                      <span className="text-sm">{it.quantity}</span>
                      <button onClick={() => updateQuantity(it.id, it.quantity + 1)} className="px-2 py-1 border rounded">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(it.id)} className="text-xl">×</button>
                </div>
              ))}

              <div className="pt-4 border-t flex items-center justify-between">
                <div className="text-sm font-medium">Subtotal</div>
                <div className="text-lg font-semibold">${total.toLocaleString()}</div>
              </div>

              <div className="pt-3">
                <a href="/checkout" className="block text-center px-4 py-3 bg-black text-white rounded">Checkout</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
