import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; // ← This is the key for Vite + React Router

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "Complimentary express shipping worldwide. Orders typically arrive within 3–5 business days. Next-day and same-day delivery available in select cities."
  },
  {
    question: "What is the return policy?",
    answer: "We offer free returns within 30 days of delivery. Items must be unworn with original tags. Return label is included in every order."
  },
  {
    question: "Do you offer made-to-measure or alterations?",
    answer: "Yes. Many pieces are available made-to-measure. Book a complimentary virtual fitting with our atelier team."
  },
  {
    question: "How do I care for silk and delicate fabrics?",
    answer: "We recommend professional dry cleaning for silk, cashmere and wool pieces. Care instructions are included with every garment."
  },
  {
    question: "Are your materials ethically sourced?",
    answer: "Yes. All fabrics are sourced from certified suppliers (GOTS, OEKO-TEX®, RWS). Transparency reports available upon request."
  },
  {
    question: "Can I book a private styling appointment?",
    answer: "Absolutely. Virtual and in-boutique appointments are complimentary. Book via our website or Instagram."
  },
  {
    question: "Do you offer gift wrapping?",
    answer: "Every order arrives in our signature gift packaging with silk ribbon and handwritten note — always included."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 bg-[#fdfcfb]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
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
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-[#eaeaea] overflow-hidden hover:border-gray-300 transition">
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

        {/* THIS IS THE WORKING BUTTON FOR VITE + REACT ROUTER */}
        <div className="text-center mt-16">
          <p className="text-[#666666] mb-6">Still have questions?</p>

          <Link
            to="/contact"
            className="inline-block bg-black text-white px-10 py-5 rounded-full text-sm tracking-wider font-medium hover:bg-gray-900 transition"
          >
            CONTACT CLIENT CARE
          </Link>
        </div>
      </div>
    </section>
  );
}