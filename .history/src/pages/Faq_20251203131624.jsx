import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [ /* your 7 FAQ items from before */ ];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const scrollToContact = (e) => {
    e.preventDefault();
    const contact = document.getElementById('contact');
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="py-24 bg-[#fdfcfb]">
      <div className="max-w-4xl mx-auto px-6">
        {/* FAQ Heading */}
        <div className="text-center mb-16">
          <h2 
            className="text-6xl md:text-7xl font-normal tracking-tight"
            style={{ 
              fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
              color: '#1a1a1a',
              letterSpacing: '-0.02em'
            }}
          >
            FAQ
          </h2>
          <p className="mt-3 text-base text-[#666666] tracking-wide">
            Common questions answered
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-[#eaeaea] hover:border-gray-300 transition">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-10 py-7 flex items-center justify-between text-left group"
              >
                <span 
                  style={{ 
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 500,
                    color: openIndex === i ? '#000' : '#1a1a1a',
                    letterSpacing: '-0.01em'
                  }}
                  className="text-lg md:text-xl pr-8"
                >
                  {faq.question}
                </span>
                <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition">
                  {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="px-10 pb-8 pt-2">
                      <p style={{ color: '#666666' }} className="text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* This button now perfectly scrolls to your Contact section */}
        <div className="text-center mt-16">
          <p className="text-[#666666] mb-6">Still have questions?</p>
          <button
            onClick={scrollToContact}
            className="inline-block bg-black text-white px-10 py-5 rounded-full text-sm tracking-wider font-medium hover:bg-gray-900 transition"
          >
            CONTACT CLIENT CARE
          </button>
        </div>
      </div>
    </section>
  );
}