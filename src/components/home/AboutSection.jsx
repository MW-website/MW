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
    <section id="about" className="container section">
      <div className="relative bg-white rounded-xl shadow-[var(--shadow-soft)] overflow-hidden p-10">
        <div className="grid lg:grid-cols-2 items-center gap-8">
          {/* about card (left on preview) */}
          <div>
            <div className="text-sm text-slate-500 uppercase mb-2">About me</div>
            <h3 className="font-[var(--font-serif)] text-3xl mb-3">Meet Joelle</h3>

            <p className="text-slate-600 mb-6">
              Here you can introduce yourself and tell your visitors what your site is all about. Use this section to highlight what's important. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <button className="px-4 py-2 bg-black text-white rounded-md">More about me</button>
          </div>

          {/* image (right) with stamp badge */}
          <div className="relative w-full flex justify-center">
            <div className="w-[320px] h-[420px] rounded-md shadow-lg overflow-hidden">
              <img src="https://picsum.photos/seed/aboutcard/600/800" alt="about" className="w-full h-full object-cover"/>
            </div>

            <div className="absolute -right-6 top-6 bg-white/80 border rounded-full px-4 py-2 text-xs shadow">
              JOELLE theme
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
