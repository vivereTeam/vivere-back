-- CreateEnum
CREATE TYPE "CardSize" AS ENUM ('NORMAL', 'LARGE');

-- AlterTable
ALTER TABLE "Evento" ADD COLUMN     "cardSize" "CardSize" NOT NULL DEFAULT 'NORMAL';
