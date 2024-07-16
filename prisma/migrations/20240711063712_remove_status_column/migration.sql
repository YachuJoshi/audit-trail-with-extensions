/*
  Warnings:

  - You are about to drop the column `status` on the `AuditTrail` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `ProductAuditTrail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AuditTrail" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "ProductAuditTrail" DROP COLUMN "status";

-- DropEnum
DROP TYPE "AuditStatus";
