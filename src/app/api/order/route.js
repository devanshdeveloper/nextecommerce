import { prisma } from "../../../../lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const orders = await prisma.order.findMany(
    userId
      ? {
          where: { userId },
        }
      : {}
  );
  return NextResponse.json(orders, { status: 200 });
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body);
    const createdOrder = await prisma.order.create({
      data: body,
    });
    return NextResponse.json(body, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}
export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  const userId = searchParams.get("userId");
  const quantity = +searchParams.get("quantity");
  const updatedCart = await prisma.cartItem.updateMany({
    where: { userId, productId },
    data: { quantity },
  });
  return NextResponse.json(updatedCart, { status: 200 });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  const userId = searchParams.get("userId");
  console.log(productId, userId);
  if (!userId) return;
  const deletedCart = await prisma.cartItem.deleteMany({
    where: productId ? { userId, productId } : { userId },
  });
  return NextResponse.json(deletedCart, { status: 200 });
}
