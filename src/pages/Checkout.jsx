/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 03/12/2025 - 13:23:45
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { ordersApi } from "../services/api";

export default function Checkout() {
  const { items, total, updateQuantity, removeItem } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (items.length === 0) {
      showToast("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      // Prepare items for API
      const orderItems = items.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }));

      // Create Stripe checkout session
      const { url } = await ordersApi.createCheckoutSession(orderItems, formData);

      // Redirect to Stripe checkout
      window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
      showToast(error.message || "Checkout failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="container py-10 grid lg:grid-cols-2 gap-10">
      
      {/* LEFT: Checkout Form */}
      <div className="glass-card p-6 rounded-xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Shipping Information</h2>
          {isAuthenticated && (
            <span className="text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full">
              ✓ Auto-save for next time
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm block mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-white"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-white"
            />
            {isAuthenticated && (
              <p className="text-xs text-slate-500 mt-1">
                📧 Order confirmations will be sent to this email
              </p>
            )}
          </div>

          <div>
            <label className="text-sm block mb-1">Street Address</label>
            <input
              type="text"
              name="street"
              required
              value={formData.street}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm block mb-1">City</label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-white"
              />
            </div>
            <div>
              <label className="text-sm block mb-1">State</label>
              <input
                type="text"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm block mb-1">ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                required
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-white"
              />
            </div>
            <div>
              <label className="text-sm block mb-1">Country</label>
              <input
                type="text"
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || items.length === 0}
            className="px-4 py-3 bg-black text-white rounded-md w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </form>
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
              <div className="text-xs text-gray-500">${item.price.toLocaleString()}</div>

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
            Total: ${total.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}
