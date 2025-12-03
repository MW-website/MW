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
          <h3 className="text-xl font-medium mb-3">Movement & Details</h3>

          <p className="text-slate-600 mb-4">
            Every piece tells a story — from the fall of the fabric to the softness of its texture.
            This section captures those subtle, intimate details that make a garment feel alive.
          </p>

          <p className="text-slate-600 mb-4">
            As you scroll, the imagery shifts gently to showcase how each design moves with you.
            This isn’t just about seeing the product; it’s about experiencing its flow, character, and attitude.
          </p>

          <p className="text-slate-600">
            Whether it’s the elegance of a sleeve, the contour of a silhouette, or the richness of a pattern,
            these moments highlight what makes each piece worth owning.
          </p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            ref={leftRef}
            className="rounded-xl overflow-hidden shadow-lg bg-gray-50"
          >
            <img
              src="https://t4.ftcdn.net/jpg/15/39/21/03/360_F_1539210391_7uYSJbjKYjnnEv2pBu95QH8pSzaVW5bX.jpg"
              alt="show1"
              className="w-full h-96 object-cover"
            />
          </div>

          <div
            ref={rightRef}
            className="rounded-xl overflow-hidden shadow-lg bg-gray-50"
          >
            <img
              src="https://media.istockphoto.com/id/1393067622/photo/african-black-woman-in-red-silk-headscarf-fashion-dark-skinned-model-portrait-in-turban-with.jpg?s=612x612&w=0&k=20&c=z4GcCX0IN3jTPk-jDBMrc-5_NzSxxTrqhhf_x_QbFFY="
              alt="show2"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
