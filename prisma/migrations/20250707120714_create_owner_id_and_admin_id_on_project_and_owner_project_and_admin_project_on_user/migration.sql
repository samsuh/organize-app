-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "adminApproved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "adminId" TEXT,
ADD COLUMN     "ownerApproved" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "ownerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
