import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const blogPostsData = {
  "timeless-style": {
    id: 1,
    title: "The Art of Timeless Style",
    category: "Fashion Guide",
    date: "January 2026",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=800&fit=crop",
    content: [
      "In a world of fast fashion and fleeting trends, we believe in something different. Timeless style is about understanding your personal aesthetic and investing in pieces that resonate with who you are. It's the confidence that comes from wearing something that feels authentically you, season after season.",
      "At MW, we curate collections that celebrate this philosophy. Each piece is selected for its ability to transcend momentary trends while remaining fresh and relevant. From the cut of a blazer to the drape of a dress, every detail is considered with longevity in mind.",
      "Building a timeless wardrobe starts with understanding quality. Look for natural fabrics like wool, silk, and cotton that age beautifully. Pay attention to construction. Well-made garments with clean lines and classic silhouettes will serve you for years, adapting to different styling approaches as your life evolves.",
      "Color plays a crucial role in timelessness. While we encourage personal expression, a foundation of neutrals provides endless versatility. Think rich blacks, soft whites, warm camels, and deep navy. These shades work harmoniously together and provide the perfect canvas for statement pieces when you want to add personality.",
      "The most important element of timeless style is authenticity. Wear what makes you feel confident and comfortable. Fashion should enhance your life, not complicate it. When you invest in pieces that align with your values and lifestyle, getting dressed becomes effortless and joyful."
    ]
  },
  "sustainable-fashion": {
    id: 2,
    title: "Sustainable Fashion Choices",
    category: "Sustainability",
    date: "December 2025",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=800&fit=crop",
    content: [
      "Sustainable fashion is more than a trend. It's a commitment to creating a better future for our planet and everyone who inhabits it. At MW, we believe that beautiful clothing and ethical practices can coexist, and we're dedicated to making conscious choices at every step of our process.",
      "Our sustainability journey begins with material selection. We prioritize natural, organic, and recycled fabrics from suppliers who share our environmental values. Each material is chosen not just for its aesthetic appeal, but for its minimal ecological footprint and ability to biodegrade naturally.",
      "Transparency is essential to sustainable fashion. We partner with manufacturers who provide fair wages, safe working conditions, and respect for workers' rights. Every garment in our collection is traceable to its source, ensuring accountability throughout the supply chain.",
      "Slow fashion principles guide our design philosophy. Rather than churning out seasonal collections destined for landfills, we create pieces built to last. Quality craftsmanship means our garments can be worn, loved, and passed down rather than discarded after a single season.",
      "As consumers, your choices matter. By investing in fewer, better pieces, you're voting for a fashion industry that values people and planet over profit. Together, we can reshape the industry and create a more sustainable future, one thoughtful purchase at a time."
    ]
  },
  "capsule-wardrobe": {
    id: 3,
    title: "Capsule Wardrobe Essentials",
    category: "Style Tips",
    date: "November 2025",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=800&fit=crop",
    content: [
      "A capsule wardrobe is a carefully curated collection of essential pieces that work harmoniously together. The concept is simple: invest in versatile, high-quality items that can be mixed and matched to create countless outfits, eliminating decision fatigue and closet clutter.",
      "Start with the basics. A well-fitting white shirt, tailored black trousers, a quality blazer, and a little black dress form the foundation. These classics never go out of style and provide the perfect base for building outfits for any occasion.",
      "Quality over quantity is the capsule wardrobe mantra. Instead of filling your closet with trendy pieces that will be outdated next season, invest in fewer items made from superior materials with excellent construction. These pieces will look better, last longer, and ultimately save you money.",
      "Color coordination is key to maximizing your capsule wardrobe's potential. Stick to a cohesive color palette of three to five colors that complement each other. This ensures that any top can be paired with any bottom, multiplying your outfit options exponentially.",
      "Don't forget accessories. A few well-chosen pieces like a quality leather bag, classic watch, and simple jewelry can transform basic outfits into polished looks. Accessories are where you can inject personality while maintaining versatility."
    ]
  },
  "behind-the-scenes": {
    id: 4,
    title: "Behind the Scenes at MW",
    category: "Brand Story",
    date: "October 2025",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=800&fit=crop",
    content: [
      "Creating a collection at MW is a journey that begins months before pieces arrive in your wardrobe. It's a process rooted in research, inspiration, and an unwavering commitment to quality. Today, I'm pulling back the curtain to share what goes into bringing our vision to life.",
      "Every collection starts with inspiration. We study art, architecture, nature, and the lives of the people we design for. What are their needs? How do they move through their days? What makes them feel confident and beautiful? These questions guide every design decision we make.",
      "The design phase involves countless sketches, fabric swatches, and prototypes. We work closely with pattern makers and sample makers to ensure each piece fits perfectly and flatters real bodies. A single design might go through five or six iterations before we're satisfied.",
      "Material sourcing is perhaps the most critical step. I personally visit mills and meet with suppliers to select fabrics that meet our standards for quality, sustainability, and feel. The right fabric can elevate a simple silhouette into something extraordinary.",
      "Quality control is meticulous. Every garment is inspected multiple times before it leaves our facilities. We check stitching, seams, buttons, and finishes to ensure each piece meets MW standards. When you receive an MW garment, you can trust it represents our best work."
    ]
  },
  "dressing-for-confidence": {
    id: 5,
    title: "Dressing for Confidence",
    category: "Empowerment",
    date: "September 2025",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=800&fit=crop",
    content: [
      "Fashion is powerful. What we wear affects how we feel, how we carry ourselves, and how we show up in the world. At MW, we believe clothing should be a tool for empowerment, helping you express your authentic self and face every day with confidence.",
      "Confidence starts with fit. Clothes that fit well make you look polished and feel comfortable, allowing you to focus on what matters rather than adjusting and fidgeting. Don't be afraid to have pieces tailored. A small investment in alterations can transform how a garment feels on your body.",
      "Understanding your personal style is liberating. Take time to identify what makes you feel most like yourself. Are you drawn to structured pieces or flowing silhouettes? Bold colors or soft neutrals? There's no right answer. The goal is to build a wardrobe that reflects who you are.",
      "Dress for the life you have, not the life you wish you had. If you work from home, invest in elevated comfortable pieces that make you feel put together during video calls. If you're on your feet all day, prioritize beautiful shoes that support your body. Practical can be stylish.",
      "The most confident people aren't necessarily those wearing the trendiest pieces. They're the ones who understand their style, invest in quality basics, and wear their clothes with authenticity. When you feel good in what you're wearing, that confidence radiates outward."
    ]
  },
  "future-of-fashion": {
    id: 6,
    title: "The Future of Fashion",
    category: "Trends",
    date: "August 2025",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=800&fit=crop",
    content: [
      "The fashion industry stands at a crossroads. As we look toward the future, we see exciting opportunities to reshape how clothing is designed, produced, and consumed. At MW, we're committed to being part of this positive transformation.",
      "Technology will play an increasing role in fashion. From 3D design tools that reduce waste to blockchain systems that ensure supply chain transparency, innovation is making ethical fashion more accessible. We're investing in these technologies to improve our practices without compromising artistry.",
      "Personalization is the future. Rather than mass-producing identical items, we're moving toward made-to-order models that reduce waste and ensure perfect fit. Imagine ordering a dress in your exact measurements, in your preferred length and color. That future is closer than you think.",
      "The rental and resale markets are booming, and for good reason. Circular fashion models extend the life of garments, reducing environmental impact. We're exploring ways to support these models, possibly introducing a MW resale platform for customers to buy and sell pre-loved pieces.",
      "Despite technological advances, craftsmanship will always have value. The future of fashion isn't about replacing human skill with machines. It's about using technology to support artisans, improve working conditions, and create beautiful, sustainable clothing that stands the test of time."
    ]
  },
  "color-psychology": {
    id: 7,
    title: "The Psychology of Color in Fashion",
    category: "Fashion Guide",
    date: "July 2025",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1200&h=800&fit=crop",
    content: [
      "Color is one of the most powerful tools in fashion. It influences mood, perception, and the way others see us. Understanding color psychology can transform how you approach your wardrobe and personal style.",
      "Black communicates sophistication, authority, and timelessness. It's the ultimate power color, making you appear confident and in control. Navy offers similar benefits but feels more approachable and trustworthy.",
      "White and cream represent purity, simplicity, and freshness. These shades create a clean canvas that allows your personality to shine. They're perfect for minimalists who want to make a statement through simplicity.",
      "Earth tones like beige, camel, and olive green connect us to nature. They're calming, versatile, and inherently timeless. These colors work beautifully in capsule wardrobes because they pair effortlessly with nearly everything.",
      "When choosing colors, consider your skin tone, personal energy, and the message you want to convey. The right colors make you look healthy, confident, and authentically yourself."
    ]
  },
  "investment-pieces": {
    id: 8,
    title: "Investment Pieces Worth the Splurge",
    category: "Fashion Guide",
    date: "June 2025",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=800&fit=crop",
    content: [
      "Not all fashion purchases are created equal. Investment pieces are items that justify their higher price through exceptional quality, versatility, and longevity. Knowing which pieces deserve splurging transforms your wardrobe.",
      "A quality leather bag is always worth the investment. Unlike trendy items that date quickly, a well-made leather bag ages beautifully and remains stylish for decades. Look for classic shapes in neutral colors.",
      "The perfect blazer is transformative. It elevates casual outfits and completes professional looks. Invest in impeccable tailoring and quality fabric. A blazer that fits like it was made for you is priceless.",
      "Quality footwear impacts both style and health. Well-made shoes with proper support keep you comfortable while looking polished. Invest in classic styles like leather ankle boots, elegant flats, and timeless heels.",
      "Finally, a cashmere sweater or coat is the epitome of luxury basics. The softness, warmth, and elegance of cashmere cannot be replicated by cheaper materials. With proper care, these pieces last for years."
    ]
  },
  "seasonal-transitions": {
    id: 9,
    title: "Mastering Seasonal Transitions",
    category: "Style Tips",
    date: "May 2025",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&h=800&fit=crop",
    content: [
      "The change between seasons doesn't mean a complete wardrobe overhaul. Mastering transitional dressing means getting more wear from your clothes and always looking appropriately styled.",
      "Layering is the key to transitional dressing. Start with lightweight base pieces and add or remove layers as temperatures fluctuate. A silk camisole under a blazer works for both spring and fall.",
      "Transitional fabrics bridge seasons beautifully. Cotton, lightweight wool, and linen blends work year-round. These materials breathe in warmth and provide structure in cold, making them invaluable for transitional periods.",
      "Accessories change everything. A lightweight scarf, ankle boots instead of sandals, or tights under a dress extend your summer pieces into fall. Similarly, lighter accessories make winter pieces work in spring.",
      "Color choices signal seasonal awareness. Deep jewel tones work for fall, while pastels and brights indicate spring. By mixing seasonal colors with neutral bases, you create outfits that feel current and weather-appropriate."
    ]
  },
  "fabric-guide": {
    id: 10,
    title: "Understanding Luxury Fabrics",
    category: "Fashion Guide",
    date: "April 2025",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&h=800&fit=crop",
    content: [
      "Fabric quality determines how clothing looks, feels, and lasts. Understanding different fabrics helps you make informed purchases and care for your wardrobe properly.",
      "Silk is the ultimate luxury fabric. It drapes beautifully, feels incredible, and looks sophisticated. However, it requires delicate care. Silk works wonderfully for blouses, dresses, and scarves that make statements.",
      "Cotton is the workhorse of wardrobes. High-quality cotton like Egyptian or Pima offers softness and durability. It breathes well, making it perfect for year-round wear in shirts, dresses, and casual pieces.",
      "Wool isn't just for winter. Lightweight merino wool works beautifully in all seasons. It regulates temperature, resists wrinkles, and maintains its shape. Quality wool pieces are worth every penny.",
      "Understanding fabric composition helps you predict how garments will wear and age. Natural fibers generally last longer and feel better than synthetics, though modern blends can offer practical benefits like stretch and easy care."
    ]
  },
  "ethical-production": {
    id: 11,
    title: "The True Cost of Fashion",
    category: "Sustainability",
    date: "March 2025",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=1200&h=800&fit=crop",
    content: [
      "The fashion industry's environmental and social impact extends far beyond what we see on hangers. Understanding the true cost of our clothing choices empowers us to shop more consciously.",
      "Fast fashion's appeal is undeniable: trendy pieces at minimal cost. But this model depends on exploitative labor practices, environmental damage, and planned obsolescence that fills landfills.",
      "Water consumption in fashion is staggering. A single cotton t-shirt requires about 2,700 liters of water to produce. Choosing organic cotton and supporting brands with water conservation practices makes a difference.",
      "Chemical dyes and treatments poison water systems and harm workers. Sustainable brands use low-impact dyes, natural alternatives, and safer chemical processes. These practices cost more but protect people and planet.",
      "As consumers, our choices matter. Every purchase is a vote for the kind of industry we want. By supporting ethical brands and buying less but better, we can help reshape fashion into a force for good."
    ]
  },
  "minimalist-wardrobe": {
    id: 12,
    title: "The Art of Minimalist Dressing",
    category: "Style Tips",
    date: "February 2025",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=800&fit=crop",
    content: [
      "Minimalist fashion isn't about deprivation. It's about intention. A minimalist wardrobe focuses on quality over quantity, creating freedom through carefully curated pieces that bring genuine joy.",
      "Start by evaluating what you actually wear. Most people wear 20% of their wardrobe 80% of the time. Identifying your true favorites reveals your authentic style and shows what you can release.",
      "Color consistency is key to minimalism. Choose a cohesive palette of 3-5 colors that work together. This ensures every piece coordinates, maximizing outfit possibilities while minimizing decision fatigue.",
      "Quality becomes paramount in a minimalist wardrobe. With fewer pieces, each item works harder. Investing in better quality means clothes last longer and feel better, ultimately saving money and reducing waste.",
      "Minimalism is personal. Your minimal might include 30 pieces or 60. The number doesn't matter as much as ensuring each item serves a purpose and aligns with your lifestyle and values."
    ]
  },
  "brand-values": {
    id: 13,
    title: "Building a Brand with Purpose",
    category: "Brand Story",
    date: "January 2025",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=800&fit=crop",
    content: [
      "MW was never meant to be just another fashion brand. From the beginning, the vision was to create something meaningful that contributes positively to the industry and the lives of our customers.",
      "Our values guide every decision. Sustainability isn't a marketing term for us. It's embedded in our supply chain, material choices, and business practices. We measure success not just in sales but in positive impact.",
      "Transparency is non-negotiable. Our customers deserve to know where their clothes come from, who made them, and under what conditions. We share this information openly because accountability matters.",
      "Community is central to MW. We're not just selling clothes; we're building relationships with people who share our values. Your feedback shapes our collections and helps us improve continuously.",
      "The future of MW is about growth with integrity. We aim to reach more people without compromising our values. Proving that ethical, beautiful fashion can thrive gives us hope for the industry's transformation."
    ]
  },
  "wardrobe-care": {
    id: 14,
    title: "Making Your Wardrobe Last",
    category: "Style Tips",
    date: "December 2024",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&h=800&fit=crop",
    content: [
      "Proper care extends the life of your clothes dramatically. A quality garment treated well can last decades, but even the finest pieces deteriorate quickly without appropriate care.",
      "Read and follow care labels. They're there for a reason. When labels say dry clean only, they mean it. Hand washing or gentle cycles work for many pieces marked as such, saving money and resources.",
      "Storage matters enormously. Fold knits to prevent stretching, hang structured pieces to maintain shape, and use quality hangers that support garments properly. Cedar blocks protect against moths naturally.",
      "Learn basic repairs. Sewing on a button or fixing a small seam saves clothes from landfills. Many alterations are simple enough for anyone to learn, and tailors can handle more complex issues.",
      "Washing less is often better. Unless actually dirty, many pieces can be worn multiple times between washes. Spot clean when possible, air out garments, and wash only when necessary to preserve fabric integrity."
    ]
  },
  "conscious-shopping": {
    id: 15,
    title: "The Conscious Shopping Guide",
    category: "Sustainability",
    date: "November 2024",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1472746739893-c6ebf0bf8945?w=1200&h=800&fit=crop",
    content: [
      "Conscious shopping doesn't mean never buying anything. It means being intentional about what, where, and how often you buy. This approach creates a wardrobe you love while minimizing negative impact.",
      "Before buying, ask: Do I need this? Will I wear it at least 30 times? Does it work with existing pieces? Can I afford it without strain? These questions prevent impulse purchases you'll regret.",
      "Research brands before buying. Look for transparency about manufacturing, labor practices, and environmental policies. Brands committed to ethics are usually proud to share this information.",
      "Consider secondhand first. Vintage and consignment shops offer unique pieces with character while preventing waste. Quality secondhand items often cost less than new fast fashion and last longer.",
      "When you do buy new, choose quality over quantity. One well-made piece that lasts years is better for your wallet and the planet than multiple cheap items that fall apart quickly."
    ]
  },
  "personal-styling": {
    id: 16,
    title: "Finding Your Personal Style",
    category: "Style Tips",
    date: "October 2024",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&h=800&fit=crop",
    content: [
      "Personal style is the visual expression of who you are. It's not about following trends or rules but discovering what makes you feel confident and authentic. This journey is uniquely yours.",
      "Start by observing what you naturally gravitate toward. Look at your most-worn pieces and favorite outfits. What do they have in common? These patterns reveal your true preferences beneath outside influences.",
      "Create inspiration boards but don't treat them as rules. Pinterest and Instagram provide ideas, but your life, body, and preferences determine what works for you. Inspiration is a starting point, not a destination.",
      "Experiment fearlessly. Try styles outside your comfort zone to discover what resonates. Sometimes our true style hides behind assumptions about what we should wear based on age, profession, or body type.",
      "Your personal style will evolve. What feels right at 25 might not at 35, and that's perfectly natural. Embrace evolution while staying true to your core aesthetic values and what makes you feel like yourself."
    ]
  },
  "textile-innovation": {
    id: 17,
    title: "Innovative Sustainable Textiles",
    category: "Sustainability",
    date: "September 2024",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=1200&h=800&fit=crop",
    content: [
      "The future of sustainable fashion lies in textile innovation. New materials and production methods are emerging that could revolutionize how we make clothes with minimal environmental impact.",
      "Mushroom leather, pineapple fiber, and lab-grown silk represent exciting alternatives to conventional materials. These innovations offer the qualities we love about traditional fabrics without the environmental cost.",
      "Recycled textiles are becoming increasingly sophisticated. New technologies can break down old garments to fiber level and create new, high-quality fabrics. This circularity is key to sustainable fashion's future.",
      "Waterless dyeing technologies eliminate the massive water consumption and pollution associated with traditional dyeing. These processes produce vibrant, long-lasting colors while protecting water resources.",
      "At MW, we're actively exploring these innovations. As technologies become commercially viable, we're committed to incorporating them into our collections, leading the industry toward a more sustainable future."
    ]
  },
  "fashion-history": {
    id: 18,
    title: "Timeless Styles Through History",
    category: "Fashion Guide",
    date: "August 2024",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=800&fit=crop",
    content: [
      "Fashion is cyclical, with styles reappearing across generations. Understanding fashion history helps us recognize truly timeless pieces and see current trends in broader context.",
      "The little black dress, popularized by Coco Chanel in the 1920s, remains a wardrobe staple nearly a century later. Its enduring appeal lies in versatility, elegance, and ability to flatter any figure.",
      "Men's tailoring has influenced fashion for decades. The power suit of the 1980s drew from masculine cuts, while today's blazers continue this tradition with refined touches.",
      "Denim's journey from workwear to high fashion illustrates how functionality can become style. Quality denim never goes out of fashion because it combines durability, comfort, and effortless cool.",
      "Studying fashion history reveals that true style transcends time. The pieces we consider timeless today earned that status by proving their worth across changing trends and decades of wear."
    ]
  },
  "mw-journey": {
    id: 19,
    title: "The MW Story: Five Years Later",
    category: "Brand Story",
    date: "July 2024",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=1200&h=800&fit=crop",
    content: [
      "Five years ago, MW started as a vision to create fashion that matters. Looking back, I'm grateful for the journey, the challenges that strengthened us, and the community that grew around our values.",
      "Our first collection was tiny: just twelve pieces. Each one took months to perfect. We learned that rushing quality for quantity never works. Those early lessons shaped everything that followed.",
      "Growth brought new challenges. Scaling while maintaining ethical practices and quality standards required difficult decisions. We turned down partnerships that compromised our values, even when it meant slower growth.",
      "Our community has been everything. The people who trust MW to be part of their wardrobes inspire us daily. Your feedback, stories, and loyalty drive us to improve and stay true to our mission.",
      "The next five years will bring expansion, new collections, and continued commitment to sustainable, beautiful fashion. Thank you for being part of this journey. The best is yet to come."
    ]
  },
  "body-positivity": {
    id: 20,
    title: "Fashion for Every Body",
    category: "Empowerment",
    date: "June 2024",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1525431234-b2f99bbc8c90?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Fashion should celebrate all bodies, not prescribe an ideal. At MW, we believe everyone deserves clothes that fit beautifully and make them feel confident, regardless of size or shape.",
      "The fashion industry's size standards are outdated and exclusionary. We're committed to inclusive sizing because style isn't determined by body type. Beautiful clothing should be accessible to everyone.",
      "Fit is more important than size numbers. Different brands size differently, and bodies are wonderfully diverse. Focus on how clothes make you feel rather than the number on the label.",
      "Certain cuts flatter certain body types, but rules are meant to be broken. Wear what makes you happy. The confidence you project matters more than following supposed guidelines about what your body type should wear.",
      "Your body is not a project to fix before you deserve nice clothes. You deserve to feel beautiful now. Dress the body you have today with love, respect, and joy."
    ]
  },
  "eco-packaging": {
    id: 21,
    title: "Sustainable Packaging Matters",
    category: "Sustainability",
    date: "May 2024",
    author: "Nona Sieh",
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=1200&h=800&fit=crop",
    content: [
      "Sustainable fashion extends beyond the garment itself. Packaging creates significant waste, and at MW, we've reimagined every aspect of how products reach our customers.",
      "Our shipping boxes are made from 100% recycled materials and are fully recyclable. We've eliminated plastic bags in favor of compostable alternatives that break down naturally without harming ecosystems.",
      "Minimalist packaging reduces waste while creating an elegant unboxing experience. You don't need layers of unnecessary materials to feel special. Quality presentation can be sustainable.",
      "We encourage customers to reuse or recycle all packaging materials. Our boxes are sturdy enough for multiple uses, and we provide clear recycling instructions for all components.",
      "Every detail matters in sustainability. From compostable tape to soy-based inks for printing, we consider the environmental impact of every element. Small choices add up to significant change."
    ]
  }
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPostsData[slug];
  const [readArticles, setReadArticles] = React.useState([]);

  // Scroll to top whenever the article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Mark article as read
    if (slug) {
      const readArticles = JSON.parse(localStorage.getItem('readArticles') || '[]');
      if (!readArticles.includes(slug)) {
        readArticles.push(slug);
        localStorage.setItem('readArticles', JSON.stringify(readArticles));
      }
      setReadArticles(readArticles);
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-sm hover:underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <section key={slug} className="relative w-full overflow-hidden bg-white">
      <div className="container pt-24 pb-12 md:py-20 lg:py-28 max-w-4xl">
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 px-4 md:px-0"
        >
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </motion.div>

        {/* Category & Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 px-4 md:px-0"
        >
          <span className="text-xs uppercase tracking-widest text-slate-500">
            {post.category} • {post.date}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight mb-6 px-4 md:px-0"
        >
          {post.title}
        </motion.h1>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 px-4 md:px-0"
        >
          <p className="text-sm text-slate-600">By {post.author}</p>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-12 px-4 md:px-0"
        >
          <img 
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] md:h-[500px] object-cover rounded-xl shadow-lg"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="prose prose-lg max-w-none px-4 md:px-0"
        >
          {post.content.map((paragraph, index) => (
            <p key={index} className="text-slate-700 leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-slate-200 px-4 md:px-0"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm text-slate-600 mb-2">Written by</p>
              <p className="font-semibold">{post.author}</p>
            </div>
            <div className="flex gap-3">
              <Link 
                to="/shop" 
                className="px-6 py-3 bg-black text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Shop the Collection
              </Link>
              <Link 
                to="/blog" 
                className="px-6 py-3 border border-slate-200 rounded-md text-sm hover:bg-slate-50 transition-colors"
              >
                More Articles
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-16 px-4 md:px-0"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-serif">Continue Reading</h2>
            <Link 
              to="/blog/articles"
              className="text-sm font-medium hover:underline"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(blogPostsData)
              .filter(([key]) => key !== slug)
              .slice(0, 4)
              .map(([key, relatedPost], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                >
                  <Link 
                    to={`/blog/${key}`}
                    className="group block"
                  >
                    <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                      <img 
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {readArticles.includes(key) && (
                        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                          ✓ Read
                        </div>
                      )}
                    </div>
                    <span className="text-xs uppercase tracking-widest text-slate-500">{relatedPost.category}</span>
                    <h3 className="text-lg font-serif mt-2 group-hover:text-slate-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">{relatedPost.date}</p>
                  </Link>
                </motion.div>
              ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
