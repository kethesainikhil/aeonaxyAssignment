/*
  Warnings:

  - You are about to drop the column `location` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "location";

-- CreateTable
CREATE TABLE "Userspecificdetails" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Userspecificdetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Userspecificdetails" ADD CONSTRAINT "Userspecificdetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
