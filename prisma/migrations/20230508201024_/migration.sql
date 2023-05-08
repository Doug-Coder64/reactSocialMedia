/*
  Warnings:

  - You are about to drop the column `predecessorrId` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[predecessorId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_predecessorrId_fkey";

-- DropIndex
DROP INDEX "Post_predecessorrId_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "predecessorrId",
ADD COLUMN     "predecessorId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Post_predecessorId_key" ON "Post"("predecessorId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_predecessorId_fkey" FOREIGN KEY ("predecessorId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
