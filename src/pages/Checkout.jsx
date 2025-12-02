// src/pages/Checkout.jsx
import React from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { items, total, updateQuantity, removeItem } = useCart();

  return (
    <div className="container py-10 grid lg:grid-cols-2 gap-10">
      
      {/* LEFT: Checkout Form */}
      <div className="glass-card p-6 rounded-xl space-y-6">
        <h2 className="text-lg font-semibold">Checkout</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm block mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-white"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md bg-white"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Address</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md bg-white h-28"
            ></textarea>
          </div>

          <button className="px-4 py-3 bg-black text-white rounded-md w-full mt-4">
            Place Order
          </button>
        </div>
      </div>

      {/* RIGHT: Order Summary */}
      <div className="glass-card p-6 rounded-xl space-y-6">
        <h2 className="text-lg font-semibold">Order Summary</h2>

        {items.length === 0 && (
          <p className="text-sm text-gray-500">Your cart is empty.</p>
        )}

        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 border-b pb-3">
            <img
              src={item.image}
              className="w-16 h-16 object-cover rounded-md"
            />

            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-gray-500">₦{item.price.toLocaleString()}</div>

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

        {items.length > 0 && (
          <div className="pt-4 text-right font-medium">
            Total: ₦{total.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}
