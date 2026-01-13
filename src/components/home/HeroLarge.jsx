import React from "react";
import { Link } from "react-router-dom";

export default function HeroLarge() {
  return (
    <section className="relative w-full gsap-reveal">
      <div className="w-full h-[68vh] md:h-[78vh] lg:h-[84vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&s=8f1e1f3a"
          alt="hero"
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/10" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12">
        <div className="max-w-3xl text-center text-white">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-4">MW / Timeless Contemporary Fashion</h1>
          <p className="text-sm md:text-base text-white/90 mb-6">Seasonless staples and statement pieces crafted for modern elegance. Lightweight tailoring, premium fabrics, thoughtful details.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/shop" className="px-6 py-3 bg-white text-black rounded-md text-sm font-medium shadow hover:scale-[1.02] transition">Shop Collection</Link>
            <Link to="/shop?filter=new" className="px-6 py-3 border border-white text-white rounded-md text-sm hover:bg-white/10 transition">New Arrivals</Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">S</div>
              <div>Signature Fabrics</div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">F</div>
              <div>Free Shipping</div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">R</div>
              <div>Easy Returns</div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-8 md:h-12 lg:h-20" />
    </section>
  );
}
