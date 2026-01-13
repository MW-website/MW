import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { mergeGuestData: mergeCart } = useCart();
  const { mergeGuestData: mergeWishlist } = useWishlist();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(email, password);
      
      // Merge guest cart and wishlist with account data
      if (response.user?.cart) {
        mergeCart(response.user.cart);
      }
      if (response.user?.wishlist) {
        mergeWishlist(response.user.wishlist);
      }
      
      showToast("Welcome back!");
      navigate("/");
    } catch (error) {
      showToast(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-mw-beige)]">
      <motion.div 
        className="max-w-md w-full space-y-8 glass-card p-8 md:p-10 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2 className="text-center text-4xl md:text-5xl font-serif tracking-tight mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
            Welcome Back
          </h2>
          <p className="text-center text-sm text-slate-600">
            New to MW?{" "}
            <Link to="/register" className="font-medium text-slate-900 hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all bg-white"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-slate-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all bg-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {loading ? "Signing in..." : "Sign in"}
            </motion.button>
          </div>

          <div className="text-center text-xs text-slate-500 pt-2">
            Demo credentials: admin@mw.com / admin123
          </div>
        </form>
      </motion.div>
    </div>
  );
}
