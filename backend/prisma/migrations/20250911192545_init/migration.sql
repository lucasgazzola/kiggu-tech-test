-- CreateEnum
CREATE TYPE "public"."Severity" AS ENUM ('LOW', 'MED', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "public"."EventStatus" AS ENUM ('NEW', 'REVIEWED', 'CLOSED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Watchlist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WatchlistTerm" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "WatchlistTerm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WatchlistTermOnWatchlist" (
    "id" TEXT NOT NULL,
    "watchlistId" TEXT NOT NULL,
    "termId" TEXT NOT NULL,

    CONSTRAINT "WatchlistTermOnWatchlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "public"."EventStatus" NOT NULL DEFAULT 'NEW',
    "severity" "public"."Severity",
    "summary" TEXT,
    "suggestedAction" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "watchlistId" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EventMatch" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "termId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventMatch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WatchlistTerm_value_key" ON "public"."WatchlistTerm"("value");

-- CreateIndex
CREATE UNIQUE INDEX "WatchlistTermOnWatchlist_watchlistId_termId_key" ON "public"."WatchlistTermOnWatchlist"("watchlistId", "termId");

-- CreateIndex
CREATE UNIQUE INDEX "EventMatch_eventId_termId_key" ON "public"."EventMatch"("eventId", "termId");

-- AddForeignKey
ALTER TABLE "public"."Watchlist" ADD CONSTRAINT "Watchlist_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WatchlistTermOnWatchlist" ADD CONSTRAINT "WatchlistTermOnWatchlist_watchlistId_fkey" FOREIGN KEY ("watchlistId") REFERENCES "public"."Watchlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WatchlistTermOnWatchlist" ADD CONSTRAINT "WatchlistTermOnWatchlist_termId_fkey" FOREIGN KEY ("termId") REFERENCES "public"."WatchlistTerm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_watchlistId_fkey" FOREIGN KEY ("watchlistId") REFERENCES "public"."Watchlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventMatch" ADD CONSTRAINT "EventMatch_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventMatch" ADD CONSTRAINT "EventMatch_termId_fkey" FOREIGN KEY ("termId") REFERENCES "public"."WatchlistTerm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
