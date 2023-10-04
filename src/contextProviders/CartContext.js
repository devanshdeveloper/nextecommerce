import { fetcher } from "@/utils";
import { createContext, useEffect, useState } from "react";
import { getProductsById } from "../../sanity/utils";
import { useSession } from "next-auth/react";
export const CartContext = createContext();

export default function CartProvider({ children }) {
  // hooks
  const { data } = useSession();
  // state
  const [cartItems, setCartItems] = useState(null);

  async function getCartItems() {
    if (!data) return;
    const cartList = await fetcher(`/api/cart?userId=${data.user.id}`, {
      method: "GET",
    });
    const productIds = cartList.map((cartItem) => cartItem.productId);
    const products = await getProductsById(productIds);
    const cartProducts = products.map((product) => ({
      ...product,
      quantity: cartList.find((cartItem) => cartItem.productId === product._id)
        .quantity,
    }));
    setCartItems(cartProducts);
  }

  useEffect(() => {
    getCartItems();
  }, [data]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCurrentQuantity(productId, quantity) {
          const newCartItems = [...cartItems];
          newCartItems[
            cartItems.findIndex((cartItem) => cartItem._id === productId)
          ].quantity = quantity;
          console.log(quantity, newCartItems);
          setCartItems(newCartItems);
        },
        getProductQuantityById(productId) {
          return (
            cartItems?.find((cartItem) => cartItem._id === productId)
              ?.quantity ?? null
          );
        }, 
        getTotalAmount() {
          return cartItems.reduce((acc, e) => acc + e.price * e.quantity, 0)
        },
        async addToCart(productId) {
          await fetcher(
            `/api/cart?userId=${data.user.id}&productId=${productId}`,
            {
              method: "POST",
            }
          );
          await getCartItems();
        },
        async removeCartItem(productId) {
          await fetcher(
            `/api/cart?userId=${data.user.id}&productId=${productId}`,
            {
              method: "DELETE",
            }
          );
          getCartItems();
        },
        async emptyCart() {
          await fetcher(`/api/cart?userId=${data.user.id}`, {
            method: "DELETE",
          });
          getCartItems();
        },
        async setCartQuantity(productId, newQuantity) {
          console.log("running cart quantity", newQuantity);
          if (newQuantity === null) return;
          await fetcher(
            `/api/cart?userId=${data.user.id}&productId=${productId}&quantity=${newQuantity}`,
            {
              method: newQuantity === 0 ? "DELETE" : "PUT",
            }
          );
        await  getCartItems();
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
