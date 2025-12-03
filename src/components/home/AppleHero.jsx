/**
 * @description      : 
 * @author           : fortu
 * @group            : 
 * @created          : 03/12/2025 - 01:26:04
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 03/12/2025
 * - Author          : fortu
 * - Modification    : Hero mobile spacing fix
 **/
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AppleHero() {
  const imageRef = useRef(null);

  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: -30 },
      {
        y: 30,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* FIX APPLIED HERE → pt-24 for mobile breathing room */}
      <div className="container pt-24 pb-12 md:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          <div className="px-4 md:px-0">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight mb-4">
              MW — Refined. Minimal. Modern.
            </h1>
            <p className="text-sm md:text-base text-slate-600 mb-6 max-w-xl">
              An elevated collection inspired by quiet luxury. Clean silhouettes, luxurious fabrics and a focus on fit. See the new season with movement and light.
            </p>

            <div className="flex gap-3">
              <Link
                to="/shop"
                className="px-5 py-3 bg-black text-white rounded-md text-sm font-medium shadow"
              >
                Shop the Collection
              </Link>
              <Link
                to="/shop?filter=featured"
                className="px-5 py-3 border border-slate-200 rounded-md text-sm"
              >
                Featured
              </Link>
            </div>

            <div className="mt-8 text-xs text-slate-500">
              Free shipping and returns. Sustainable packaging. Support available 7 days a week.
            </div>
          </div>

          <div className="relative px-4 md:px-0">
            <div className="w-full h-[420px] md:h-[560px] rounded-xl overflow-hidden shadow-lg bg-gray-100">
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=1"
                alt="product"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="h-24 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src="https://www.shutterstock.com/image-photo/vneck-tshirt-white-woman-posing-260nw-2626556561.jpg"
                  alt="thumb"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-24 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src="https://t3.ftcdn.net/jpg/03/42/33/30/360_F_342333059_uHmlonRd8AIkCmCjB6VIuvBwaXoV2r6n.jpg"
                  alt="thumb2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-24 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src="https://www.universalstandard.com/cdn/shop/files/USPA1557C_665_Palais_Wide_Leg_Pants_Pony_001_0497.jpg?v=1734621455&width=2000"
                  alt="thumb3"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
