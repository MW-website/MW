/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 03/12/2025 - 01:03:42
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const collections = [
  { id: 1, title: "New Arrivals", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "Shirts", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "Dresses", image: "https://images.unsplash.com/photo-1467043237213-65f2da53396f?q=80&w=800&auto=format&fit=crop" },
  { id: 4, title: "Accessories", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export default function Collections() {
  return (
    <section className="container py-16 md:py-24 gsap-reveal">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl md:text-3xl font-serif tracking-tight mb-2">Shop by Collection</h3>
        <p className="text-slate-600 text-sm">Curated selections for every style</p>
      </motion.div>

      <motion.div 
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {collections.map((c) => (
          <motion.div key={c.id} variants={itemVariants}>
            <Link to={`/shop?category=${encodeURIComponent(c.title)}`} className="group block">
              <motion.div 
                className="rounded-2xl overflow-hidden shadow-lg bg-white"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-72 overflow-hidden">
                  <motion.img 
                    src={c.image} 
                    alt={c.title} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <div className="p-5">
                  <div className="text-base font-medium group-hover:text-slate-900 transition-colors">{c.title}</div>
                  <motion.div 
                    className="text-xs text-slate-500 mt-1"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    Explore →
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
