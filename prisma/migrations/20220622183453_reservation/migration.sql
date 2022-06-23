/*
  Warnings:

  - Added the required column `price` to the `roomType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "roomType" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "prePeservation" (
    "id" SERIAL NOT NULL,
    "showId" INTEGER NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prePeservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preReservationSeats" (
    "preReservationId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "seatId" INTEGER NOT NULL,

    CONSTRAINT "preReservationSeats_pkey" PRIMARY KEY ("preReservationId","roomId","seatId")
);

-- CreateTable
CREATE TABLE "mercadoPagoPayment" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "preferenceId" TEXT NOT NULL,
    "preReservationId" INTEGER,
    "reservationId" INTEGER,

    CONSTRAINT "mercadoPagoPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mercadoPagoPayment_uuid_key" ON "mercadoPagoPayment"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "mercadoPagoPayment_reservationId_key" ON "mercadoPagoPayment"("reservationId");

-- CreateIndex
CREATE UNIQUE INDEX "mercadoPagoPayment_preReservationId_key" ON "mercadoPagoPayment"("preReservationId");

-- AddForeignKey
ALTER TABLE "prePeservation" ADD CONSTRAINT "prePeservation_showId_fkey" FOREIGN KEY ("showId") REFERENCES "show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preReservationSeats" ADD CONSTRAINT "preReservationSeats_roomId_seatId_fkey" FOREIGN KEY ("roomId", "seatId") REFERENCES "roomSeats"("roomId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preReservationSeats" ADD CONSTRAINT "preReservationSeats_preReservationId_fkey" FOREIGN KEY ("preReservationId") REFERENCES "prePeservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mercadoPagoPayment" ADD CONSTRAINT "mercadoPagoPayment_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mercadoPagoPayment" ADD CONSTRAINT "mercadoPagoPayment_preReservationId_fkey" FOREIGN KEY ("preReservationId") REFERENCES "prePeservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
