import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

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
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-[var(--color-mw-beige)] pt-32 pb-20"
    >
      <div className="container max-w-4xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-light mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              letterSpacing: '-0.02em',
              color: '#0f1724'
            }}
          >
            Frequently Asked Questions
          </h1>
          <p className="text-base md:text-lg text-slate-600">
            Common questions answered
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + i * 0.08,
                ease: "easeOut"
              }}
              className="glass-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                <span
                  className="text-lg md:text-xl pr-6 font-light"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: openIndex === i ? '#0f1724' : '#1e293b',
                  }}
                >
                  {faq.question}
                </span>
                <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white transition-all flex-shrink-0">
                  {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-6 pt-0">
                      <p className="text-base leading-relaxed text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-slate-600 mb-6 text-lg">Still have questions?</p>
          <Link
            to="/contact"
            className="inline-block bg-black text-white px-10 py-4 rounded-md text-sm tracking-wide font-medium hover:bg-slate-800 transition-colors"
          >
            Contact Client Care
          </Link>
        </motion.div>
      </div>
    </motion.main>
  );
}