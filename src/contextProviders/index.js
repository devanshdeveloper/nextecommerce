"use client";

import { SessionProvider } from "next-auth/react";
import CartProvider, { CartContext } from "./CartContext";
import { useContext } from "react";

export function useCart() {
  return useContext(CartContext);
}

export default function ContextProviders({ children }) {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
}
