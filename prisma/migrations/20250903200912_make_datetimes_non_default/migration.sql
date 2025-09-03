/*
  Warnings:

  - Made the column `lastDaily` on table `Economy` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastWeekly` on table `Economy` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastWork` on table `Economy` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastRob` on table `Economy` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastCrime` on table `Economy` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Economy" ALTER COLUMN "lastDaily" SET NOT NULL,
ALTER COLUMN "lastDaily" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "lastWeekly" SET NOT NULL,
ALTER COLUMN "lastWeekly" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "lastWork" SET NOT NULL,
ALTER COLUMN "lastWork" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "lastRob" SET NOT NULL,
ALTER COLUMN "lastRob" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "lastCrime" SET NOT NULL,
ALTER COLUMN "lastCrime" SET DEFAULT '1970-01-01 00:00:00 +00:00';
