import { WatchlistTerm } from "../../models/watchlistTerm.model";
import {
  CreateWatchlistTermDTO,
  UpdateWatchlistTermDTO,
} from "../../dtos/watchlistTerm.dtos";

export interface IWatchlistTermRepository {
  createWatchlistTerm(data: CreateWatchlistTermDTO): Promise<WatchlistTerm>;
  getWatchlistTermById(id: string): Promise<WatchlistTerm | null>;
  getWatchlistTermByValue(value: string): Promise<WatchlistTerm | null>;
  getAllWatchlistTerms(): Promise<WatchlistTerm[]>;
  updateWatchlistTerm(
    id: string,
    data: UpdateWatchlistTermDTO
  ): Promise<WatchlistTerm>;
  deleteWatchlistTerm(id: string): Promise<void>;
}
