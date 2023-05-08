/*
  Warnings:

  - You are about to drop the column `successorId` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[predecessorrId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_successorId_fkey";

-- DropIndex
DROP INDEX "Post_successorId_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "successorId",
ADD COLUMN     "predecessorrId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Post_predecessorrId_key" ON "Post"("predecessorrId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_predecessorrId_fkey" FOREIGN KEY ("predecessorrId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
