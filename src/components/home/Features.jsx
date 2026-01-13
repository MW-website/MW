import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Quality Craftsmanship",
    description: "Thoughtful tailoring and premium materials for pieces that last.",
    icon: "✦"
  },
  {
    title: "Sustainable Fabrics",
    description: "We prioritize eco-friendly sourcing and low-impact manufacturing.",
    icon: "◆"
  },
  {
    title: "Hassle-free Returns",
    description: "Free returns within 30 days and attentive customer support.",
    icon: "○"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export default function Features() {
  return (
    <section className="container py-16 md:py-24 gsap-reveal">
      <motion.div 
        className="grid md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center h-full">
              <motion.div 
                className="text-4xl mb-4 text-slate-900"
                whileHover={{ rotate: 180, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>
              <h4 className="font-serif text-xl mb-3">{feature.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
