/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 15:29:34
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
// src/components/product/SpecsAccordion.jsx
import React, { useState } from "react";

export default function SpecsAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="w-full text-left py-3 flex justify-between items-center border-b"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="font-medium">Details & Care</span>
        <span>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="py-4 text-sm text-slate-600 leading-relaxed">
          High-quality material, soft feel, durable stitching, and premium finish.
        </div>
      )}
    </div>
  );
}
