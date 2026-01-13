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
import { motion } from "framer-motion";
import useGsapReveal from "../hooks/useGsapReveal";
import AppleHero from "../components/home/AppleHero";
import Showcase from "../components/home/Showcase";
import Featured from "../components/home/Featured";
import Collections from "../components/home/Collections";
import Features from "../components/home/Features";
import RecentlyViewed from "../components/home/RecentlyViewed";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/home/Footer";

export default function Home() {
  useGsapReveal(".gsap-reveal");

  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-[var(--color-mw-beige)] text-gray-800"
    >
      <AppleHero />
      <Showcase />
      <Featured />
      <Collections />
      <RecentlyViewed />
      <Features />
      <Newsletter />
      <Footer />
    </motion.main>
  );
}
