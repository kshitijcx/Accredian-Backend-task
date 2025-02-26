-- CreateTable
CREATE TABLE "Referal" (
    "id" SERIAL NOT NULL,
    "referrerName" TEXT NOT NULL,
    "referrerMail" TEXT NOT NULL,
    "referrerAmt" INTEGER NOT NULL,
    "refereeName" TEXT NOT NULL,
    "refereeMail" TEXT NOT NULL,
    "refereeAmt" INTEGER NOT NULL,
    "course" TEXT NOT NULL,

    CONSTRAINT "Referal_pkey" PRIMARY KEY ("id")
);
