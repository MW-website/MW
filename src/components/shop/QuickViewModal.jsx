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
import { useToast } from "../../context/ToastContext";

export default function QuickViewModal({ product, onClose }) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    // Disable background scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const close = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-2 sm:p-4 animate-fadeIn" onClick={handleBackdropClick}>

      <div className="bg-white w-full max-w-xs sm:max-w-lg md:max-w-2xl rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 animate-slideUp" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <h2 className="font-semibold text-lg sm:text-xl text-gray-900 line-clamp-2">{product.name}</h2>
          <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-700 transition cursor-pointer">×</button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-8 p-4 sm:p-6">

          {/* Image */}
          <div className="flex-1 mb-4 md:mb-0 max-w-[220px] mx-auto md:max-w-none">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg w-full h-auto object-cover shadow-md max-h-48 sm:max-h-64"
            />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Product Details</p>
              <p className="text-gray-700 leading-relaxed">{product.short}</p>
            </div>

            <div className="border-t pt-4">
              <p className="text-3xl font-bold text-gray-900">
                ${product.price.toLocaleString()}
              </p>
              {product.onSale && <p className="text-red-600 font-semibold text-sm mt-1">ON SALE</p>}
            </div>

            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews || 0} reviews)</span>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase mb-3">Colors</p>
              <div className="flex gap-3">
                {product.colors.map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-gray-300 hover:border-gray-800 transition cursor-pointer"
                    style={{ backgroundColor: c }}
                    title={c}
                  ></div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                addItem(product, 1);
                showToast("Added successfully!");
                onClose();
              }}
              className="w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition cursor-pointer font-semibold text-sm uppercase tracking-wide"
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
