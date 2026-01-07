-- CreateTable
CREATE TABLE "BurnoutScore" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workHours" DOUBLE PRECISION NOT NULL,
    "breakCount" INTEGER NOT NULL,
    "stressLevel" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BurnoutScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BurnoutScore_userId_idx" ON "BurnoutScore"("userId");

-- AddForeignKey
ALTER TABLE "BurnoutScore" ADD CONSTRAINT "BurnoutScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
