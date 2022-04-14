-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "completed" SET DEFAULT false;
