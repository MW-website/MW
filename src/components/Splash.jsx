import React from "react";
import "../styles/Splash.css";



import { FiShoppingBag } from "react-icons/fi";

const Splash = () => (
  <div className="splash-mw-theme">
    <div className="splash-mw-card glass-card">
      <div className="splash-mw-bounce-wrap">
        <FiShoppingBag size={60} className="splash-mw-icon" />
        <span className="splash-mw-title font-serif bounce">MW</span>
      </div>
      <div className="splash-mw-loader-bar">
        <div className="splash-mw-loader-bar-inner"></div>
      </div>
      <div className="splash-mw-tagline">Quiet luxury for modern living</div>
    </div>
  </div>
);

export default Splash;
