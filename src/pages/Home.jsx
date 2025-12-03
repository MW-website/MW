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
import useGsapReveal from "../hooks/useGsapReveal";
import AppleHero from "../components/home/AppleHero";
import Showcase from "../components/home/Showcase";
import Collections from "../components/home/Collections";
import Features from "../components/home/Features";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/home/Footer";

export default function Home() {
  useGsapReveal(".gsap-reveal");

  return (
    <main className="min-h-screen bg-[var(--color-mw-beige)] text-gray-800">
      <AppleHero />
      <Showcase />
      <Collections />
      <Features />
      <Newsletter />
      <Footer />
    </main>
  );
}
