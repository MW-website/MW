import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";

export default function BlogArticles() {
  const [readArticles, setReadArticles] = useState([]);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  useEffect(() => {
    // Load read articles from localStorage
    const saved = JSON.parse(localStorage.getItem('readArticles') || '[]');
    setReadArticles(saved);
  }, []);

  const allArticles = [
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
    },
    {
      id: 7,
      slug: "color-psychology",
      title: "The Psychology of Color in Fashion",
      category: "Fashion Guide",
      excerpt: "Understanding how color influences mood and perception, and how to use it to express your personality.",
      date: "July 2025",
      image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&h=1000&fit=crop"
    },
    {
      id: 8,
      slug: "investment-pieces",
      title: "Investment Pieces Worth the Splurge",
      category: "Style Tips",
      excerpt: "Identifying which fashion items are worth the investment and will serve you for years to come.",
      date: "June 2025",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop"
    },
    {
      id: 9,
      slug: "seasonal-transitions",
      title: "Mastering Seasonal Transitions",
      category: "Style Tips",
      excerpt: "Learn to style your wardrobe through changing seasons with layering techniques and versatile pieces.",
      date: "May 2025",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=1000&fit=crop"
    },
    {
      id: 10,
      slug: "fabric-guide",
      title: "Understanding Luxury Fabrics",
      category: "Fashion Guide",
      excerpt: "A comprehensive guide to fabric quality and how different materials affect the look and feel of your clothes.",
      date: "April 2025",
      image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=1000&fit=crop"
    },
    {
      id: 11,
      slug: "ethical-production",
      title: "The True Cost of Fashion",
      category: "Sustainability",
      excerpt: "Understanding the environmental and social impact of fashion and how conscious choices make a difference.",
      date: "March 2025",
      image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&h=1000&fit=crop"
    },
    {
      id: 12,
      slug: "minimalist-wardrobe",
      title: "The Art of Minimalist Dressing",
      category: "Style Tips",
      excerpt: "Creating freedom through a carefully curated wardrobe that focuses on quality over quantity.",
      date: "February 2025",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=1000&fit=crop"
    },
    {
      id: 13,
      slug: "brand-values",
      title: "Building a Brand with Purpose",
      category: "Brand Story",
      excerpt: "The story behind MW's commitment to ethical fashion and creating meaningful change in the industry.",
      date: "January 2025",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea672c11?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 14,
      slug: "wardrobe-care",
      title: "Making Your Wardrobe Last",
      category: "Style Tips",
      excerpt: "Proper care techniques that extend the life of your clothes and keep them looking beautiful for years.",
      date: "December 2024",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 15,
      slug: "conscious-shopping",
      title: "The Conscious Shopping Guide",
      category: "Sustainability",
      excerpt: "Practical tips for shopping more intentionally and building a wardrobe that aligns with your values.",
      date: "November 2024",
      image: "https://images.unsplash.com/photo-1472746739893-c6ebf0bf8945?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 16,
      slug: "personal-styling",
      title: "Finding Your Personal Style",
      category: "Style Tips",
      excerpt: "A journey to discovering your authentic style and creating a wardrobe that truly reflects who you are.",
      date: "October 2024",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 17,
      slug: "textile-innovation",
      title: "Innovative Sustainable Textiles",
      category: "Sustainability",
      excerpt: "Exploring cutting-edge sustainable materials that are revolutionizing the fashion industry.",
      date: "September 2024",
      image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 18,
      slug: "fashion-history",
      title: "Timeless Styles Through History",
      category: "Fashion Guide",
      excerpt: "Understanding fashion history to recognize truly timeless pieces and appreciate cyclical trends.",
      date: "August 2024",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 19,
      slug: "mw-journey",
      title: "The MW Story: Five Years Later",
      category: "Brand Story",
      excerpt: "Reflecting on five years of growth, challenges, and staying true to our values in the fashion industry.",
      date: "July 2024",
      image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 20,
      slug: "body-positivity",
      title: "Fashion for Every Body",
      category: "Empowerment",
      excerpt: "Celebrating diverse bodies and ensuring everyone has access to beautiful, well-fitting clothing.",
      date: "June 2024",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 21,
      slug: "eco-packaging",
      title: "Sustainable Packaging Matters",
      category: "Sustainability",
      excerpt: "How MW reimagined packaging to reduce waste while creating a beautiful unboxing experience.",
      date: "May 2024",
      image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Filter articles by category if specified
  const filteredArticles = categoryFilter 
    ? allArticles.filter(article => article.category === categoryFilter)
    : allArticles;

  const categories = [
    { name: "Fashion Guide", count: allArticles.filter(a => a.category === "Fashion Guide").length },
    { name: "Sustainability", count: allArticles.filter(a => a.category === "Sustainability").length },
    { name: "Style Tips", count: allArticles.filter(a => a.category === "Style Tips").length },
    { name: "Brand Story", count: allArticles.filter(a => a.category === "Brand Story").length },
    { name: "Empowerment", count: allArticles.filter(a => a.category === "Empowerment").length },
    { name: "Trends", count: allArticles.filter(a => a.category === "Trends").length }
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="container pt-24 pb-12 md:py-20 lg:py-28">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 px-4 md:px-0"
        >
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-black transition-colors mb-8"
          >
            ← Back to Blog Home
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-6">
            {categoryFilter ? `${categoryFilter}` : 'All Articles'}
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl">
            {categoryFilter 
              ? `Explore our ${categoryFilter.toLowerCase()} articles and insights.`
              : 'Explore our complete collection of fashion insights, style guides, and stories from the world of MW.'
            }
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 px-4 md:px-0"
        >
          <div className="flex flex-wrap gap-3">
            <Link
              to="/blog/articles"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !categoryFilter 
                  ? 'bg-black text-white' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Articles ({allArticles.length})
            </Link>
            {categories.map((cat, index) => (
              <Link
                key={index}
                to={`/blog/articles?category=${encodeURIComponent(cat.name)}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  categoryFilter === cat.name
                    ? 'bg-black text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.name} ({cat.count})
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group"
            >
              <Link to={`/blog/${article.slug}`}>
                <div className="relative h-[350px] rounded-lg overflow-hidden mb-4">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {readArticles.includes(article.slug) && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                      ✓ Read
                    </div>
                  )}
                </div>
                
                <span className="text-xs uppercase tracking-widest text-slate-500">{article.category}</span>
                <h3 className="text-xl font-serif mt-2 mb-3 group-hover:text-slate-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">{article.excerpt}</p>
                <span className="text-xs text-slate-400">{article.date}</span>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 md:p-12 mx-4 md:mx-0"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif mb-4">Never Miss an Update</h2>
            <p className="text-slate-600 mb-8">
              Get the latest articles, style tips, and exclusive content delivered to your inbox.
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

      </div>
    </section>
  );
}
