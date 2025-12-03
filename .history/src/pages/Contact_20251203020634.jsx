import React from "react";

export default function Contact() {
  return (
    <main className="container py-12">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-[var(--font-serif)]">Contact</h1>
        <p className="text-sm text-[var(--color-mw-muted)]">Say hello — we&apos;d love to hear from you</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form className="glass-card p-6 space-y-4">
          <input className="w-full p-3 border rounded" placeholder="Your name" />
          <input className="w-full p-3 border rounded" placeholder="Email" />
          <textarea className="w-full p-3 border rounded h-36" placeholder="Message" />
          <button className="px-4 py-3 bg-black text-white rounded">Send Message</button>
        </form>

        <div>
          <h3 className="font-[var(--font-serif)] text-xl mb-3">Visit</h3>
          <p className="text-slate-700">Add your business address, hours or social links here.</p>
        </div>
      </section>
    </main>
  );
}
