/*
  Warnings:

  - You are about to drop the `Userspecificdetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Userspecificdetails" DROP CONSTRAINT "Userspecificdetails_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "location" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "Userspecificdetails";
