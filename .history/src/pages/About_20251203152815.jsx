import React from "react";
import "./flipcard.css";
import FlipCard from "./FlipCard";
import { motion } from "framer-motion";
import temii from "./temii.jpeg";

export default function AboutPage() {
  return (
    <section id="About" className="w-full py-12 md:py-20 px-4 md:px-6 bg-[#fdfcfb]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto p-6 md:p-10 lg:p-16"
      >
        
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
          <div className="md:col-span-7 space-y-4 md:space-y-6">
            <p className="text-xs md:text-sm text-[#666666] font-semibold tracking-widest">
              ABOUT ME
            </p>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal text-[#1a1a1a] leading-tight"
              style={{
                fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
                letterSpacing: '-0.04em'
              }}
            >
              Meet Temi
            </h2>

            <p className="text-sm md:text-base lg:text-lg text-[#666666] leading-relaxed max-w-2xl">
              I create calm, modern digital experiences with a soft touch and 
              a sense of elegance. My work blends minimal layouts, warm tones, 
              and subtle motion to bring ideas to life in a way that feels 
              intentional and human.
            </p>

            <button className="px-6 py-2 md:py-3 rounded-full bg-[#1a1a1a] text-white text-sm md:text-base
              shadow-lg hover:bg-[#333333] transition">
              More About Me
            </button>
          </div>

          <div className="md:col-span-5 flex justify-center mt-6 md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-56 h-64 sm:w-64 sm:h-72 md:w-72 md:h-80 lg:w-80 lg:h-96 rounded-3xl bg-gray-100 overflow-hidden shadow-xl"
            >
              <img
                src={temii}
                alt="Temi"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* FLIP CARDS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <FlipCard
            frontText="Experience"
            backText="3+ years building modern UI experiences."
          />
          <FlipCard
            frontText="Design"
            backText="Soft, minimal and emotionally intentional UI."
          />
          <FlipCard
            frontText="Vision"
            backText="Digital storytelling through calm design."
          />
          <FlipCard
            frontText="Branding"
            backText="Elegant identities that feel warm & human."
          />
        </div>

      </motion.div>
    </section>
  );
}
