import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { FiCheckCircle, FiPackage } from "react-icons/fi";

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const guestEmail = searchParams.get("email");
  const { isAuthenticated, register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [showAccountForm, setShowAccountForm] = useState(!isAuthenticated);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      showToast("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await register(guestEmail, formData.password, formData.name);
      showToast("Account created! You can now track your order.");
      setShowAccountForm(false);
      navigate("/orders");
    } catch (error) {
      showToast(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-mw-beige)] py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        <motion.div
          className="glass-card p-8 md:p-12 rounded-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <FiCheckCircle size={40} className="text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
            Order Confirmed!
          </h1>

          <p className="text-slate-600 mb-2">
            Thank you for your purchase
          </p>

          {orderNumber && (
            <div className="inline-block bg-slate-100 px-4 py-2 rounded-lg mb-6">
              <p className="text-xs text-slate-600">Order Number</p>
              <p className="font-mono font-semibold text-slate-900">{orderNumber}</p>
            </div>
          )}

          {guestEmail && (
            <p className="text-sm text-slate-600 mb-8">
              A confirmation email has been sent to <strong>{guestEmail}</strong>
            </p>
          )}

          {/* Account Creation Prompt for Guests */}
          {!isAuthenticated && showAccountForm && guestEmail && (
            <motion.div
              className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-xl text-left"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <FiPackage size={24} className="text-slate-700 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Track Your Order</h3>
                  <p className="text-sm text-slate-600">
                    Create an account to easily track this order and save your preferences for faster future checkouts
                  </p>
                </div>
              </div>

              <form onSubmit={handleCreateAccount} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700">
                    Email (for login)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={guestEmail}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-md bg-slate-100 text-slate-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white"
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700">
                      Confirm
                    </label>
                    <input
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition disabled:opacity-50"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {loading ? "Creating..." : "Create Account"}
                  </motion.button>
                  <button
                    type="button"
                    onClick={() => setShowAccountForm(false)}
                    className="px-6 py-3 border border-slate-300 rounded-md hover:bg-white transition"
                  >
                    Skip
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            {isAuthenticated && (
              <Link
                to="/orders"
                className="px-6 py-3 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition"
              >
                View Order History
              </Link>
            )}
            <Link
              to="/shop"
              className="px-6 py-3 border border-slate-300 rounded-md hover:bg-white transition"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
