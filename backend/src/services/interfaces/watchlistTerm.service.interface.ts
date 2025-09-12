import { CreateWatchlistTermDTO } from "../../dtos/watchlistTerm.dtos";
import { WatchlistTerm } from "../../models/watchlistTerm.model";

export interface IWatchlistTermService {
  createWatchlistTerm(data: CreateWatchlistTermDTO): Promise<WatchlistTerm>;
  getAllWatchlistTerms(): Promise<WatchlistTerm[]>;
  getWatchlistTermById(id: string): Promise<WatchlistTerm | null>;
  getWatchlistTermByValue(value: string): Promise<WatchlistTerm | null>;
  deleteWatchlistTerm(id: string): Promise<void>;
}
