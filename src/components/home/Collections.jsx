/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 03/12/2025 - 01:03:42
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
import React from "react";
import { Link } from "react-router-dom";

const collections = [
  { id: 1, title: "New Arrivals", image: "https://media.istockphoto.com/id/854321536/photo/look-at-this-gorgeous-dress.jpg?s=612x612&w=0&k=20&c=UyxEiEddYEFQPAoopwYs-_8xJ5vp0vKE0Sl3GnrQpK8=" },
  { id: 2, title: "Shirts", image: "https://media.istockphoto.com/id/1385407171/photo/womens-hands-hold-many-shopping-bags-sale-season.jpg?s=612x612&w=0&k=20&c=PqVrARu_7IVCAS7FlpAdz6ONS_aqh0I1ylmUJaR7joE=" },
  { id: 3, title: "Dresses", image: "https://static.vecteezy.com/system/resources/previews/047/023/912/non_2x/row-of-dresses-hanging-on-rack-free-photo.jpeg" },
  { id: 4, title: "Accessories", image: "https://img.freepik.com/premium-photo/flat-lay-female-fashion-accessories-makeup-products-handbag-pastel-color-background_479776-1049.jpg" }
];

export default function Collections() {
  return (
    <section className="container py-12 gsap-reveal">
      <div className="text-center mb-8">
        <h3 className="text-lg tracking-wide">Shop by Collection</h3>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {collections.map((c) => (
          <Link to={`/shop?category=${encodeURIComponent(c.title)}`} key={c.id} className="group block rounded-xl overflow-hidden shadow-[var(--shadow-soft)] bg-white">
            <div className="h-60 overflow-hidden">
              <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-4">
              <div className="text-sm font-medium">{c.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
