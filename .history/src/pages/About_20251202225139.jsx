import React from "react";
import AboutSection from "../components/home/AboutSection";


// export default function About() {
//   return (
//     <main className="min-h-screen bg-[var(--color-joelle-beige)]">
//       <header className="container py-12 text-center">
//         <h1 className="text-4xl font-[var(--font-serif)] mb-2">About MW</h1>
//         <p className="text-sm text-[var(--color-joelle-muted)]">A calm, feminine boutique inspired layout</p>
//       </header>

//       <AboutSection />

//       <section className="container py-12">
//         <h2 className="text-2xl font-[var(--font-serif)] mb-6">Our Story</h2>
//         <p className="text-slate-700 leading-relaxed max-w-3xl">This About page is a simple expansion of the home about block — add your bio, mission, and services here to match the template style.</p>
//       </section>
//     </main>
//   );
// }
// AboutSection.jsx

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full py-20 px-6 bg-[#f9f4ee]" // light cream background
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto bg-[#fffaf5] rounded-3xl shadow-xl p-10 md:p-16 
                   backdrop-blur-sm border border-[#f3e9df]"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">

          {/* TEXT SIDE */}
          <div className="md:col-span-7 space-y-6">
            <p className="text-sm text-[#c8a889] font-semibold tracking-widest">
              ABOUT ME
            </p>

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold text-[#3b2f2a]"
            >
              Meet Temi&nbsp;
              <span className="text-transparent bg-clip-text 
                bg-gradient-to-r from-[#d3b08a] via-[#eac9ac] to-[#f5e7d7]">
                — stylish & intentional
              </span>
            </motion.h2>

            <p className="text-[#6d5c55] leading-relaxed">
              I create calm, modern digital experiences with a soft touch and 
              a sense of elegance. My work blends minimal layouts, warm tones, 
              and subtle motion to bring ideas to life in a way that feels 
              intentional and human.
            </p>

            <p className="text-[#6d5c55] leading-relaxed">
              I believe design should whisper, not shout — inviting people in 
              with beauty, clarity, and confidence. Every project is shaped by 
              emotion, storytelling, and detail.
            </p>

            <button className="px-6 py-3 rounded-full bg-[#3b2f2a] text-white 
                               shadow-lg hover:bg-[#2c221e] transition">
              More About Me
            </button>
          </div>

          {/* IMAGE SIDE */}
          <div className="md:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-72 h-80 md:w-80 md:h-96 rounded-3xl bg-[#f0e6dc] overflow-hidden shadow-xl"
            >
              <img
                src="/about.jpg" 
                alt="Temi"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}

