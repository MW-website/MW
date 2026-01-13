/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 03/12/2025 - 01:42:39
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
/**
    * @description      : Enhanced showcase section with improved write-up
    * @author           : fortu
    * @created          : 03/12/2025 - 01:41:05
    * 
    * MODIFICATION LOG
    * - Version         : 1.1.0
    * - Date            : 03/12/2025
    * - Modification    : Added refined descriptive text for brand storytelling
**/
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Showcase() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;

    if (left) {
      gsap.fromTo(
        left,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: left, start: "top 85%" },
        }
      );
    }

    if (right) {
      gsap.fromTo(
        right,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: right, start: "top 85%" },
        }
      );
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="container py-16">
      <div className="grid lg:grid-cols-3 gap-8 items-center">
        <div className="lg:col-span-1">
          <h3 className="text-3xl md:text-4xl font-serif tracking-tight">Movement & Details</h3>

          <p className="text-slate-600 leading-relaxed">
            Every piece tells a story. From the fall of the fabric to the softness of its texture,
            these subtle details make a garment feel truly alive.
          </p>

          <p className="text-slate-600 leading-relaxed">
            As you scroll, the imagery reveals how each design moves with you.
            This goes beyond simply seeing a product. It's about experiencing its flow, character, and unique attitude.
          </p>

          <p className="text-slate-600 leading-relaxed">
            Whether it's the elegance of a sleeve, the contour of a silhouette, or the richness of a pattern,
            these moments capture what makes each piece exceptional.
          </p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            ref={leftRef}
            className="rounded-xl overflow-hidden shadow-lg bg-gray-50"
          >
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop"
              alt="show1"
              className="w-full h-96 object-cover"
            />
          </div>

          <div
            ref={rightRef}
            className="rounded-xl overflow-hidden shadow-lg bg-gray-50"
          >
            <img
              src="https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=800&auto=format&fit=crop"
              alt="show2"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
