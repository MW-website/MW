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
export default function About() {
  return (
    <section
      id="about"
      className="w-full py-24 bg-[#faf5f1] flex justify-center px-6"
    >
      <div className="max-w-6xl bg-white rounded-3xl shadow-lg p-10 md:p-16 flex flex-col md:flex-row items-center gap-12">
        
        {/* TEXT */}
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-500 tracking-wide mb-2">
            ABOUT ME
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Joelle
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Here you can introduce yourself and tell your visitors what your
            platform or brand is all about. Use this space to highlight the 
            important things you want people to know about you.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            Share your values, your experience, and what inspires the work you 
            do. Keep it simple, warm, and authentic — let people feel connected.
          </p>

          <button className="px-6 py-3 bg-black text-white rounded-full shadow hover:bg-gray-900 transition">
            More About Me
          </button>
        </div>

        {/* IMAGE */}
        <div className="flex-1 flex justify-center">
          <div className="w-72 h-80 md:w-80 md:h-96 rounded-2xl bg-gray-200 overflow-hidden shadow">
            <img
              src="/about.jpg" 
              alt="about"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
