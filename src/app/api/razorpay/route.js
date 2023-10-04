import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const amount = +searchParams.get("amount");
  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });
  try {
    const orderRes = await razorpay.orders.create({
      amount: (amount * 100).toString(),
      currency: "INR",
      receipt: shortid.generate(),
      payment_capture: 1,
    });
    return NextResponse.json(orderRes, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: err.statusCode });
  }
}
