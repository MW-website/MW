/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 14:09:43
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
// src/components/cart/CartBox.jsx
import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function CartBox() {
  const { items, updateQuantity, removeItem, total } = useCart();

  return (
    <div className="glass-card p-4 sticky top-24 rounded-xl space-y-4">
      <h2 className="font-semibold text-lg">Your Cart</h2>

      {items.length === 0 && (
        <p className="text-sm text-gray-500">Your cart is empty.</p>
      )}

      {/* Items */}
      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 border-b pb-3"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 object-cover rounded-md"
            />

            <div className="flex-1">
              <div className="font-medium text-sm">{item.name}</div>
              <div className="text-xs text-gray-500">
                ${item.price.toLocaleString()}
              </div>

              {/* Qty */}
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="px-2 py-1 border rounded-md text-xs"
                >
                  -
                </button>

                <span className="text-sm">{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                  className="px-2 py-1 border rounded-md text-xs"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="text-xl leading-none px-2"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Total */}
      {items.length > 0 && (
        <>
          <div className="flex justify-between text-sm font-medium">
            <span>Total:</span>
            <span>${total.toLocaleString()}</span>
          </div>

          <Link
            to="/checkout"
            className="block text-center px-4 py-3 bg-black text-white rounded-md text-sm"
          >
            Go to Checkout
          </Link>
        </>
      )}
    </div>
  );
}
