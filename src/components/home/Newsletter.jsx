import React from "react";

export default function Newsletter() {
  return (
    <section className="container py-12 gsap-reveal">
      <div className="bg-white rounded-xl shadow-[var(--shadow-soft)] p-8 md:p-12 text-center">
        <h4 className="text-xl font-medium mb-2">Join the MW List</h4>
        <p className="text-sm text-slate-600 mb-6">Sign up to receive early access to new collections and exclusive offers.</p>

        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input aria-label="Email" type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 border rounded-md" />
          <button type="submit" className="px-6 py-3 bg-black text-white rounded-md">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
