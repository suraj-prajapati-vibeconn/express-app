-- CreateTable
CREATE TABLE "user_details" (
    "uid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_details_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "cars" (
    "cid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "uid" INTEGER NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("cid")
);

-- CreateTable
CREATE TABLE "directors" (
    "did" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "directors_pkey" PRIMARY KEY ("did")
);

-- CreateTable
CREATE TABLE "companies" (
    "com_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("com_id")
);

-- CreateTable
CREATE TABLE "companies_directors" (
    "id" SERIAL NOT NULL,
    "did" INTEGER NOT NULL,
    "cid" INTEGER NOT NULL,

    CONSTRAINT "companies_directors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "uid" INTEGER NOT NULL,
    "admin" BOOLEAN NOT NULL,
    "user" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_details_email_key" ON "user_details"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_uid_key" ON "roles"("uid");

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_uid_fkey" FOREIGN KEY ("uid") REFERENCES "user_details"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies_directors" ADD CONSTRAINT "companies_directors_did_fkey" FOREIGN KEY ("did") REFERENCES "directors"("did") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies_directors" ADD CONSTRAINT "companies_directors_cid_fkey" FOREIGN KEY ("cid") REFERENCES "companies"("com_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_uid_fkey" FOREIGN KEY ("uid") REFERENCES "user_details"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
