/*
  Warnings:

  - The primary key for the `Events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Events` table. All the data in the column will be lost.
  - Added the required column `dateTime` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Events` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Participants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "eventId" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "dateTime" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "organizer" TEXT NOT NULL
);
INSERT INTO "new_Events" ("description", "id", "location", "organizer") SELECT "description", "id", "location", "organizer" FROM "Events";
DROP TABLE "Events";
ALTER TABLE "new_Events" RENAME TO "Events";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
