-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "payment_status" TEXT,
    "shipping_status" TEXT,
    "amount" INTEGER NOT NULL,
    "razorpay_order_id" TEXT NOT NULL,
    "razorpay_payment_id" TEXT NOT NULL,
    "razorpay_signature" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("amount", "createdAt", "id", "payment_status", "razorpay_order_id", "razorpay_payment_id", "razorpay_signature", "shipping_status", "updatedAt", "userId") SELECT "amount", "createdAt", "id", "payment_status", "razorpay_order_id", "razorpay_payment_id", "razorpay_signature", "shipping_status", "updatedAt", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
