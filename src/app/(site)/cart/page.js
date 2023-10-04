"use client";

import { useSession } from "next-auth/react";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/contextProviders";
import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import Alert from "@/components/Alert";
import { createOrder } from "../../../../sanity/utils";
import { fetcher } from "@/utils";
import Loader from "@/components/Loader";

export default function Page() {
  // hooks
  const { data } = useSession();
  const { cartItems, emptyCart, getTotalAmount } = useCart();

  // state
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [alert, setAlert] = useState();

  // handlers
  async function initiatePayment(amount) {
    const res = await fetch(`/api/razorpay?amount=${amount}`, {
      method: "POST",
    });
    const razorpay = await res.json();
    if (razorpay.error) {
      setAlert({ text: razorpay.error.description });
      return;
    }
    new window.Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      name: "Ecommerce App",
      currency: razorpay.currency,
      amount: razorpay.amount,
      order_id: razorpay.id,
      description: "Thank You...",
      image: "https://devanshdeveloper.vercel.app/profile.png",
      async handler(res) {
        const orderCreated = await fetcher("/api/order", {
          method: "POST",
          body: JSON.stringify({
            userId: data.user.id,
            amount: razorpay.amount,
            products: { create: cartItems },
            // razorpay_order_id
            // razorpay_payment_id
            // razorpay_signature
            ...res,
          }),
        });
        console.log(orderCreated);
      },
      // prefill: {
      //   name: "Manu Arora",
      //   email: "manuarorawork@gmail.com",
      //   contact: "9999999999",
      // },
    }).open();
  }

  // jsx
  if (!data) return <Loader />;

  if (!cartItems)
    return (
      <div className="wrapper">
        <span className="text-xl text-center">Finding your products...</span>
      </div>
    );

  if (!cartItems.length)
    return (
      <div className="wrapper">
        <span className="text-xl text-center">
          Hey there, your cart is looking a bit lonely - lets fill it up and
          make it a shopping spree to remember!
        </span>
        <Link href="/shop" className="btn btn-default">
          Move to shop !
        </Link>
      </div>
    );

  // variables
  const totalAmount = getTotalAmount();

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setIsRazorpayLoaded(true)}
      />
      <div className="w-[min(90vw,1000px)] mx-auto">
        <div className="p-10 flex gap-10 flex-col items-start">
          <div>
            <button
              className="btn btn-default"
              onClick={() => emptyCart(data.user.id)}
            >
              Clear Cart
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {cartItems.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
          <div className="flex justify-between">
            Cart Total : Rs. {totalAmount}
          </div>
          <button
            disabled={!isRazorpayLoaded}
            className="btn btn-default w-auto"
            onClick={() => initiatePayment(totalAmount)}
          >
            Pay Now
          </button>
        </div>
      </div>
      <Alert {...alert} {...{ setAlert }} />
    </>
  );
}
