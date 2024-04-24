-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(230),
    "address" VARCHAR(230),
    "phone_number" INTEGER,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);
