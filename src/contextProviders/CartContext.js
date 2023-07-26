import { fetcher } from "@/utils";
import { createContext, useEffect, useState } from "react";
import { getProductById, getProductsById } from "../../sanity/utils";
import { useSession } from "next-auth/react";
export const CartContext = createContext();

export default function CartProvider({ children }) {
  // hooks
  const { data } = useSession();
  // state
  const [cartItems, setCartItems] = useState([]);

  async function getCartItems() {
    if (!data) return;
    const cartItems = await fetcher(`/api/cart?userId=${data.user.id}`, {
      method: "GET",
    });
    const productIds = cartItems.map((cartItem) => cartItem.productId);
    const products = await getProductsById(productIds);
    console.log(cartItems, productIds, products);
    setCartItems(
      products.map((product) => ({
        ...product,
        quantity: cartItems.find(
          (cartItem) => cartItem.productId === product._id
        ).quantity,
      }))
    );
  }

  useEffect(() => {
    getCartItems();
  }, [data]);

  console.log(cartItems);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        async addToCart(userId, productId) {
          const addedCartItem = await fetcher(
            `/api/cart?userId=${userId}&productId=${productId}`,
            {
              method: "POST",
            }
          );
          const product = await getProductById(productId);
          return setCartItems([...cartItems, { ...product, quantity: 1 }]);
        },
        async emptyCart(userId) {
          return fetch(`/api/cart?userId=${userId}`, {
            method: "DELETE",
          });
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
