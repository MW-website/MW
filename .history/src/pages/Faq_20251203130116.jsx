import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "We offer complimentary express shipping worldwide. Orders typically arrive within 3–5 business days. Expedited 1–2 day options are available at checkout."
  },
  {
    question: "What is your return policy?",
    answer: "We gladly accept returns within 30 days of delivery. Items must be unworn, unwashed, and in original condition with tags attached. Complimentary return shipping is included."
  },
  {
    question: "Do you offer alterations or made-to-measure?",
    answer: "Yes. Select pieces are available in our Made-to-Measure program. Book a virtual or in-person appointment with one of our stylists for perfect fit, every time."
  },
  {
    question: "How should I care for silk and cashmere pieces?",
    answer: "We recommend dry cleaning only for silk and delicate cashmere. For machine-washable cashmere, use cold water on a gentle cycle and lay flat to dry. Detailed care instructions are included with every garment."
  },
  {
    question: "Are your fabrics ethically sourced?",
    answer: "Absolutely. We partner exclusively with mills certified by GOTS, OEKO-TEX®, and Responsible Wool Standard. Full transparency reports are available upon request."
  },
  {
    question: "Can I schedule a private styling session?",
    answer: "Of course. Our personal stylists are available virtually or in our flagship boutiques. Book your complimentary 45-minute session through the link in our navigation or Instagram bio."
  },
  {
    question: "Do you price match or offer student discount?",
    answer: "We maintain consistent pricing across all channels and do not price match. However, students and brides-to-be receive 15% off their first full-price purchase with valid ID."
  },
  {
    question: "Is gift wrapping available?",
    answer: "Every order is delivered in our signature embossed gift box with hand-tied silk ribbon, tissue, and a handwritten note — always complimentary."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-24 bg-[#faf7f0]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-black text-amber-900">FAQ</h2>
          <p className="mt-4 text-lg text-amber-700 font-light">Common questions answered</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                <span className="text-lg md:text-xl font-medium text-amber-900 pr-8">
                  {faq.question}
                </span>

                {/* Plus / Minus Icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center transition-all group-hover:bg-amber-200">
                  {openIndex === i ? (
                    <Minus size={20} className="text-amber-900" />
                  ) : (
                    <Plus size={20} className="text-amber-900" />
                  )}
                </div>
              </button>

              {/* Answer with smooth height animation */}
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-2">
                      <p className="text-amber-800 leading-relaxed max-w-3xl">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Optional CTA at the bottom */}
        <div className="text-center mt-16">
          <p className="text-amber-800 mb-6">Still have questions?</p>
          <a
            href="mailto:care@luxe.com"
            className="inline-flex items-center gap-3 text-amber-900 font-bold text-lg hover:gap-5 transition-all"
          >
            Contact Our Client Care Team
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}