/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 16:05:17
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
// src/App.jsx — MW Header everywhere
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header/Header";
import MiniFooter from "./components/home/MiniFooter";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CategoryPage from "./pages/CategoryPage";
import Checkout from "./pages/Checkout";
import ProductPage from "./pages/ProductPage";
import WishlistPage from "./pages/Wishlist";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";

export default function App() {
  function MiniFooterGuard() {
    // useLocation must be called inside a Router — this component is rendered inside BrowserRouter
    const location = useLocation();
    return location.pathname !== "/" ? <MiniFooter /> : null;
  }

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
      </Routes>

      {/* Render a compact mini footer on pages that don't render the full Footer component (Home renders the full Footer) */}
      <MiniFooterGuard />
    </BrowserRouter>
  );
}
