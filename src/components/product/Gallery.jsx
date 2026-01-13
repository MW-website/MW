/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 15:28:43
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
// src/components/product/Gallery.jsx
import React, { useState } from "react";

export default function Gallery({ images }) {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="aspect-[4/5] w-full rounded-xl overflow-hidden bg-slate-100">
        <img
          src={images[active]}
          alt="product"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            className={`aspect-square rounded-lg overflow-hidden border ${
              active === i ? "border-black" : "border-transparent"
            }`}
            onClick={() => setActive(i)}
          >
            <img
              src={src}
              className="w-full h-full object-cover"
              alt="thumb"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
