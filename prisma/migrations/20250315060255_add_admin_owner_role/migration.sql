/*
  Warnings:

  - You are about to drop the column `nome` on the `Usuario` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "nome",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
