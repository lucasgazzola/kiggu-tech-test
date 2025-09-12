import { IWatchlistRepository } from "../repositories/interfaces/watchlist.repository.interface";
import { Watchlist } from "../models/watchlist.model";
import { NotFoundError } from "../exceptions/db";

export class WatchlistService {
  constructor(private repository: IWatchlistRepository) {}

  async createWatchlist(data: Omit<Watchlist, "id">) {
    return await this.repository.createWatchlist(data);
  }

  async getAllWatchlists() {
    return await this.repository.getAllWatchlists();
  }

  async getWatchlistById(id: string) {
    const watchlist = await this.repository.getWatchlistById(id);
    if (!watchlist) {
      throw new NotFoundError("Watchlist not found");
    }
    return watchlist;
  }

  async removeWatchlist(id: string) {
    const watchlist = await this.repository.getWatchlistById(id);
    if (!watchlist) {
      throw new NotFoundError("Watchlist not found");
    }
    // Si el modelo lo permite, actualiza los términos para que watchlistId sea null
    // (esto requiere que la relación en Prisma sea onDelete: SET NULL)
    // Si no, lanza error informativo
    // Ejemplo:
    // await dbClient.watchlistTerm.updateMany({ where: { watchlistId: id }, data: { watchlistId: null } });
    await this.repository.deleteWatchlist(id);
  }
}
