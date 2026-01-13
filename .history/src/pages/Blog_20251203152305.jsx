

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import short from "./short.jpg";
import kowa from "./kowa.jpg";
import pexels from './pexels.jpg';
import mikoto from "./mikoto.jpg";
import free from "./free.jpg";
import cess from "./cess.jpg";
import ele from "./ele.jpg"


export default function Blog() {
  const [showJournal, setShowJournal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  // Local journal images (place files in `public/journal/1.jpg` .. `public/journal/6.jpg`)
  const journalImages = [
    short,
    kowa,
    pexels,
    mikoto,
    free,
   cess,
  ];

  return (
    <>
      {/* Main Page – Slow elegant entrance */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen bg-[#fdfcfb]"
      >
        {/* Hero */}
        <section className="pt-16 md:pt-32 pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              style={{
                fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
                letterSpacing: '-0.04em'
              }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-normal text-[#1a1a1a] leading-tight"
            >
              MW WARDROBE
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-6 md:mt-10 text-base md:text-lg lg:text-xl text-[#666666] max-w-3xl mx-auto leading-relaxed px-2"
            >
              A curated edit of beautiful pieces — effortless silhouettes, soft neutrals and modern classics. 
              Shop our full collection and find staples that last.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-8 md:mt-12"
            >
              <Link
                to="/shop"
                className="inline-block bg-black text-white px-8 md:px-14 py-3 md:py-5 rounded-full text-xs md:text-sm tracking-wider font-medium hover:bg-gray-900 transition"
              >
                SHOP THE COLLECTION
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Large + Small Cards */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-4 md:-mt-10 pb-16 md:pb-32">
          <div className="grid md:grid-cols-3 gap-6 md:gap-10 items-start">
            {/* Large Card */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="md:col-span-2 group cursor-pointer overflow-hidden"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&h=1400&fit=crop"
                  alt="Autumn Luxe"
                  className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[700px] object-cover group-hover:scale-105 transition duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-12 text-white">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                    AUTUMN LUXE
                  </h2>
                  <p className="text-sm sm:text-lg md:text-xl mt-2 sm:mt-3 opacity-90">The New Signature Collection</p>
                  <Link
                    to="/shop?category=shirts"
                    className="mt-8 inline-block border border-white px-10 py-4 text-sm tracking-wider hover:bg-white hover:text-black transition"
                  >
                    EXPLORE NOW
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Small Card */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-white border border-[#eaeaea] h-full flex flex-col overflow-hidden group cursor-pointer"
            >
              <img
                src={ele}
                alt="Minimal Elegance"
                className="w-full h-96 object-cover group-hover:scale-110 transition duration-1000"
              />
              <div className="p-10 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-4xl font-normal text-[#1a1a1a]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                    MINIMAL ELEGANCE
                  </h3>
                  <p className="mt-4 text-[#666666]">Clean lines. Bold confidence.</p>
                </div>
                <Link to="/shop?category=accessories" className="mt-8 text-[#1a1a1a] font-medium hover:underline">
                  Discover More →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>

      {/* JOURNAL FULLSCREEN MODAL – Now Fixed + Beautiful */}
      <AnimatePresence>
        {showJournal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowJournal(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Journal Panel */}
            <motion.div
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "-100vh" }}
              transition={{
                type: "spring",
                stiffness: 40,
                damping: 40,
                mass: 3
              }}
              className="fixed inset-0 bg-[#fdfcfb] z-50 overflow-y-auto"
            >
              {/* Close Button – NOW WORKS PERFECTLY */}
              <button
                onClick={() => setShowJournal(false)}
                className="fixed top-4 md:top-8 right-4 md:right-8 z-50 w-12 md:w-14 h-12 md:h-14 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition"
              >
                <X size={24} className="md:w-7 md:h-7" />
              </button>

              <div className="pt-24 md:pt-40 pb-20 md:pb-32 text-center px-4 md:px-6">
                <h1
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight"
                  style={{ fontFamily: '"Cormorant Garamond", serif', color: '#1a1a1a' }}
                >
                  JOURNAL
                </h1>
                <p className="mt-4 md:mt-6 text-sm md:text-lg lg:text-xl text-[#666666]">
                  Style stories, trends & timeless inspiration
                </p>
              </div>

              <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-40 grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 lg:gap-12">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.article
                    key={i}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="bg-white border border-[#eaeaea] overflow-hidden hover:border-gray-300 transition cursor-pointer"
                  >
                    <img
                      src={journalImages[i - 1]}
                      alt={`Journal post ${i}`}
                      className="w-full h-60 sm:h-72 md:h-80 object-cover"
                    />
                    <div className="p-6 md:p-8 lg:p-10">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-normal text-[#1a1a1a]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                        {i === 1 ? "The Art of Quiet Luxury" : i === 2 ? "How to Build a Capsule Wardrobe" : `Seasonal Edit ${i}`}
                      </h3>
                      <p className="mt-3 md:mt-4 text-xs md:text-sm lg:text-base text-[#666666]">Timeless pieces that transcend trends...</p>
                      <button
                        onClick={() => setSelectedPost({
                          id: i,
                          title: i === 1 ? "The Art of Quiet Luxury" : i === 2 ? "How to Build a Capsule Wardrobe" : `Seasonal Edit ${i}`,
                          desc: "Timeless pieces that transcend trends...",
                          image: journalImages[i - 1]
                        })}
                        className="mt-5 md:mt-6 inline-block text-[#1a1a1a] font-medium text-xs md:text-sm hover:underline"
                      >
                        Read Story →
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <button
        onClick={() => setShowJournal(true)}
        className="fixed bottom-10 right-10 bg-black text-white px-10 py-5 rounded-full text-sm tracking-wider font-medium shadow-2xl hover:bg-gray-900 transition z-30"
      >
        OPEN JOURNAL
      </button>

      {/* QUICK VIEW MODAL – Opens when clicking "Read Story" */}
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
              className="fixed inset-x-4 sm:inset-x-6 md:inset-x-auto top-1/2 -translate-y-1/2 max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 md:top-6 right-4 md:right-6 z-10 hover:text-gray-600"
              >
                <X size={24} className="md:w-7 md:h-7" />
              </button>

              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-gray-50 p-6 md:p-12 flex items-center justify-center min-h-60 md:min-h-96">
                  <img
                    src={selectedPost?.image || '/journal/1.jpg'}
                    alt={selectedPost?.title}
                    className="max-h-60 md:max-h-96 object-contain"
                  />
                </div>

                <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                      {selectedPost.title}
                    </h2>

                    <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
                      <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed">
                        {selectedPost.desc} This timeless piece embodies quiet luxury with refined silhouettes and premium fabrication, perfect for the modern minimalist wardrobe.
                      </p>
                    </div>
                  </div>

                  {/* <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
                    <button className="w-full bg-black text-white py-3 md:py-5 rounded-full text-xs md:text-sm tracking-wider font-medium hover:bg-gray-900 transition">
                      CONTINUE READING
                    </button> */}

                    {/* <button
                      onClick={() => setSelectedPost(null)}
                      className="w-full border border-gray-300 text-black py-3 md:py-4 rounded-full text-xs md:text-sm tracking-wider font-medium hover:bg-gray-50 transition"
                    >
                      CLOSE
                    </button> */}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}