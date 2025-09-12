import { Event } from "../../models/event.model";
import { Watchlist } from "../../models/watchlist.model";

export interface IWatchlistRepository {
  getAllWatchlists(): Promise<Watchlist[]>;
  createWatchlist(data: Partial<Watchlist>): Promise<Watchlist>;
  getWatchlistById(id: string): Promise<Watchlist | null>;
  updateWatchlist(id: string, data: Partial<Watchlist>): Promise<Watchlist>;
  deleteWatchlist(id: string): Promise<void>;
}
