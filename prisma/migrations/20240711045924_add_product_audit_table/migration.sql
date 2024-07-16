-- CreateTable
CREATE TABLE "ProductAuditTrail" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "AuditStatus" NOT NULL,
    "operation" "AuditOperation" NOT NULL,
    "oldData" JSONB,
    "newData" JSONB,

    CONSTRAINT "ProductAuditTrail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductAuditTrail_hash_key" ON "ProductAuditTrail"("hash");

-- AddForeignKey
ALTER TABLE "ProductAuditTrail" ADD CONSTRAINT "ProductAuditTrail_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
