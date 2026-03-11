/*
  Warnings:

  - The `status` column on the `InfoRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "InfoRequestStatus" AS ENUM ('NEW', 'READ', 'ANSWERED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "InfoRequest" DROP COLUMN "status",
ADD COLUMN     "status" "InfoRequestStatus" NOT NULL DEFAULT 'NEW';

-- CreateIndex
CREATE INDEX "CateringRequest_eventDate_idx" ON "CateringRequest"("eventDate");

-- CreateIndex
CREATE INDEX "CateringRequest_email_idx" ON "CateringRequest"("email");

-- CreateIndex
CREATE INDEX "CateringRequest_status_idx" ON "CateringRequest"("status");

-- CreateIndex
CREATE INDEX "CateringRequest_locale_idx" ON "CateringRequest"("locale");

-- CreateIndex
CREATE INDEX "Event_date_idx" ON "Event"("date");

-- CreateIndex
CREATE INDEX "Event_slug_idx" ON "Event"("slug");

-- CreateIndex
CREATE INDEX "GalleryImage_category_idx" ON "GalleryImage"("category");

-- CreateIndex
CREATE INDEX "InfoRequest_email_idx" ON "InfoRequest"("email");

-- CreateIndex
CREATE INDEX "InfoRequest_status_idx" ON "InfoRequest"("status");

-- CreateIndex
CREATE INDEX "InfoRequest_locale_idx" ON "InfoRequest"("locale");

-- CreateIndex
CREATE INDEX "MenuItem_category_idx" ON "MenuItem"("category");

-- CreateIndex
CREATE INDEX "MenuItem_slug_idx" ON "MenuItem"("slug");

-- CreateIndex
CREATE INDEX "Reservation_dateTime_idx" ON "Reservation"("dateTime");

-- CreateIndex
CREATE INDEX "Reservation_email_idx" ON "Reservation"("email");

-- CreateIndex
CREATE INDEX "Reservation_status_idx" ON "Reservation"("status");

-- CreateIndex
CREATE INDEX "Reservation_locale_idx" ON "Reservation"("locale");
