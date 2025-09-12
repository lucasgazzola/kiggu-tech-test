import { EventMatch } from "../../models/eventMatch.model";
import {
  CreateEventMatchDTO,
  UpdateEventMatchDTO,
} from "../../dtos/eventMatch.dtos";
import { Event } from "../../models/event.model";
import { Watchlist } from "../../models/watchlist.model";

export interface IEventMatchService {
  createEventMatch(data: CreateEventMatchDTO): Promise<EventMatch>;
  getEventMatchById(id: string): Promise<EventMatch | null>;
  getAllEventMatches(): Promise<EventMatch[]>;
  getEventMatchesByEvent(eventId: string): Promise<EventMatch[]>;
  getEventMatchesByTerm(termId: string): Promise<EventMatch[]>;
  getEventMatchesByWatchlist(watchlistId: string): Promise<Event[]>;
  getWatchlistMatchesByEvent(eventId: string): Promise<Watchlist[]>;
  updateEventMatch(id: string, data: UpdateEventMatchDTO): Promise<EventMatch>;
  deleteEventMatch(id: string): Promise<void>;
}
