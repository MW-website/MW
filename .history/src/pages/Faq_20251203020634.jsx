import React from "react";

export default function FAQ() {
  return (
    <main className="container py-12">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-[var(--font-serif)]">FAQ</h1>
        <p className="text-sm text-[var(--color-mw-muted)]">Common questions answered</p>
      </header>

      <section className="space-y-4">
        <details className="glass-card p-4">
          <summary className="font-medium">How long does shipping take?</summary>
          <p className="mt-2 text-slate-700">Usually 3–7 business days — depends on your location.</p>
        </details>

        <details className="glass-card p-4">
          <summary className="font-medium">What is the return policy?</summary>
          <p className="mt-2 text-slate-700">You can return items within 14 days in original condition.</p>
        </details>
      </section>
    </main>
  );
}
