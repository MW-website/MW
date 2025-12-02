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
    <section className="relative w-full">

      {/* FULL BACKGROUND IMAGE */}
      <div className="w-full h-[520px] overflow-hidden">
        <img
          src="https://picsum.photos/2000/1100?random=991"
          alt="background"
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      {/* TEXT ON TOP OF BACKGROUND */}
      <div
        className="
          absolute inset-0 
          flex items-start justify-center    /* ← center horizontally, push upwards */
          px-6 md:px-12 
          max-w-7xl mx-auto
          pt-[130px]                          /* ← moved MUCH higher */
        "
      >
        <div className="
          max-w-xl 
          text-white 
          text-center                         /* ← centered text */
          drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]
        ">
          <h2 className="font-serif text-5xl md:text-6xl mb-3">
            Welcome
          </h2>

          <h3 className="
            uppercase text-lg md:text-2xl 
            font-light tracking-wide mb-6
          ">
            TO JOELLE THEME SITE
          </h3>

          <p className="text-sm md:text-base leading-relaxed mb-8 opacity-90">
            Joelle is a premium theme designed for soft, feminine,
            elegant branding. Perfect for creators, coaches,
            strategists, and refined businesses.
          </p>

          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-black text-white rounded-sm text-sm tracking-wide">
              MY SERVICES
            </button>

            <button className="px-6 py-3 bg-white text-black border border-black rounded-sm text-sm tracking-wide">
              WORK WITH ME
            </button>
          </div>
        </div>
      </div>

      {/* OVERLAPPING PORTRAIT IMAGE */}
      <div
        className="
          absolute 
          bottom-[100px]         /* ← LIFTED MUCH HIGHER */
          right-6 md:right-20 
          w-[250px] md:w-[330px] 
          h-[360px] md:h-[450px]
          rounded-xl 
          overflow-hidden 
          shadow-xl
        "
      >
        <img
          src="https://picsum.photos/600/900?random=44"
          alt="portrait"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Space to compensate for portrait overlap */}
      <div className="h-[220px]"></div>
    </section>
  );
}
