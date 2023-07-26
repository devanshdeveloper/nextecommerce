import { prisma } from "../../../../lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
  });
  return NextResponse.json(cartItems, { status: 200 });
}
export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  const userId = searchParams.get("userId");
  const addedToCart = await prisma.cartItem.create({
    data: { userId, productId },
  });
  return NextResponse.json(addedToCart, { status: 200 });
}
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  const userId = searchParams.get("userId");
  if (!userId) return;
  if (!productId) {
    const deletedCart = await prisma.cartItem.deleteMany({ where: { userId } });
    return NextResponse.json(deletedCart, { status: 200 });
  }
  console.log(productId, userId);
  const deletedCart = await prisma.cartItem.deleteMany({
    where: { userId, productId },
  });
  return NextResponse.json(deletedCart, { status: 200 });
}
