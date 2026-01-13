/**
 * @description      : 
 * @author           : fortu
 * @group            : 
 * @created          : 03/12/2025 - 01:26:04
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 03/12/2025
 * - Author          : fortu
 * - Modification    : Hero mobile spacing fix
 **/
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AppleHero() {
  const imageRef = useRef(null);

  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: -50 },
      {
        y: 50,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="container pt-24 pb-12 md:py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <motion.div 
            className="px-4 md:px-0 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              MW / Refined, Minimal, Modern
            </motion.h1>
            
            <motion.p 
              className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              An elevated collection inspired by quiet luxury. Clean silhouettes meet luxurious fabrics with a relentless focus on fit. Discover the new season where craftsmanship meets contemporary design.
            </motion.p>

            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link to="/shop">
                <motion.button
                  className="px-6 py-3.5 bg-black text-white rounded-md text-sm font-medium shadow-lg"
                  whileHover={{ scale: 1.02, y: -2, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Shop the Collection
                </motion.button>
              </Link>
              
              <motion.a
                href="#featured"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 border border-slate-200 rounded-md text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.02, y: -2, borderColor: "#0f172a" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Featured
              </motion.a>
            </motion.div>

            <motion.div 
              className="text-xs text-slate-500 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Free shipping and returns. Sustainable packaging. Support available 7 days a week.
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative px-4 md:px-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="w-full h-[450px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop"
                alt="product"
                className="w-full h-full object-cover"
              />
            </div>

            <motion.div 
              className="mt-6 grid grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div 
                className="h-28 bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=300&auto=format&fit=crop"
                  alt="thumb"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="h-28 bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=300&auto=format&fit=crop"
                  alt="thumb2"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="h-28 bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=300&auto=format&fit=crop"
                  alt="thumb3"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
