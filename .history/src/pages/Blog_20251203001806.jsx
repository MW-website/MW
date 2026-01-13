import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Headphones, CreditCard, X } from 'lucide-react';

export default function Blog() {
  const [showBlog, setShowBlog] = useState(false);

  return (
    <>
  

      {/* Hero Section - Light Cream */}
      <div className="min-h-screen bg-[#faf7f0] pt-24">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-6xl md:text-8xl font-black text-amber-900 leading-none">
              SHOES COLLECTION<br />2019
            </h1>
            <p className="mt-8 text-amber-800 text-lg max-w-md mx-auto md:mx-0 font-light">
              A small river named Duden flows by their place and supplies it with the necessary regelialia. 
              It is a paradisematic country.
            </p>
            <button className="mt-10 bg-amber-900 text-white px-12 py-5 rounded-full text-lg font-bold hover:bg-amber-800 transition hover:scale-105">
              Discover Now
            </button>
          </div>

          <div className="md:w-1/2 mt-16 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=900&fit=crop"
              alt="Sneakers"
              className="w-full max-w-lg mx-auto drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Features - Cream */}
        <div className="bg-[#f5f0e6] py-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: ShoppingBag, title: "Free Shipping" },
              { icon: Headphones, title: "Support Customer" },
              { icon: CreditCard, title: "Secure Payments" }
            ].map((item, i) => (
              <div key={i} className="text-amber-900">
                <item.icon size={56} className="mx-auto mb-4 text-amber-800" />
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="mt-3 text-amber-700 text-sm">
                  Far far away, behind the word mountains, far from the countries...
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SLOW DROPDOWN BLOG PAGE - Light Cream Theme */}
      <AnimatePresence>
        {showBlog && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBlog(false)}
              className="fixed inset-0 bg-amber-900 z-40"
            />

            {/* Blog Page - Drops VERY slowly */}
            <motion.div
              initial={{ y: -1200 }}
              animate={{ y: 0 }}
              exit={{ y: -1200 }}
              transition={{
                type: "spring",
                stiffness: 40,     // lower = slower & heavier
                damping: 40,       // controls bounce
                mass: 2,           // adds weight → feels luxurious
                duration: 2.2      // total animation time
              }}
              className="fixed top-0 left-0 right-0 bg-[#faf7f0] z-50 overflow-y-auto"
              style={{ minHeight: '100vh' }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowBlog(false)}
                className="fixed top-8 right-8 z-50 bg-white rounded-full p-3 shadow-xl hover:scale-110 transition"
              >
                <X size={32} className="text-amber-900" />
              </button>

              {/* Blog Header */}
              <div className="bg-gradient-to-b from-amber-50 to-[#faf7f0] pt-32 pb-20 text-center">
                <h1 className="text-8xl md:text-9xl font-black text-amber-900">BLOG</h1>
                <p className="mt-6 text-2xl text-amber-800 font-light">Sneaker stories, trends & inspiration</p>
              </div>

              {/* Blog Grid */}
              <div className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid md:grid-cols-3 gap-10">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 80 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition"
                    >
                      <img
                        src={`https://images.unsplash.com/photo-1600585154340-be6161a56a0${i}?ixlib=rb-4.0.3&w=600&h=400&fit=crop`}
                        alt="Blog post"
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-amber-900">Trend Watch 2025 #{i}</h3>
                        <p className="mt-4 text-amber-700 leading-relaxed">
                          The latest colorways and silhouettes taking over the streets this season...
                        </p>
                        <a href="#" className="mt-6 inline-block text-amber-800 font-bold hover:underline">
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