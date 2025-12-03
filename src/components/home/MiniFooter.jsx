import React from "react";
import { FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";

export default function MiniFooter() {
  // Render a spacer to push page content above the fixed footer
  return (
    <>
      <div className="mini-footer-spacer" aria-hidden="true" />

      <footer className="mini-footer-fixed bg-white/80 border-t border-gray-100 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-4">
            <span className="luxury tracking-wide text-sm text-gray-900">MW</span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-3">
            <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-gray-800"><FiInstagram /></a>
            <a href="#" aria-label="Twitter" className="text-gray-600 hover:text-gray-800"><FiTwitter /></a>
            <a href="#" aria-label="Facebook" className="text-gray-600 hover:text-gray-800"><FiFacebook /></a>
          </div>
        </div>
      </footer>
    </>
  );
}
