import { IWatchlistRepository } from "../interfaces/watchlist.repository.interface";
import { Watchlist } from "../../models/watchlist.model";
import { dbClient } from "../../config/db";
import { WatchlistMapper } from "../../mappers/watchlist.mapper";
import { Event } from "../../models/event.model";
import { EventMapper } from "../../mappers/event.mapper";

export class WatchlistPrismaRepository implements IWatchlistRepository {
  async getEventsRelatedToWatchlist(watchlistId: string): Promise<Event[]> {
    const events = await dbClient.event.findMany({
      where: {
        matches: {
          some: {
            term: {
              watchlists: { some: { watchlistId } },
            },
          },
        },
      },
    });
    return events.map((event) => EventMapper.toDomain(event));
  }

  async getAllWatchlists(): Promise<Watchlist[]> {
    const watchlists = await dbClient.watchlist.findMany({
      include: { owner: true, terms: { include: { term: true } } },
    });
    return watchlists.map(WatchlistMapper.toDomain);
  }

  async createWatchlist(data: Omit<Watchlist, "id">): Promise<Watchlist> {
    const watchlist = await dbClient.watchlist.create({
      data: {
        name: data.name,
        description: data.description,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        terms: data.terms
          ? {
              create: data.terms.map((term) => ({
                term: {
                  connectOrCreate: {
                    where: { value: term.value },
                    create: { value: term.value },
                  },
                },
              })),
            }
          : undefined,
        owner: { connect: { id: data.ownerId } },
      },
      include: { owner: true, terms: { include: { term: true } } },
    });
    return WatchlistMapper.toDomain(watchlist);
  }

  async getWatchlistById(id: string): Promise<Watchlist | null> {
    const watchlist = await dbClient.watchlist.findUnique({
      where: { id },
      include: { owner: true, terms: { include: { term: true } } },
    });
    return watchlist ? WatchlistMapper.toDomain(watchlist) : null;
  }

  async deleteWatchlist(id: string): Promise<void> {
    // Eliminar relaciones en la tabla intermedia
    await dbClient.watchlistTermOnWatchlist.deleteMany({
      where: { watchlistId: id },
    });
    // Eliminar el watchlist
    await dbClient.watchlist.delete({ where: { id } });
  }

  async updateWatchlist(
    id: string,
    data: Partial<Watchlist>
  ): Promise<Watchlist> {
    // Si se pasan términos, primero desconecta todos los actuales y luego agrega los nuevos
    const watchlist = await dbClient.watchlist.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        updatedAt: data.updatedAt,
        terms: data.terms
          ? {
              set: [],
              create: data.terms.map((term) => ({
                term: {
                  connectOrCreate: {
                    where: { value: term.value },
                    create: { value: term.value },
                  },
                },
              })),
            }
          : undefined,
      },
      include: { owner: true, terms: { include: { term: true } } },
    });
    return WatchlistMapper.toDomain(watchlist);
  }
}
