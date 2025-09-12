import { Watchlist } from "../../models/watchlist.model";

export interface IWatchlistService {
  createWatchlist(data: Omit<Watchlist, "id">): Promise<Watchlist>;
  getAllWatchlists(): Promise<Watchlist[]>;
  getWatchlistById(id: string): Promise<Watchlist>;
  removeWatchlist(id: string): Promise<void>;
}
