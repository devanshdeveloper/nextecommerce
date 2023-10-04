"use client";

import { useCart } from "@/contextProviders";
import { useState } from "react";

function AddToCart({ productId, ...props }) {
  // hooks
  const {
    addToCart,
    getProductQuantityById,
    setCartQuantity,
    setCurrentQuantity,
  } = useCart();

  // variables
  const quantity = getProductQuantityById(productId);

  // state
  const [isCartLoading, setIsCartLoading] = useState(false);

  // handlers
  async function handleAddToCart() {
    setIsCartLoading(true);
    await addToCart(productId);
    setIsCartLoading(false);
  }
  // const debounceUpdateQuantity = debounce(async (newQuantity) => {
  //   console.log("debouce quantity", quantity, "newquantity", newQuantity);
  // }, 3000);

  async function handleQuantityChange(newQuantity) {
    console.log("quantity", quantity, "newquantity", newQuantity);
    setIsCartLoading(true);
    setCurrentQuantity(productId, newQuantity);
    await setCartQuantity(productId, newQuantity);
    setIsCartLoading(false);
  }

  return quantity === null ? (
    <button onClick={handleAddToCart} disabled={isCartLoading} {...props}>
      Add To Cart
    </button>
  ) : (
    <div>
      <button
        className="py-1 px-2 rounded btn-default"
        disabled={isCartLoading}
        onClick={() => handleQuantityChange(quantity - 1)}
      >
        -
      </button>
      <input
        type="number"
        value={getProductQuantityById(productId)}
        onChange={(e) => setCurrentQuantity(productId, +e.target.value)}
        onBlur={(e) => handleQuantityChange(e.target.value)}
        disabled={isCartLoading}
        className="text-center w-10"
      />
      <button
        className="py-1 px-2 rounded btn-default"
        disabled={isCartLoading}
        onClick={() => handleQuantityChange(quantity + 1)}
      >
        +
      </button>
    </div>
  );
}

export default AddToCart;
