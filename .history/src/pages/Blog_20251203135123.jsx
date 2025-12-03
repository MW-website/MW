import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const [showJournal, setShowJournal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const journalPosts = [
    { id: 1, title: "The Art of Quiet Luxury", desc: "How less became the ultimate statement in 2025.", price: "$280", onSale: true },
    { id: 2, title: "Building a Capsule Wardrobe", desc: "10 timeless pieces that work for every season.", price: "$320", onSale: false },
    { id: 3, title: "The Return of Minimalism", desc: "Why clean lines and neutral tones dominate this year.", price: "$195", onSale: true },
    { id: 4, title: "Silk Season", desc: "How to wear silk from day to night effortlessly.", price: "$450", onSale: false },
    { id: 5, title: "The New Neutrals", desc: "Beige, ivory, and camel — the colors redefining elegance.", price: "$380", onSale: true },
    { id: 6, title: "Layering Masterclass", desc: "Elevate your look with intentional, luxurious layers.", price: "$290", onSale: false },
  ];

  return (
    <>
      {/* Your main page content (unchanged) */}
      {/* ... hero, cards, etc ... */}

      {/* JOURNAL MODAL */}
      <AnimatePresence>
        {showJournal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowJournal(false)}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.div
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "-100vh" }}
              transition={{ type: "spring", stiffness: 40, damping: 40, mass: 3 }}
              className="fixed inset-0 bg-[#fdfcfb] z-50 overflow-y-auto"
            >
              <button
                onClick={() => setShowJournal(false)}
                className="fixed top-8 right-8 z-50 w-14 h-14 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition"
              >
                <X size={28} />
              </button>

              <div className="pt-40 pb-32 text-center px-6">
                <h1 className="text-8xl md:text-9xl font-normal tracking-tight" style={{ fontFamily: '"Cormorant Garamond", serif', color: '#1a1a1a' }}>
                  JOURNAL
                </h1>
                <p className="mt-6 text-xl text-[#666666]">Style stories, trends & timeless inspiration</p>
              </div>

              <div className="max-w-7xl mx-auto px-6 pb-40 grid md:grid-cols-3 gap-12">
                {journalPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="bg-white border border-[#eaeaea] overflow-hidden hover:border-gray-300 transition cursor-pointer group"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={`https://images.unsplash.com/photo-15${post.id}05774583-5a5e2f0c5d2e?w=800&h=1000&fit=crop`}
                        alt={post.title}
                        className="w-full h-80 object-cover group-hover:scale-105 transition duration-700"
                      />
                    </div>
                    <div className="p-10">
                      <h3 className="text-2xl font-normal text-[#1a1a1a]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                        {post.title}
                      </h3>
                      <p className="mt-4 text-[#666666] line-clamp-2">{post.desc}</p>
                      <button className="mt-6 text-[#1a1a1a] font-medium hover:underline">
                        Read Story →
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* QUICK VIEW MODAL – Exactly like your screenshot */}
      <AnimatePresence>
        {selectedPost && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 bg-black z-50"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl z-50 overflow-hidden md:inset-x-auto"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 text-gray-500 hover:text-black z-10"
              >
                <X size={28} />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Left - Image */}
                <div className="bg-gray-50 p-12 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1621072158975-93f3e6c47f7f?w=800&h=1000&fit=crop"
                    alt={selectedPost.title}
                    className="max-h-96 object-contain"
                  />
                </div>

                {/* Right - Details */}
                <div className="p-10 md:p-12">
                  <h2 className="text-3xl font-normal" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                    {selectedPost.title}
                  </h2>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">
                      {selectedPost.desc} This piece embodies quiet luxury with its refined silhouette and premium fabrication. Perfect for the modern minimalist.
                    </p>
                  </div>

                  <div className="mt-8">
                    <div className="text-4xl font-light">{selectedPost.price}</div>
                    {selectedPost.onSale && (
                      <span className="ml-3 text-red-600 text-sm font-medium">ON SALE</span>
                    )}
                  </div>

                  <div className="mt-6 flex items-center gap-2">
                    <div className="flex text-yellow-500">
                      {[...Array(4)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                      <Star size={18} className="text-gray-300" />
                    </div>
                    <span className="text-sm text-gray-600">(90 reviews)</span>
                  </div>

                  <div className="mt-10">
                    <p className="text-sm uppercase tracking-wider text-gray-500 mb-3">Colors</p>
                    <div className="flex gap-3">
                      <button className="w-10 h-10 rounded-full border-2 border-gray-300 bg-beige-200" />
                      <button className="w-10 h-10 rounded-full border-2 border-black bg-black" />
                      <button className="w-10 h-10 rounded-full border-2 border-gray-300 bg-white" />
                    </div>
                  </div>

                  <button className="mt-10 w-full bg-black text-white py-5 rounded-full text-sm tracking-wider font-medium hover:bg-gray-900 transition">
                    ADD TO BAG
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Trigger */}
      <button
        onClick={() => setShowJournal(true)}
        className="fixed bottom      onClick={() => setShowJournal(true)}
        className="fixed bottom-10 right-10 bg-black text-white px-10 py-5 rounded-full text-sm tracking-wider font-medium shadow-2xl hover:bg-gray-900 transition z-30"
      >
        OPEN JOURNAL
      </button>
    </>
  );
}