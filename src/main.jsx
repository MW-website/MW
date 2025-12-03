/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 01/12/2025 - 14:04:13
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/12/2025
    * - Author          : fortu
    * - Modification    : 
**/
// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import Toast from "./components/Toast";
import "./styles/globals.css";

function AppWithToast() {
  const { toast, hideToast } = useToast();

  return (
    <>
      <App />
      <Toast show={toast.show} message={toast.message} onClose={hideToast} />
    </>
  );
}

// Hook must be used inside provider, so we wrap it
import { useToast } from "./context/ToastContext";

function AppWithProviders() {
  const { toast, hideToast } = useToast();
  return (
    <>
      <App />
      <Toast show={toast.show} message={toast.message} onClose={hideToast} />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <AppWithProviders />
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);
