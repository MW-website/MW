/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 15:45:12
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
// src/components/home/LatestProducts.jsx
import React from "react";
import products from "../../data/products";
import { Link } from "react-router-dom";

export default function LatestProducts() {
  // pick first 3 products as "latest" for demo
  const latest = products.slice(0, 3);

  return (
    <section className="bg-[var(--color-mw-muted)] py-12 gsap-reveal">
      <div className="container">
        <div className="text-center mb-8">
          <h3 className="text-lg tracking-wide">NEW ARRIVALS</h3>
          <div className="h-1 w-0.5 mx-auto my-3 bg-slate-300" style={{height: '18px', width: '1px'}}></div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {latest.map((p) => (
            <article key={p.id} className="bg-white rounded-xl p-4 shadow-[var(--shadow-soft)] hover:shadow-lg transition">
              <div className="h-[220px] overflow-hidden rounded-md mb-3">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover"/>
              </div>
              <div className="text-sm font-medium">{p.name}</div>
              <div className="text-xs text-slate-500 mt-1">{p.category}</div>
              <div className="mt-3">
                <Link to={`/product/${p.slug}`} className="text-sm px-3 py-2 bg-black text-white rounded-md">View Product</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
