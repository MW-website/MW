/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 16:05:49
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
// src/pages/Home.jsx
import React from "react";
import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import LatestProducts from "../components/home/LatestProducts";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-joelle-beige)]">
      <Hero />
      <AboutSection />
      <LatestProducts />
    </div>
  );
}
