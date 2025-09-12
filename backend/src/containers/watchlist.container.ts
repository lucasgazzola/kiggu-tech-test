import { WatchlistController } from "../controllers/watchlist.controller";
import { WatchlistService } from "../services/watchlist.service";
import { WatchlistPrismaRepository } from "../repositories/prisma/watchlist-prisma.repository";

const watchlistRepository = new WatchlistPrismaRepository();
const watchlistService = new WatchlistService(watchlistRepository);
const watchlistController = new WatchlistController(watchlistService);

export { watchlistController };
