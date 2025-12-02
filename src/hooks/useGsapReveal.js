/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 14:22:04
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
// src/hooks/useGsapReveal.js
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP Scroll-Reveal Hook
 * Applies fade-in + upward motion on scroll for elements matching the selector.
 *
 * Usage:
 *   useGsapReveal(".gsap-reveal");
 */
export default function useGsapReveal(selector = ".gsap-reveal") {
  useEffect(() => {
    const elements = gsap.utils.toArray(selector);

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [selector]);
}
