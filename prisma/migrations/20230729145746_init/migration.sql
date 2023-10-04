/*
  Warnings:

  - Made the column `userId` on table `CartItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN "phoneNumber" INTEGER;
ALTER TABLE "users" ADD COLUMN "shippingAddress" TEXT;

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "payment_status" TEXT NOT NULL,
    "shipping_status" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "razorpay_order_id" TEXT NOT NULL,
    "razorpay_payment_id" TEXT NOT NULL,
    "razorpay_signature" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CartItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "orderId" TEXT,
    CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CartItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CartItem" ("createdAt", "id", "productId", "quantity", "updatedAt", "userId") SELECT "createdAt", "id", "productId", "quantity", "updatedAt", "userId" FROM "CartItem";
DROP TABLE "CartItem";
ALTER TABLE "new_CartItem" RENAME TO "CartItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
