"use client";

import { useSession } from "next-auth/react";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/contextProviders";

export default function Page() {
  const { data } = useSession();
  const { cartItems } = useCart();

  if (!data) return <div>loading</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 p-10 gap-10">
      {cartItems.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  );
}
