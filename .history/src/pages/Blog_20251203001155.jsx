// import React from "react";

// export default function Blog() {
//   return (
//     <main className="container py-12">
//       <header className="text-center mb-8">
//         <h1 className="text-3xl font-[var(--font-serif)]">Blog</h1>
//         <p className="text-sm text-[var(--color-joelle-muted)]">Stories, inspiration and style notes</p>
//       </header>

//       <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <article className="glass-card p-6">
//           <h3 className="font-[var(--font-serif)] text-xl">Example Post</h3>
//           <p className="text-sm text-slate-700 mt-3">A sample blog post. Replace with your posts or link to a CMS.</p>
//         </article>

//         <article className="glass-card p-6">
//           <h3 className="font-[var(--font-serif)] text-xl">Another Post</h3>
//           <p className="text-sm text-slate-700 mt-3">Short excerpt displayed in a clean card.</p>
//         </article>
//       </section>
//     </main>
//   );
// }
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Headphones, CreditCard, X } from 'lucide-react';

function Blog() {
  const [showBlog, setShowBlog] = useState(false);

  return (
    <>
      {/* Navbar */}
      {/* <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-amber-800">SNEAK IMPERIAL</h1>
          <ul className="flex space-x-10 text-gray-700 font-medium">
            <li className="cursor-pointer hover:text-amber-700 transition">Home</li>
            <li className="cursor-pointer hover:text-amber-700 transition">Shop</li>
            <li
              className="cursor-pointer hover:text-amber-700 transition font-semibold"
              onClick={() => setShowBlog(true)}
            >
              Blog
            </li>
            <li className="cursor-pointer hover:text-amber-700 transition">Contact</li>
          </ul>
        </div>
      </nav> */}

      {/* Hero Section */}
      <div className="min-h-screen bg-amber-100 pt-20 flex flex-col">
        <div className="flex-1 max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold text-amber-900 leading-tight">
              SHOES COLLECTION<br />2019
            </h1>
            <p className="mt-6 text-gray-700 text-lg max-w-lg">
              A small river named Duden flows by their place and supplies it with the necessary regelialia. 
              It is a paradisematic country.
            </p>
            <button className="mt-8 bg-amber-900 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-amber-800 transition transform hover:scale-105">
              Discover Now
            </button>
          </div>

          <div className="md:w-1/2 mt-12 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=900&fit=crop"
              alt="Sneakers"
              className="w-full max-w-lg mx-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>

        {/* Features */}
        <div className="bg-amber-900 py-16">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center text-white">
            <div className="flex flex-col items-center">
              <ShoppingBag size={48} className="mb-4" />
              <h3 className="text-xl font-bold">Free Shipping</h3>
              <p className="mt-2 text-amber-200">Far far away, behind the word mountains...</p>
            </div>
            <div className="flex flex-col items-center">
              <Headphones size={48} className="mb-4" />
              <h3 className="text-xl font-bold">Support Customer</h3>
              <p className="mt-2 text-amber-200">Far far away, behind the word mountains...</p>
            </div>
            <div className="flex flex-col items-center">
              <CreditCard size={48} className="mb-4" />
              <h3 className="text-xl font-bold">Secure Payments</h3>
              <p className="mt-2 text-amber-200">Far far away, behind the word mountains...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slow Dropdown Blog Page */}
      <AnimatePresence>
        {showBlog && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBlog(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Blog Page - Drops slowly */}
            <motion.div
              initial={{ y: -800 }}
              animate={{ y: 0 }}
              exit={{ y: -800 }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 30,
                duration: 1.4
              }}
              className="fixed top-0 left-0 right-0 bg-white z-50 shadow-2xl overflow-y-auto"
              style={{ maxHeight: '100vh' }}
            >
              <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
                {/* Blog Header */}
                <div className="bg-amber-900 text-white py-20 text-center relative">
                  <button
                    onClick={() => setShowBlog(false)}
                    className="absolute top-8 right-8 text-white hover:scale-125 transition"
                  >
                    <X size={36} />
                  </button>
                  <h1 className="text-6xl md:text-8xl font-bold">BLOG</h1>
                  <p className="mt-4 text-xl opacity-90">Latest sneaker news & stories</p>
                </div>

                {/* Blog Posts */}
                <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition"
                    >
                      <img
                        src={`https://images.unsplash.com/photo-16${i}2291026-7eec264c27ff?w=600`}
                        alt="Blog post"
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-amber-900">Sneaker Trend {i} of 2025</h3>
                        <p className="mt-3 text-gray-600">Discover the latest styles taking over the streets this season...</p>
                        <a href="#" className="mt-4 inline-block text-amber-700 font-semibold hover:underline">
                          Read More →
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Blog;