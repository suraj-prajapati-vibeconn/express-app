/*
  Warnings:

  - The primary key for the `UserDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserDetails" DROP CONSTRAINT "UserDetails_pkey",
DROP COLUMN "id",
ADD COLUMN     "uid" SERIAL NOT NULL,
ADD CONSTRAINT "UserDetails_pkey" PRIMARY KEY ("uid");

-- CreateTable
CREATE TABLE "Cars" (
    "cid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "uid" INTEGER NOT NULL,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("cid")
);

-- CreateTable
CREATE TABLE "Directors" (
    "did" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Directors_pkey" PRIMARY KEY ("did")
);

-- CreateTable
CREATE TABLE "Company" (
    "com_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("com_id")
);

-- CreateTable
CREATE TABLE "CompanyDirector" (
    "id" SERIAL NOT NULL,
    "did" INTEGER NOT NULL,
    "cid" INTEGER NOT NULL,

    CONSTRAINT "CompanyDirector_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_uid_fkey" FOREIGN KEY ("uid") REFERENCES "UserDetails"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyDirector" ADD CONSTRAINT "CompanyDirector_did_fkey" FOREIGN KEY ("did") REFERENCES "Directors"("did") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyDirector" ADD CONSTRAINT "CompanyDirector_cid_fkey" FOREIGN KEY ("cid") REFERENCES "Company"("com_id") ON DELETE RESTRICT ON UPDATE CASCADE;
