import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const [activeSection, setActiveSection] = React.useState("about");

  const sections = [
    { id: "about", label: "Meet Nona Sieh" },
    { id: "values", label: "Our Values" },
    { id: "philosophy", label: "Our Philosophy" },
    { id: "journey", label: "The Journey" },
    { id: "commitment", label: "Our Commitment" }
  ];

  React.useEffect(() => {
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

        {/* MAIN ABOUT SECTION */}
        <motion.div
          id="about"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-20"
        >
          <motion.div 
            className="px-4 md:px-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="text-xs md:text-sm text-slate-500 uppercase tracking-widest mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              About MW
            </motion.div>
            
            <motion.h1 
              className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Meet Nona Sieh
            </motion.h1>

            <motion.div 
              className="space-y-5 text-sm md:text-base text-slate-600 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className="text-base md:text-lg">
                Welcome to MW, a modern fashion destination curated by Nona Sieh. 
                Founded with a vision to blend timeless elegance with contemporary style, 
                MW offers carefully selected pieces that celebrate individuality and sophistication.
              </p>
              
              <p>
                Each collection is thoughtfully designed to empower everyone through refined silhouettes, 
                luxurious fabrics, and versatile designs that transcend fleeting trends.
              </p>
            </motion.div>

            <motion.div 
              className="flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Link
                to="/shop"
                className="px-5 py-3 bg-black text-white rounded-md text-sm font-medium shadow hover:bg-slate-800 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Shop the Collection
              </Link>
              <Link
                to="/contact"
                className="px-5 py-3 border border-slate-200 rounded-md text-sm hover:bg-slate-50 transition-all hover:border-slate-300 hover:shadow"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative px-4 md:px-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div 
              className="w-full h-[400px] md:h-[560px] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <motion.div 
                  className="text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <motion.svg 
                    className="w-24 h-24 mx-auto mb-4" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </motion.svg>
                  <p className="text-sm font-medium tracking-wider">MW FASHION</p>
                  <p className="text-xs text-slate-400 mt-1">Curated by Nona Sieh</p>
                </motion.div>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute top-4 right-4 w-20 h-20 bg-white/30 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute bottom-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* VALUES SECTION */}
        <motion.div
          id="values"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="px-4 md:px-0 mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-serif text-center mb-10">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Quality First",
                description: "Premium materials and expert craftsmanship in every piece we curate.",
                delay: 0.2
              },
              {
                title: "Sustainable",
                description: "Committed to ethical practices and eco-friendly fashion choices.",
                delay: 0.3
              },
              {
                title: "Timeless Style",
                description: "Collections designed to transcend trends and remain relevant season after season.",
                delay: 0.4
              },
              {
                title: "Customer Care",
                description: "Dedicated support and personalized service for every customer.",
                delay: 0.5
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: card.delay }}
                whileHover={{ y: -8, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-xl shadow-md p-6 border border-slate-100 hover:border-slate-200 transition-all cursor-pointer"
              >
                <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                <p className="text-sm text-slate-600">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* PHILOSOPHY SECTION */}
        <motion.div
          id="philosophy"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 md:p-12 mb-20 mx-4 md:mx-0"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-serif mb-6">Our Philosophy</h2>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-8">
              With years of experience in fashion curation and a deep understanding of what modern 
              people seek in their wardrobes, Nona Sieh has built MW into more than just a clothing 
              brand. It's a lifestyle choice. Every piece tells a story of craftsmanship, attention 
              to detail, and the belief that fashion should make you feel confident and authentic.
            </p>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-8">
              MW's philosophy is simple: create pieces that transcend fleeting trends while remaining 
              fresh and relevant. We believe in slow fashion, investing in quality over quantity, 
              and building a wardrobe that grows with you through life's moments, from boardroom meetings 
              to weekend brunches, from special celebrations to quiet evenings.
            </p>
            <motion.p 
              className="text-lg md:text-xl text-slate-800 italic font-light"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              "Fashion is not just about what you wear. It's about how you feel, how you move through 
              the world, and the confidence you carry with you."
            </motion.p>
            <p className="text-sm text-slate-500 mt-3">Nona Sieh, Founder</p>
          </div>
        </motion.div>

        {/* JOURNEY SECTION */}
        <motion.div
          id="journey"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20 px-4 md:px-0"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-serif mb-6">The MW Journey</h2>
            <div className="space-y-6 text-slate-600">
              <p>
                Based on a passion for creating elevated fashion experiences, Nona Sieh brings 
                together international craftsmanship and modern aesthetics to help you build a wardrobe 
                that reflects your unique story.
              </p>
              <p>
                Each season, we introduce new collections that honor our commitment to ethical production, 
                sustainable materials, and designs that empower everyone who wears them. Our pieces 
                are sourced from artisans who share our values and dedication to excellence.
              </p>
              <p>
                From the initial sketch to the final stitch, every garment undergoes rigorous quality 
                checks to ensure it meets MW standards. We partner with manufacturers who prioritize 
                fair labor practices and sustainable production methods.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <motion.div 
              className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm"
              whileHover={{ x: 10, shadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  01
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Design Excellence</h3>
                  <p className="text-sm text-slate-600">
                    Every collection begins with careful research into current lifestyles, emerging trends, 
                    and timeless silhouettes that work for real people.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm"
              whileHover={{ x: 10, shadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  02
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Ethical Sourcing</h3>
                  <p className="text-sm text-slate-600">
                    We partner with certified suppliers who share our commitment to sustainability 
                    and fair trade practices across the globe.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm"
              whileHover={{ x: 10, shadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  03
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Craftsmanship</h3>
                  <p className="text-sm text-slate-600">
                    Expert artisans bring each design to life with meticulous attention to detail, 
                    ensuring every stitch represents our quality standards.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm"
              whileHover={{ x: 10, shadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  04
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Your Wardrobe</h3>
                  <p className="text-sm text-slate-600">
                    The final piece arrives at your door, ready to become part of your story and 
                    empower you through every moment of your day.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* COMMITMENT SECTION */}
        <motion.div
          id="commitment"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 mx-4 md:mx-0 mb-20"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif mb-6">Our Commitment to You</h2>
            <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-8">
              At MW, we're committed to providing you with more than just beautiful clothes. We're building 
              a community of confident, conscious individuals who value quality, sustainability, and authentic style. 
              Every purchase supports ethical practices and helps us continue our mission of redefining modern fashion.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl">✓</span>
                </div>
                <h4 className="font-semibold mb-2">Free Shipping</h4>
                <p className="text-slate-400">On all orders over $100</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl">↺</span>
                </div>
                <h4 className="font-semibold mb-2">Easy Returns</h4>
                <p className="text-slate-400">30-day return policy</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl">♥</span>
                </div>
                <h4 className="font-semibold mb-2">Personal Care</h4>
                <p className="text-slate-400">Dedicated customer support</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center px-4 md:px-0"
        >
          <h2 className="text-2xl md:text-3xl font-serif mb-4">Ready to Experience MW?</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Discover collections that blend timeless elegance with modern sensibility. 
            Build a wardrobe that tells your unique story.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/shop"
              className="px-8 py-4 bg-black text-white rounded-md text-base font-medium shadow-lg hover:bg-slate-800 transition-all hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore Collection
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-slate-900 rounded-md text-base hover:bg-slate-900 hover:text-white transition-all"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
