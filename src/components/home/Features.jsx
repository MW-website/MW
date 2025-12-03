import React from "react";

export default function Features() {
  return (
    <section className="container py-12 gsap-reveal">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-soft)] text-center">
          <h4 className="font-medium mb-2">Quality Craftsmanship</h4>
          <p className="text-sm text-slate-600">Thoughtful tailoring and premium materials for pieces that last.</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-soft)] text-center">
          <h4 className="font-medium mb-2">Sustainable Fabrics</h4>
          <p className="text-sm text-slate-600">We prioritize eco-friendly sourcing and low-impact manufacturing.</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-soft)] text-center">
          <h4 className="font-medium mb-2">Hassle-free Returns</h4>
          <p className="text-sm text-slate-600">Free returns within 30 days and attentive customer support.</p>
        </div>
      </div>
    </section>
  );
}
