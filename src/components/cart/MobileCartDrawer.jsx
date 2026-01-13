/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 14:30:51
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
// src/components/cart/MobileCartDrawer.jsx
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function MobileCartDrawer({ open, onClose }) {
  const drawerRef = useRef();
  const overlayRef = useRef();

  const { items, updateQuantity, removeItem, total } = useCart();

  useEffect(() => {
    if (open) {
      // Disable scrolling
      document.body.style.overflow = "hidden";

      // Animate in
      gsap.fromTo(
        drawerRef.current,
        { x: "100%" },
        { x: 0, duration: 0.35, ease: "power3.out" }
      );

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "auto";
    }
  }, [open]);

  if (!open) return null;

  return createPortal(
    <>
      {/* DARK OVERLAY */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
      ></div>

      {/* DRAWER */}
      <div
        ref={drawerRef}
        className="fixed right-0 top-0 h-full w-[85%] max-w-[380px] bg-white z-50 shadow-xl p-5 flex flex-col"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-lg">Your Cart</h2>
          <button onClick={onClose} className="text-2xl leading-none">×</button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {items.length === 0 && (
            <p className="text-sm text-gray-500">Your cart is empty.</p>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 border-b pb-3"
            >
              <img
                src={item.image}
                className="w-14 h-14 object-cover rounded-md"
              />

              <div className="flex-1">
                <div className="font-medium text-sm">{item.name}</div>
                <div className="text-xs text-gray-500">
                  ${item.price.toLocaleString()}
                </div>

                {/* QUANTITY */}
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="px-2 py-1 border rounded-md text-xs"
                  >
                    -
                  </button>

                  <span className="text-sm">{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 border rounded-md text-xs"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-xl leading-none px-2"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        {items.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-sm font-medium mb-3">
              <span>Total:</span>
              <span>${total.toLocaleString()}</span>
            </div>

            <Link
              to="/checkout"
              onClick={onClose}
              className="block text-center px-4 py-3 bg-black text-white rounded-md text-sm"
            >
              Go to Checkout
            </Link>
          </div>
        )}
      </div>
    </>,
    document.body
  );
}
