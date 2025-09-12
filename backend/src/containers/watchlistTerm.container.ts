import { WatchlistTermController } from "../controllers/watchlistTerm.controller";
import { WatchlistTermService } from "../services/watchlistTerm.service";
import { WatchlistTermPrismaRepository } from "../repositories/prisma/watchlistTerm-prisma.repository";

export const watchListTermController = new WatchlistTermController(
  new WatchlistTermService(new WatchlistTermPrismaRepository())
);
