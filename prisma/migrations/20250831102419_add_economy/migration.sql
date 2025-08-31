-- CreateTable
CREATE TABLE "public"."Economy" (
    "userId" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "bank" INTEGER NOT NULL DEFAULT 0,
    "lastDaily" TIMESTAMP(3),
    "lastWeekly" TIMESTAMP(3),
    "lastMonthly" TIMESTAMP(3),
    "lastWork" TIMESTAMP(3),
    "lastRob" TIMESTAMP(3),
    "lastCrime" TIMESTAMP(3),

    CONSTRAINT "Economy_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Economy_userId_key" ON "public"."Economy"("userId");
