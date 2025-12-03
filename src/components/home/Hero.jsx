/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 17:18:48
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
/**
    * @description      : Raised text + image further & centered text
**/
// src/components/home/HeroSection.jsx
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative w-full gsap-reveal">

      {/* FULL BACKGROUND IMAGE */}
      <div className="w-full h-[520px] md:h-[680px] overflow-hidden">
        <div className="w-full h-full relative">
          <img
            src="https://images.unsplash.com/photo-1533777324565-a040eb52fac2?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&s=6b4a6e8c2b3e6c7f9f2a"
            alt="background"
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        </div>
      </div>

      {/* TEXT ON TOP OF BACKGROUND */}
      <div className="absolute inset-0 flex items-start justify-center px-6 md:px-12 max-w-7xl mx-auto pt-28 md:pt-40">
        <div className="max-w-2xl text-white text-center drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-3">
            MW — Modern Women's Fashion
          </h2>

          <h3 className="uppercase text-sm md:text-lg font-light tracking-wide mb-6 opacity-90">
            Curated prêt-à-porter for timeless elegance
          </h3>

          <p className="text-sm md:text-base leading-relaxed mb-8 opacity-90 max-w-xl mx-auto">
            Discover our new seasonal collection — designed for confident women who value simplicity, quality and subtle luxury.
          </p>

          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-black text-white rounded-md text-sm tracking-wide shadow-md hover:scale-[1.02] transition-transform">
              Shop New
            </button>

            <button className="px-6 py-3 bg-white text-black border border-black rounded-md text-sm tracking-wide hover:bg-gray-100 transition">
              Discover More
            </button>
          </div>
        </div>
      </div>

      {/* OVERLAPPING PORTRAIT IMAGE */}
      <div className="absolute bottom-24 md:bottom-28 right-6 md:right-20 w-[200px] md:w-[300px] h-[300px] md:h-[420px] rounded-xl overflow-hidden shadow-2xl transform-gpu gsap-reveal">
        <img src="https://images.unsplash.com/photo-1520975919838-5b0a6f5f3b1f?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.0.3&s=3d9b4b5a8f" alt="portrait" className="w-full h-full object-cover" />
      </div>

      {/* Space to compensate for portrait overlap */}
      <div className="h-[220px] md:h-[260px]"></div>
    </section>
  );
}
