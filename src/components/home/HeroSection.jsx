/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 16:48:23
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
import React from "react";

export default function HeroSection() {
  return (
    <section className="pt-[120px] pb-24 bg-[#f9f6f2]">

      <div className="
        max-w-7xl mx-auto px-6 
        grid grid-cols-1 lg:grid-cols-12 gap-12 
        items-center relative
      ">

        {/* LEFT IMAGE (floating forward) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-start relative">
          <div
            className="
              w-[85%] lg:w-[380px]
              rounded-xl overflow-hidden shadow-xl
              -ml-4 lg:-ml-10
            "
          >
            <img
              src="https://picsum.photos/600/800?random=44"
              alt="hero visual"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT CONTENT CARD */}
        <div
          className="
            lg:col-span-7 
            bg-white/40 backdrop-blur-sm 
            p-8 md:p-12 rounded-xl
            shadow-[0_15px_35px_rgba(0,0,0,0.05)]
          "
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-2">
            Welcome
          </h2>

          <h3
            className="
              text-xl md:text-2xl font-light tracking-wide 
              uppercase text-gray-800 mb-6
            "
          >
            To MW Store
          </h3>

          <div className="w-10 h-[2px] bg-gray-400 mb-8"></div>

          <p className="text-gray-600 leading-relaxed mb-8 max-w-lg">
            MW is a fully responsive, premium fashion store. Perfect for fashion lovers,
            style enthusiasts, and anyone who values quality craftsmanship and timeless design.
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-3 bg-black text-white rounded-sm text-sm tracking-wide">
              MY SERVICES
            </button>

            <button
              className="
                px-6 py-3 
                border border-black 
                text-black rounded-sm 
                text-sm tracking-wide
              "
            >
              WORK WITH ME
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
