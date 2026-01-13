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
import Splash from "./components/Splash";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CategoryPage from "./pages/CategoryPage";
import Checkout from "./pages/Checkout";
import ProductPage from "./pages/ProductPage";
import WishlistPage from "./pages/Wishlist";
import About from "./pages/About";
import Blog from "./pages/blog/Blog";
import BlogArticles from "./pages/blog/BlogArticles";
import BlogPost from "./pages/blog/BlogPost";
import Contact from "./pages/Contact";
import FAQ from "./pages/Faq";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderHistory from "./pages/OrderHistory";
import OrderSuccess from "./pages/OrderSuccess";
import AdminDashboard from "./pages/AdminDashboard";

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

export default function App() {
  const [showSplash, setShowSplash] = React.useState(true);
  const location = window.location;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      // If at root or blank (no hash/path), ensure we land on homepage
      if (location.pathname === "" || location.pathname === "/" || location.pathname === "/index.html") {
        window.history.replaceState({}, '', '/');
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  function MiniFooterGuard() {
    const loc = useLocation();
    return loc.pathname !== "/" ? <MiniFooter /> : null;
  }

  if (showSplash) {
    return <Splash />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/articles" element={<BlogArticles />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <MiniFooterGuard />
    </BrowserRouter>
  );
}
