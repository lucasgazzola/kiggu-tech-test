import { IWatchlistTermRepository } from "../repositories/interfaces/watchlistTerm.repository.interface";
import { WatchlistTerm } from "../models/watchlistTerm.model";
import {
  CreateWatchlistTermDTO,
  UpdateWatchlistTermDTO,
} from "../dtos/watchlistTerm.dtos";
import { NotFoundError } from "../exceptions/db";
import { IWatchlistTermService } from "./interfaces/watchlistTerm.service.interface";

export class WatchlistTermService implements IWatchlistTermService {
  constructor(private repository: IWatchlistTermRepository) {}

  async getAllWatchlistTerms(): Promise<WatchlistTerm[]> {
    return await this.repository.getAllWatchlistTerms();
  }

  async deleteWatchlistTerm(id: string): Promise<void> {
    return await this.repository.deleteWatchlistTerm(id);
  }

  async createWatchlistTerm(
    data: CreateWatchlistTermDTO
  ): Promise<WatchlistTerm> {
    return await this.repository.createWatchlistTerm(data);
  }

  async getWatchlistTermById(id: string): Promise<WatchlistTerm> {
    const term = await this.repository.getWatchlistTermById(id);
    if (!term) {
      throw new NotFoundError("Watchlist term not found");
    }
    return term;
  }

  async getWatchlistTermByValue(value: string): Promise<WatchlistTerm> {
    const term = await this.repository.getWatchlistTermByValue(value);
    if (!term) {
      throw new NotFoundError("Watchlist term not found");
    }
    return term;
  }

  async updateWatchlistTerm(
    id: string,
    data: UpdateWatchlistTermDTO
  ): Promise<WatchlistTerm> {
    const term = await this.repository.updateWatchlistTerm(id, data);
    if (!term) {
      throw new NotFoundError("Watchlist term not found");
    }
    return term;
  }

  async removeWatchlistTerm(id: string): Promise<void> {
    const term = await this.repository.getWatchlistTermById(id);
    if (!term) {
      throw new NotFoundError("Watchlist term not found");
    }
    await this.repository.deleteWatchlistTerm(id);
  }
}
