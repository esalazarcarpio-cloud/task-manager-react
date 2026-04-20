/*
  Warnings:

  - You are about to drop the column `state` on the `tareas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tareas" DROP COLUMN "state",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;
