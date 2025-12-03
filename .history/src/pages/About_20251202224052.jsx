import React from "react";
import AboutSection from "../components/home/AboutSection";
import { motion } from "framer-motion";

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
    <main className="min-h-screen bg-[var(--color-joelle-beige)]">
      <header className="container py-12 text-center">
        <h1 className="text-4xl font-[var(--font-serif)] mb-2">About MW</h1>
        <p className="text-sm text-[var(--color-joelle-muted)]">A calm, feminine boutique inspired layout</p>
        
        <div className="flex gap-2 justify-center mt-4">
          <MiniPill>UI</MiniPill>
          <MiniPill>Brand</MiniPill>
          <MiniPill>Illustration</MiniPill>
        </div>

        {/* subtle floating orb animation */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute -bottom-6 left-6 w-24 h-24 rounded-full bg-gradient-to-tr from-purple-300 to-pink-200 opacity-60 blur-xl"
        />
      </header>

      <AboutSection />

      <section className="container py-12 relative">
        <h2 className="text-2xl font-[var(--font-serif)] mb-6">Our Story</h2>
        <p className="text-slate-700 leading-relaxed max-w-3xl">This About page is a simple expansion of the home about block — add your bio, mission, and services here to match the template style.</p>
        <DecorativeShapes />
      </section>

      <Footer />
    </main>
  );
}


function MiniPill({ children }) {
  return (
    <div className="text-xs px-2 py-1 rounded-full bg-gray-100 border text-gray-600">
      {children}
    </div>
  );
}


function DecorativeShapes() {
return (
<>
<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 0.18 }}
className="pointer-events-none absolute -left-10 -top-10 w-56 h-56 rounded-full bg-gradient-to-tr from-rose-100 to-amber-100 blur-3xl"
/>


<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 0.12 }}
className="pointer-events-none absolute right-0 bottom-0 w-64 h-64 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 blur-3xl"
/>
</>
);
}


function Footer() {
return (
<footer className="max-w-7xl mx-auto px-6 py-12 text-center text-gray-500">
Built with care • MW boutique layout
</footer>
);
}