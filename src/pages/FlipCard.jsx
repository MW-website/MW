import React from "react";

export default function FlipCard({ frontText, backText }) {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        
        <div className="flip-card-front flex items-center justify-center 
          bg-[#e5d8c8] rounded-2xl shadow-md text-[#3b2f2a] font-bold text-xl">
          {frontText}
        </div>

        <div className="flip-card-back flex items-center justify-center 
          bg-[#3b2f2a] rounded-2xl shadow-md text-white font-semibold text-lg p-4">
          {backText}
        </div>

      </div>
    </div>
  );
}
