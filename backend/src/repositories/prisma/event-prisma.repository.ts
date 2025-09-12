import { IEventRepository } from "../interfaces/event.repository.interface";
import { Event } from "../../models/event.model";
import { CreateEventDTO, UpdateEventDTO } from "../../dtos/event.dtos";
import { dbClient } from "../../config/db";
import { EventMapper } from "../../mappers/event.mapper";

export class EventPrismaRepository implements IEventRepository {
  async updateEvent(id: string, data: UpdateEventDTO): Promise<Event> {
    const event = await dbClient.event.update({
      where: { id },
      data,
      include: { matches: true },
    });

    return EventMapper.toDomain(event);
  }

  async deleteEvent(id: string): Promise<void> {
    await dbClient.event.delete({ where: { id } });
  }

  async getEventById(id: string): Promise<Event | null> {
    const event = await dbClient.event.findUnique({
      where: { id },
      include: { matches: true },
    });
    if (!event) {
      return null;
    }
    return EventMapper.toDomain(event);
  }

  async getAllEvents(): Promise<Event[]> {
    const events = await dbClient.event.findMany({
      include: { matches: true },
    });
    return events.map(EventMapper.toDomain);
  }

  async getAllEventsByWatchlistId(watchlistId: string): Promise<Event[]> {
    // Buscar eventos que tengan matches con términos de la watchlist
    const terms = await dbClient.watchlistTerm.findMany({
      where: { watchlists: { some: { id: watchlistId } } },
    });
    const termIds = terms.map((term) => term.id);
    const matches = await dbClient.eventMatch.findMany({
      where: { termId: { in: termIds } },
    });
    const eventIds = matches.map((match) => match.eventId);
    const events = await dbClient.event.findMany({
      where: { id: { in: eventIds } },
      include: { matches: true },
    });
    return events.map(EventMapper.toDomain);
  }

  async createEvent(data: CreateEventDTO): Promise<Event> {
    const { ...eventData } = data;

    const event = await dbClient.event.create({
      data: {
        ...eventData,
      },
      include: { matches: true },
    });

    // Obtener todas las watchlist terms
    const terms = await dbClient.watchlistTerm.findMany({
      where: {
        value: {
          in: [
            event.title.trim().toLocaleLowerCase(),
            event.description?.trim().toLocaleLowerCase() || "",
          ],
        },
      },
    });

    terms.forEach(async (term) => {
      try {
        await dbClient.eventMatch.create({
          data: {
            eventId: event.id,
            termId: term.id,
          },
        });
      } catch (error) {}
    });

    return EventMapper.toDomain(event);
  }
}
