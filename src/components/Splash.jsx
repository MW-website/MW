import { FiShoppingBag } from "react-icons/fi";
import { useEffect, useState } from "react";
import "../styles/Splash.css";

export default function Splash() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = Date.now();
    let duration = 3000 + Math.random() * 2000; // 3-5 seconds
    let raf;
    function animate() {
      let elapsed = Date.now() - start;
      let percent = Math.min(100, (elapsed / duration) * 100);
      setProgress(percent);
      if (percent < 100) raf = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="splash-mw-theme">
      <div className="splash-mw-card glass-card">
        <div className="splash-mw-bounce-wrap">
          <FiShoppingBag size={60} className="splash-mw-icon" />
          <span className="splash-mw-title font-serif bounce">Modern Wealth</span>
        </div>
        <div className="splash-mw-loader-bar">
          <div
            className="splash-mw-loader-bar-inner"
            style={{ width: `${progress}%`, transition: "width 0.2s linear" }}
          ></div>
        </div>
        <div className="splash-mw-tagline">Quiet luxury for modern living</div>
      </div>
    </div>
  );
}
