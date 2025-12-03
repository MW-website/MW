import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Your FAQs (unchanged)
const faqs = [ /* ... your 7 FAQs ... */ ];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    {/* This motion.section makes the WHOLE FAQ come down slowly */}
    <motion.section
      initial={{ y: -120, opacity: 0 }}        {/* Start from above */}
      animate={{ y: 0, opacity: 1 }}           {/* Slide down + fade in */}
      transition={{
        duration: 1.4,          
        ease: [0.22, 1, 0.36, 1], {/* Custom easing – feels expensive */}
        delay: 0.2
      }}
      className="py-24 bg-[#fdfcfb]"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading – also animates in */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-6xl md:text-7xl font-normal tracking-tight"
            style={{
              fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
              color: '#1a1a1a',
              letterSpacing: '-0.02em'
            }}
          >
            FAQ
          </h2>
          <p className="mt-3 text-base text-[#666666] tracking-wide">
            Common questions answered
          </p>
        </motion.div>

        {/* Each FAQ item appears one by one */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.8 + i * 0.12,   {/* Staggered entrance */}
                ease: [0.22, 1, 0.36, 1]
              }}
              className="bg-white border border-[#eaeaea] overflow-hidden hover:border-gray-300 transition"
            >
              {/* Your existing accordion code (unchanged) */}
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-10 py-7 flex items-center justify-between text-left group"
              >
                <span
                  className="text-lg md:text-xl pr-8"
                  style={{
                    fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
                    fontWeight: 500,
                    color: openIndex === i ? '#000' : '#1a1a1a',
                  }}
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
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <div className="px-10 pb-8 pt-2">
                      <p style={{ color: '#666666' }} className="text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA Button – also animates in last */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-center mt-16"
        >
          <p className="text-[#666666] mb-6">Still have questions?</p>
          <Link
            to="/contact"
            className="inline-block bg-black text-white px-10 py-5 rounded-full text-sm tracking-wider font-medium hover:bg-gray-900 transition"
          >
            CONTACT CLIENT CARE
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}