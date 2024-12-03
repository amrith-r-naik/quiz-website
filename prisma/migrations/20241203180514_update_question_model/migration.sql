/*
  Warnings:

  - You are about to drop the column `correctOptionId` on the `Question` table. All the data in the column will be lost.
  - Added the required column `isCorrect` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_correctOptionId_fkey";

-- DropIndex
DROP INDEX "Question_correctOptionId_key";

-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "isCorrect" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "correctOptionId";
