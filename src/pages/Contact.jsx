import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.main
      id="contact"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-[var(--color-mw-beige)] pt-32 pb-20"
    >
      <div className="container">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl font-light mb-4"
            style={{ 
              fontFamily: 'var(--font-serif)',
              letterSpacing: '-0.02em',
              color: '#0f1724'
            }}
          >
            Get in Touch
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Say hello — we&apos;d love to hear from you
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto"
        >
          {/* Contact Form Card */}
          <div className="glass-card p-8 md:p-10">
            <h2 
              className="text-2xl md:text-3xl font-light mb-6"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Send a Message
            </h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700">Your Name</label>
                <input 
                  className="w-full px-4 py-3 border border-slate-300 rounded-md focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition outline-none bg-white" 
                  placeholder="Enter your name" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700">Email Address</label>
                <input 
                  className="w-full px-4 py-3 border border-slate-300 rounded-md focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition outline-none bg-white" 
                  placeholder="your@email.com" 
                  type="email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700">Message</label>
                <textarea 
                  className="w-full px-4 py-3 border border-slate-300 rounded-md focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition h-40 resize-none outline-none bg-white" 
                  placeholder="How can we help you?" 
                />
              </div>
              <button 
                type="submit"
                className="w-full px-8 py-4 bg-black text-white rounded-md text-sm tracking-wide font-medium hover:bg-slate-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info Card */}
          <div className="space-y-6">
            <div className="glass-card p-8">
              <h3 
                className="text-2xl font-light mb-4"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Visit Us
              </h3>
              <p className="text-slate-600 leading-relaxed">
                123 Rue de Luxe<br />
                Paris, France 75008
              </p>
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm font-medium text-slate-700 mb-2">Opening Hours</p>
                <p className="text-slate-600">
                  Monday – Saturday<br />
                  11:00 AM — 7:00 PM
                </p>
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 
                className="text-2xl font-light mb-4"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Connect
              </h3>
              <div className="space-y-3">
                <p className="text-slate-600">
                  <span className="text-sm text-slate-500 block mb-1">Email</span>
                  care@yourbrand.com
                </p>
                <p className="text-slate-600">
                  <span className="text-sm text-slate-500 block mb-1">Phone</span>
                  +33 1 23 45 67 89
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.main>
  );
}