/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 15:44:52
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
// src/components/home/AboutSection.jsx
import React from "react";

export default function AboutSection() {
  return (
    <section id="about" className="container section gsap-reveal">
      <div className="relative bg-white rounded-xl shadow-[var(--shadow-soft)] overflow-hidden p-6 md:p-10">
        <div className="grid lg:grid-cols-2 items-center gap-8">
          {/* about card (left on preview) */}
          <div className="px-2 md:px-6">
            <div className="text-sm text-slate-500 uppercase mb-2">About MW</div>
            <h3 className="font-[var(--font-serif)] text-2xl md:text-3xl mb-3">A modern label for everyone</h3>

            <p className="text-slate-600 mb-6">
              MW creates elevated essentials and statement pieces with careful attention to tailoring and fabric. Our collections focus on wearability, sustainability and timeless silhouettes.
            </p>

            <button className="px-4 py-2 bg-black text-white rounded-md shadow">Explore Collection</button>
          </div>

          {/* image (right) with stamp badge */}
          <div className="relative w-full flex justify-center">
            <div className="w-[260px] md:w-[320px] h-[360px] md:h-[420px] rounded-md shadow-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1503342452485-86f7a9f8f5d1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=7b1a" alt="about" className="w-full h-full object-cover"/>
            </div>

            <div className="absolute -right-6 top-6 bg-white/90 border rounded-full px-4 py-2 text-xs shadow">MW</div>
          </div>
        </div>
      </div>
    </section>
  );
}
