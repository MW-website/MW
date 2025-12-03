import React from "react";

export default function Contact() {
  return (
  
      <header className="text-center mb-16">
        <h1 
          className="text-6xl md:text-7xl font-normal tracking-tight"
          style={{ 
            fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
            color: '#1a1a1a',
            letterSpacing: '-0.02em'
          }}
        >
          Contact
        </h1>
        <p className="mt-4 text-base text-[#666666] tracking-wide">
          Say hello — we&apos;d love to hear from you
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <form className="bg-white border border-[#eaeaea] p-10 space-y-6 rounded-none">
          <input 
            className="w-full px-5 py-4 border border-gray-300 focus:border-black transition" 
            placeholder="Your name" 
          />
          <input 
            className="w-full px-5 py-4 border border-gray-300 focus:border-black transition" 
            placeholder="Email" 
            type="email"
          />
          <textarea 
            className="w-full px-5 py-4 border border-gray-300 focus:border-black transition h-48 resize-none" 
            placeholder="Message" 
          />
          <button className="w-full px-8 py-5 bg-black text-white text-sm tracking-wider font-medium hover:bg-gray-900 transition">
            SEND MESSAGE
          </button>
        </form>

        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h3 
              className="text-2xl mb-4"
              style={{ fontFamily: '"Cormorant Garamond", serif', color: '#1a1a1a' }}
            >
              Visit Us
            </h3>
            <p className="text-[#666666] leading-relaxed">
              123 Rue de Luxe<br />
              Paris, France 75008<br /><br />
              Monday–Saturday<br />
              11:00 — 19:00
            </p>
          </div>

          <div>
            <h3 
              className="text-2xl mb-4"
              style={{ fontFamily: '"Cormorant Garamond", serif', color: '#1a1a1a' }}
            >
              Connect
            </h3>
            <p className="text-[#666666]">
              care@yourbrand.com<br />
              +33 1 23 45 67 89
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}