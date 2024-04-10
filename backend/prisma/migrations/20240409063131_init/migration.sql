/*
  Warnings:

  - Added the required column `location` to the `Userspecificdetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Userspecificdetails" ADD COLUMN     "location" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserInterests" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "interest" TEXT NOT NULL,

    CONSTRAINT "UserInterests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserInterests" ADD CONSTRAINT "UserInterests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
