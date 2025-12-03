import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Headphones, CreditCard, X } from 'lucide-react';

export default function Blog() {
  const [showBlog, setShowBlog] = useState(false);

  return (
    <>
    
      {/* Hero + 2 Cards Section */}
      <div className="min-h-screen bg-[#faf7f0] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Hero Text */}
          <div className="text-center mb-20">
            <h1 className="text-7xl md:text-9xl font-black text-amber-900 leading-none">
              
            </h1>
            <p className="mt-8 text-xl text-amber-800 font-light max-w-2xl mx-auto">
              Timeless elegance meets modern sophistication. Curated for the woman who defines luxury.
            </p>
            <button className="mt-10 bg-amber-900 text-white px-14 py-5 rounded-full text-lg font-bold hover:bg-amber-800 transition hover:scale-105">
              Shop The Collection
            </button>
          </div>

          {/* Two Cards: 1 Big + 1 Small */}
          <div className="grid md:grid-cols-3 gap-10 items-start">
            {/* BIG Featured Card (spans 2 columns) */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="md:col-span-2 bg-white rounded-3xl shadow-2xl overflow-hidden group cursor-pointer"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&h=800&fit=crop"
                  alt="Featured women's wear"
                  className="w-full h-96 md:h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-10 left-10 text-white">
                  <h2 className="text-5xl font-black">AUTUMN LUXE</h2>
                  <p className="text-xl mt-2 font-light">The New Signature Collection</p>
                  <button className="mt-6 bg-white text-amber-900 px-8 py-3 rounded-full font-bold hover:bg-amber-100 transition">
                    Explore Now
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Small Card */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-amber-50 rounded-3xl shadow-xl overflow-hidden group cursor-pointer h-full flex flex-col"
            >
              <img
                src="https://images.unsplash.com/photo-1595777457583-4d1c2e9e2f61?w=600&h=700&fit=crop"
                alt="Minimal elegance"
                className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="p-8 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-3xl font-bold text-amber-900">MINIMAL ELEGANCE</h3>
                  <p className="mt-4 text-amber-700">Clean lines. Bold confidence.</p>
                </div>
                <a href="#" className="mt-8 text-amber-800 font-bold hover:underline inline-flex items-center">
                  Discover More →
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features - Cream */}
        <div className="bg-[#f5f0e6] py-20 mt-32">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: ShoppingBag, title: "Free Express Shipping" },
              { icon: Headphones, title: "Personal Stylist Support" },
              { icon: CreditCard, title: "Secure & Discreet Payment" }
            ].map((item, i) => (
              <div key={i} className="text-amber-900">
                <item.icon size={56} className="mx-auto mb-4 text-amber-800" />
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="mt-3 text-amber-700 text-sm">Worldwide delivery within 3–5 days</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SLOW DROPDOWN BLOG - Women's Fashion Blog */}
      <AnimatePresence>
        {showBlog && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBlog(false)}
              className="fixed inset-0 bg-amber-900 z-40"
            />

            <motion.div
              initial={{ y: -1400 }}
              animate={{ y: 0 }}
              exit={{ y: -1400 }}
              transition={{
                type: "spring",
                stiffness: 35,
                damping: 40,
                mass: 2.5,
                duration: 2.5
              }}
              className="fixed top-0 left-0 right-0 bg-[#faf7f0] z-50 overflow-y-auto min-h-screen"
            >
              <button
                onClick={() => setShowBlog(false)}
                className="fixed top-8 right-8 z-50 bg-white rounded-full p-3 shadow-2xl hover:scale-110 transition"
              >
                <X size={36} className="text-amber-900" />
              </button>

              <div className="pt-40 pb-24 text-center">
                <h1 className="text-9xl font-black text-amber-900">JOURNAL</h1>
                <p className="mt-6 text-2xl text-amber-800 font-light">Style stories, trends & timeless inspiration</p>
              </div>

              <div className="max-w-7xl mx-auto px-6 pb-32 grid md:grid-cols-3 gap-12">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-15${i}05774583-5a5e2f0c5d2e?w=600&h=800&fit=crop&auto=format`}
                      alt="Fashion blog"
                      className="w-full h-80 object-cover"
                    />
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-amber-900">How to Style Silk This Season</h3>
                      <p className="mt-4 text-amber-700">Elevate your wardrobe with effortless luxury...</p>
                      <a href="#" className="mt-6 inline-block text-amber-800 font-bold hover:underline">
                        Read Story →
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}