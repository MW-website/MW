import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Featured() {
  const featuredArticle = {
    slug: "timeless-style",
    title: "The Art of Timeless Style",
    category: "Fashion Guide",
    description: "In a world of fast fashion and fleeting trends, we believe in something different. Timeless style is about understanding your personal aesthetic and investing in pieces that resonate with who you are. Discover how to build a wardrobe that transcends seasons and trends with pieces that speak to your authentic style.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    author: "Nona Sieh",
    date: "January 2026"
  };

  return (
    <section id="featured" className="relative w-full overflow-hidden bg-gradient-to-b from-white to-slate-50 py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-xs md:text-sm text-slate-500 uppercase tracking-widest mb-3 block">
            Featured Article
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight">
            Style Inspiration
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center px-4 md:px-0"
        >
          {/* Image */}
          <Link to={`/blog/${featuredArticle.slug}`} className="group">
            <motion.div 
              className="relative h-[400px] md:h-[560px] rounded-xl overflow-hidden shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-black text-xs font-medium px-4 py-2 rounded-full shadow-lg">
                Featured
              </div>
              <div className="absolute bottom-6 left-6 text-white">
                <span className="text-xs uppercase tracking-widest block mb-2">{featuredArticle.category}</span>
                <h3 className="text-2xl md:text-3xl font-serif">
                  {featuredArticle.title}
                </h3>
              </div>
            </motion.div>
          </Link>

          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <span className="text-xs uppercase tracking-widest text-slate-500">
                {featuredArticle.category} • {featuredArticle.date}
              </span>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif mt-3 mb-5">
                {featuredArticle.title}
              </h3>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-6">
                {featuredArticle.description}
              </p>
              <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
                <span>By {featuredArticle.author}</span>
                <span>•</span>
                <span>5 min read</span>
              </div>
              <div className="flex gap-3">
                <Link
                  to={`/blog/${featuredArticle.slug}`}
                  className="px-6 py-3 bg-black text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl"
                >
                  Read Article
                </Link>
                <Link
                  to="/blog#latest-articles"
                  className="px-6 py-3 border border-slate-200 rounded-md text-sm hover:bg-slate-50 transition-colors"
                >
                  More Articles
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Additional Featured Items */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0"
        >
          {[
            {
              slug: "sustainable-fashion",
              title: "Sustainable Choices",
              category: "Sustainability",
              image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80"
            },
            {
              slug: "capsule-wardrobe",
              title: "Capsule Essentials",
              category: "Style Tips",
              image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
            },
            {
              slug: "dressing-for-confidence",
              title: "Dressing for Confidence",
              category: "Empowerment",
              image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
            }
          ].map((item, index) => (
            <Link 
              key={item.slug}
              to={`/blog/${item.slug}`}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                className="relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-xs uppercase tracking-widest block mb-1 opacity-90">
                    {item.category}
                  </span>
                  <h4 className="text-lg font-serif">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
