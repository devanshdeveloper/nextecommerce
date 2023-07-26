"use client";

import { useCart } from "@/contextProviders";
import { useSession } from "next-auth/react";

function AddToCart({ productId, quantity, ...props }) {
  const { data } = useSession();
  const { addToCart } = useCart();

  return quantity ? (
    <button {...props} onClick={() => addToCart(data.user.id, productId)}>
      Add To Cart
    </button>
  ) : (
    <div></div>
  );
}

export default AddToCart;
