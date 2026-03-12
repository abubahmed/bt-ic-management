/*
  Warnings:

  - You are about to drop the column `authorEmail` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `authorName` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `authorEmail` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `authorName` on the `Resource` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "authorEmail",
DROP COLUMN "authorName",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "fullName",
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "authorEmail",
DROP COLUMN "authorName",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
