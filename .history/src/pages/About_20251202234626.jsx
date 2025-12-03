
import React from "react";
import "./flipcard.css";
import FlipCard from "./FlipCard";
import { motion } from "framer-motion";
import temii from "./temii.jpeg";

export default function AboutPage() {
  return (
    <section id="About" className="w-full py-20 px-6 bg-[#f9f4ee]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto bg-[#fffaf5] rounded-3xl shadow-xl p-10 md:p-16 
                   backdrop-blur-sm border border-[#f3e9df]"
      >
        
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 space-y-6">
            <p className="text-sm text-[#c8a889] font-semibold tracking-widest">
          
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#3b2f2a]">
              Meet Temi{" "}
              <span className="text-transparent bg-clip-text 
              bg-gradient-to-r from-[#d3b08a] via-[#eac9ac] to-[#f5e7d7]">
                — stylish & intentional
              </span>
            </h2>

            <p className="text-[#6d5c55] leading-relaxed">
              I create calm, modern digital experiences with a soft touch and 
              a sense of elegance. My work blends minimal layouts, warm tones, 
              and subtle motion to bring ideas to life in a way that feels 
              intentional and human.
            </p>

            <button className="px-6 py-3 rounded-full bg-[#3b2f2a] text-white 
              shadow-lg hover:bg-[#2c221e] transition">
              More About Me
            </button>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-72 h-80 md:w-80 md:h-96 rounded-3xl bg-[#f0e6dc] overflow-hidden shadow-xl"
            >
              <img
                src="/about.jpg"
                alt= {temii}
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
