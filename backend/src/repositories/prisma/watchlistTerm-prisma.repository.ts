import { dbClient } from "../../config/db";
import { WatchlistTerm } from "../../models/watchlistTerm.model";
import { IWatchlistTermRepository } from "../interfaces/watchlistTerm.repository.interface";
import { WatchlistTermMapper } from "../../mappers/watchlistTerm.mapper";
import {
  CreateWatchlistTermDTO,
  UpdateWatchlistTermDTO,
} from "../../dtos/watchlistTerm.dtos";

export class WatchlistTermPrismaRepository implements IWatchlistTermRepository {
  async getAllWatchlistTerms(): Promise<WatchlistTerm[]> {
    const terms = await dbClient.watchlistTerm.findMany({
      include: { matches: true },
    });
    return terms.map(WatchlistTermMapper.toDomain);
  }

  async getWatchlistTermById(id: string): Promise<WatchlistTerm | null> {
    const term = await dbClient.watchlistTerm.findUnique({
      where: { id },
      include: { matches: true },
    });
    return term ? WatchlistTermMapper.toDomain(term) : null;
  }
  async createWatchlistTerm(
    data: CreateWatchlistTermDTO
  ): Promise<WatchlistTerm> {
    // Verificar si ya existe el término
    const existing = await dbClient.watchlistTerm.findUnique({
      where: { value: data.value },
    });
    if (existing) {
      // Opcional: lanzar error personalizado o devolver el existente
      // throw new Error("El término ya existe");
      return WatchlistTermMapper.toDomain(existing);
    }
    const term = await dbClient.watchlistTerm.create({
      data,
      include: { matches: true },
    });
    return WatchlistTermMapper.toDomain(term);
  }

  async getWatchlistTermByValue(value: string): Promise<WatchlistTerm | null> {
    const term = await dbClient.watchlistTerm.findUnique({
      where: { value },
      include: { matches: true },
    });
    return term ? WatchlistTermMapper.toDomain(term) : null;
  }

  async getAllWatchlistTermsByWatchlistId(
    watchlistId: string
  ): Promise<WatchlistTerm[]> {
    const terms = await dbClient.watchlistTerm.findMany({
      where: { watchlists: { some: { id: watchlistId } } },
      include: { matches: true },
    });
    return terms.map(WatchlistTermMapper.toDomain);
  }

  async updateWatchlistTerm(
    id: string,
    data: UpdateWatchlistTermDTO
  ): Promise<WatchlistTerm> {
    const term = await dbClient.watchlistTerm.update({
      where: { id },
      data,
      include: { matches: true },
    });
    return WatchlistTermMapper.toDomain(term);
  }

  async deleteWatchlistTerm(value: string): Promise<void> {
    // Buscar el término por value
    const term = await dbClient.watchlistTerm.findUnique({ where: { value } });
    if (!term) return; // Si no existe, no hacer nada
    // Eliminar relaciones en la tabla intermedia
    await dbClient.watchlistTermOnWatchlist.deleteMany({
      where: { termId: term.id },
    });
    // Eliminar el término
    await dbClient.watchlistTerm.delete({ where: { id: term.id } });
  }
}
