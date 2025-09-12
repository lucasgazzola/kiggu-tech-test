import { EventMatch } from "../models/eventMatch.model";
import {
  CreateEventMatchDTO,
  UpdateEventMatchDTO,
} from "../dtos/eventMatch.dtos";
import { IEventMatchService } from "./interfaces/eventMatch.service.interface";

import { IEventMatchRepository } from "../repositories/interfaces/eventMatch.repository.interface";
import { IWatchlistRepository } from "../repositories/interfaces/watchlist.repository.interface";
import { Event } from "../models/event.model";
import { Watchlist } from "../models/watchlist.model";

export class EventMatchService implements IEventMatchService {
  constructor(private eventMatchRepo: IEventMatchRepository) {}
  getWatchlistMatchesByEvent(eventId: string): Promise<Watchlist[]> {
    return this.eventMatchRepo.getWatchlistMatchesByEvent(eventId);
  }

  getEventMatchesByWatchlist(watchlistId: string): Promise<Event[]> {
    return this.eventMatchRepo.getEventMatchesByWatchlist(watchlistId);
  }

  async createEventMatch(data: CreateEventMatchDTO): Promise<EventMatch> {
    return this.eventMatchRepo.createEventMatch(data);
  }

  async getEventMatchById(id: string): Promise<EventMatch | null> {
    return this.eventMatchRepo.getEventMatchById(id);
  }

  async getAllEventMatches(): Promise<EventMatch[]> {
    return this.eventMatchRepo.getAllEventMatches();
  }

  async getEventMatchesByEvent(eventId: string): Promise<EventMatch[]> {
    const all = await this.eventMatchRepo.getAllEventMatches();
    return all.filter((m) => m.eventId === eventId);
  }

  async getEventMatchesByTerm(termId: string): Promise<EventMatch[]> {
    const all = await this.eventMatchRepo.getAllEventMatches();
    return all.filter((m) => m.termId === termId);
  }

  async updateEventMatch(
    id: string,
    data: UpdateEventMatchDTO
  ): Promise<EventMatch> {
    return this.eventMatchRepo.updateEventMatch(id, data);
  }

  async deleteEventMatch(id: string): Promise<void> {
    return this.eventMatchRepo.deleteEventMatch(id);
  }
}
