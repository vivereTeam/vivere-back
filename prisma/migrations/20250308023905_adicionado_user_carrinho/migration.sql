/*
  Warnings:

  - You are about to drop the column `categoriaId` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the `Categoria` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoria` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoriaEnum" AS ENUM ('SHOWS_ENTRETENIMENTO', 'WORKSHOPS_AULAS', 'VIAGENS_TURISMO', 'AVENTURA_ADRENALINA', 'RELAXAMENTO_BEM_ESTAR', 'GASTRONOMIA_DEGUSTACOES', 'INFANTIL_FAMILIAR', 'EXPERIENCIAS_PERSONALIZADAS');

-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_categoriaId_fkey";

-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "categoriaId",
ADD COLUMN     "categoria" "CategoriaEnum" NOT NULL,
ADD COLUMN     "preco" DOUBLE PRECISION DEFAULT 0,
ALTER COLUMN "imagemUrl" SET DEFAULT 'https://exemplo.com/placeholder.jpg';

-- DropTable
DROP TABLE "Categoria";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carrinho" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Carrinho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarrinhoItem" (
    "id" SERIAL NOT NULL,
    "carrinhoId" INTEGER NOT NULL,
    "eventoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "CarrinhoItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Carrinho_usuarioId_key" ON "Carrinho"("usuarioId");

-- AddForeignKey
ALTER TABLE "Carrinho" ADD CONSTRAINT "Carrinho_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrinhoItem" ADD CONSTRAINT "CarrinhoItem_carrinhoId_fkey" FOREIGN KEY ("carrinhoId") REFERENCES "Carrinho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrinhoItem" ADD CONSTRAINT "CarrinhoItem_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
