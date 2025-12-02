/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 14:08:41
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
// src/components/shop/QuickViewModal.jsx
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../../context/CartContext";

export default function QuickViewModal({ product, onClose }) {
  const { addItem } = useCart();

  useEffect(() => {
    const close = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">{product.name}</h2>
          <button onClick={onClose} className="text-xl">×</button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-6 p-4">
          
          {/* Image */}
          <div className="flex-1">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-md w-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <p className="text-gray-600">{product.short}</p>

            <div className="text-lg font-semibold">
              ₦{product.price.toLocaleString()}
            </div>

            <div className="flex gap-3">
              {product.colors.map((c, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: c }}
                ></div>
              ))}
            </div>

            <button
              onClick={() => {
                addItem(product, 1);
                onClose();
              }}
              className="px-4 py-2 bg-black text-white rounded-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

    </div>,
    document.body
  );
}
