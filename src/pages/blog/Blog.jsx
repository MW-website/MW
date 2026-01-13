import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Blog() {
  const [readArticles, setReadArticles] = useState([]);
  const [activeSection, setActiveSection] = useState("hero");

  const sections = [
    { id: "hero", label: "Blog Home" },
    { id: "featured", label: "Featured Post" },
    { id: "latest-articles", label: "Latest Articles" },
    { id: "newsletter", label: "Newsletter" },
    { id: "topics", label: "Explore Topics" }
  ];

  useEffect(() => {
    // Load read articles from localStorage
    const saved = JSON.parse(localStorage.getItem('readArticles') || '[]');
    setReadArticles(saved);

    // Scroll to section if hash is present
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }));

      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const blogPosts = [
    {
      id: 1,
      slug: "timeless-style",
      title: "The Art of Timeless Style",
      category: "Fashion Guide",
      excerpt: "Discover how to build a wardrobe that transcends seasons and trends with pieces that speak to your authentic style.",
      date: "January 2026",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      slug: "sustainable-fashion",
      title: "Sustainable Fashion Choices",
      category: "Sustainability",
      excerpt: "Explore the impact of conscious fashion choices and how MW is committed to ethical practices in every collection.",
      date: "December 2025",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      slug: "capsule-wardrobe",
      title: "Capsule Wardrobe Essentials",
      category: "Style Tips",
      excerpt: "Learn the fundamentals of creating a versatile capsule wardrobe with timeless pieces that work for every occasion.",
      date: "November 2025",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      slug: "behind-the-scenes",
      title: "Behind the Scenes at MW",
      category: "Brand Story",
      excerpt: "A glimpse into the creative process behind our latest collection and the inspiration that drives Nona Sieh's vision.",
      date: "October 2025",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      slug: "dressing-for-confidence",
      title: "Dressing for Confidence",
      category: "Empowerment",
      excerpt: "Fashion is more than fabric. It's about feeling powerful, authentic, and ready to take on the world.",
      date: "September 2025",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      slug: "future-of-fashion",
      title: "The Future of Fashion",
      category: "Trends",
      excerpt: "Insights into emerging trends that align with MW's philosophy of timeless elegance and conscious design.",
      date: "August 2025",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="container pt-24 pb-12 md:py-20 lg:py-28">
        
        {/* Sidebar Navigation - Draggable */}
        <motion.nav 
          className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-50 cursor-move"
          drag
          dragConstraints={{
            top: -(window.innerHeight / 2 - 100),
            left: -32,
            right: window.innerWidth - 282,
            bottom: window.innerHeight / 2 - 100
          }}
          dragElastic={0}
          dragMomentum={false}
        >
          <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl shadow-xl p-4 space-y-2">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Navigation</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                <div className="w-1 h-1 rounded-full bg-slate-300"></div>
              </div>
            </div>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all ${
                  activeSection === section.id
                    ? "bg-black text-white font-medium shadow-md"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </motion.nav>
        
        {/* HERO SECTION */}
        <motion.div
          id="hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 px-4 md:px-0"
        >
          <motion.div 
            className="text-xs md:text-sm text-slate-500 uppercase tracking-widest mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            MW Journal
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Style Stories & Inspiration
          </motion.h1>

          <motion.p 
            className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Curated insights on timeless fashion, conscious style choices, and the philosophy behind MW. 
            Join Nona Sieh as he shares his vision for modern elegance.
          </motion.p>
        </motion.div>

        {/* FEATURED POST */}
        <motion.div
          id="featured"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 px-4 md:px-0"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div 
              className="relative h-[400px] md:h-[560px] rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=800&fit=crop"
                alt="Featured post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <span className="text-xs uppercase tracking-widest">Featured</span>
              </div>
            </motion.div>

            <div>
              <span className="text-xs uppercase tracking-widest text-slate-500">Fashion Guide</span>
              <h2 className="text-3xl md:text-4xl font-serif mt-3 mb-4">The Art of Timeless Style</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                In a world of fast fashion and fleeting trends, we believe in something different. Timeless style 
                is about understanding your personal aesthetic and investing in pieces that resonate with who you are. 
                It's the confidence that comes from wearing something that feels authentically you, season after season.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                At MW, we curate collections that celebrate this philosophy. Each piece is selected for its ability 
                to transcend momentary trends while remaining fresh and relevant. From the cut of a blazer to the 
                drape of a dress, every detail is considered with longevity in mind.
              </p>
              <Link
                to="/blog/timeless-style"
                className="inline-flex items-center text-sm font-medium hover:underline"
              >
                Read Full Article →
              </Link>
            </div>
          </div>
        </motion.div>

        {/* BLOG GRID */}
        <motion.div
          id="latest-articles"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 px-4 md:px-0"
        >
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-serif">Latest Articles</h2>
            <Link 
              to="/blog/articles"
              className="text-sm font-medium hover:underline"
            >
              View All Articles →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="relative h-[350px] rounded-lg overflow-hidden mb-4">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {readArticles.includes(post.slug) && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                        ✓ Read
                      </div>
                    )}
                  </div>
                  
                  <span className="text-xs uppercase tracking-widest text-slate-500">{post.category}</span>
                  <h3 className="text-xl font-serif mt-2 mb-3 group-hover:text-slate-600 transition-colors">{post.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">{post.excerpt}</p>
                  <span className="text-xs text-slate-400">{post.date}</span>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* NEWSLETTER SECTION */}
        <motion.div
          id="newsletter"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 md:p-12 mb-20 mx-4 md:mx-0"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif mb-4">Stay Inspired</h2>
            <p className="text-slate-600 mb-8">
              Subscribe to receive the latest style insights, collection launches, and exclusive content 
              from Nona Sieh directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:border-slate-400"
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-black text-white rounded-md font-medium hover:bg-slate-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>

        {/* CATEGORIES SECTION */}
        <motion.div
          id="topics"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="px-4 md:px-0"
        >
          <h2 className="text-2xl md:text-3xl font-serif text-center mb-10">Explore Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Fashion Guide", count: 6 },
              { name: "Sustainability", count: 6 },
              { name: "Style Tips", count: 6 },
              { name: "Brand Story", count: 3 }
            ].map((category, index) => (
              <Link
                key={index}
                to={`/blog/articles?category=${encodeURIComponent(category.name)}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-md p-6 text-center border border-slate-100 hover:border-slate-300 hover:shadow-lg transition-all cursor-pointer"
                >
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-slate-500">{category.count} articles</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}