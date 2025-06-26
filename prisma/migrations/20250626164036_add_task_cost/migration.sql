/*
  Warnings:

  - Added the required column `taskCost` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "taskCost" INTEGER NOT NULL;
