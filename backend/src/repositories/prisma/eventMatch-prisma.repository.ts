import { dbClient } from "../../config/db";
import { EventMatch } from "../../models/eventMatch.model";
import { IEventMatchRepository } from "../interfaces/eventMatch.repository.interface";
import { EventMatchMapper } from "../../mappers/eventMatch.mapper";
import {
  CreateEventMatchDTO,
  UpdateEventMatchDTO,
} from "../../dtos/eventMatch.dtos";
import { Event } from "../../models/event.model";
import { Watchlist } from "../../models/watchlist.model";

export class EventMatchPrismaRepository implements IEventMatchRepository {
  getWatchlistMatchesByEvent(eventId: string): Promise<Watchlist[]> {
    const watchlists = dbClient.watchlist.findMany({
      where: {
        terms: {
          some: {
            term: {
              matches: { some: { eventId } },
            },
          },
        },
      },
    });
    return watchlists.then((wls) => wls.map((wl) => ({ ...wl } as Watchlist)));
  }

  getEventMatchesByWatchlist(watchlistId: string): Promise<Event[]> {
    const events = dbClient.event.findMany({
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
    return events.then((evs) => evs.map((ev) => ({ ...ev } as Event)));
  }

  async createEventMatch(data: CreateEventMatchDTO): Promise<EventMatch> {
    const match = await dbClient.eventMatch.create({
      data: {
        event: { connect: { id: data.eventId } },
        term: { connect: { id: data.termId } },
      },
      include: { event: true, term: true },
    });
    return EventMatchMapper.toDomain(match);
  }

  async getEventMatchById(id: string): Promise<EventMatch | null> {
    const match = await dbClient.eventMatch.findUnique({
      where: { id },
      include: { event: true, term: true },
    });
    return match ? EventMatchMapper.toDomain(match) : null;
  }

  async getAllEventMatches(): Promise<EventMatch[]> {
    const matches = await dbClient.eventMatch.findMany({
      include: { event: true, term: true },
    });
    return matches.map(EventMatchMapper.toDomain);
  }

  async updateEventMatch(
    id: string,
    data: UpdateEventMatchDTO
  ): Promise<EventMatch> {
    const match = await dbClient.eventMatch.update({
      where: { id },
      data: {
        event: data.eventId ? { connect: { id: data.eventId } } : undefined,
        term: data.termId ? { connect: { id: data.termId } } : undefined,
      },
      include: { event: true, term: true },
    });
    return EventMatchMapper.toDomain(match);
  }

  async deleteEventMatch(id: string): Promise<void> {
    await dbClient.eventMatch.delete({ where: { id } });
  }
}
