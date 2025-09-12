import { EventMatch } from "../../models/eventMatch.model";
import {
  CreateEventMatchDTO,
  UpdateEventMatchDTO,
} from "../../dtos/eventMatch.dtos";
import { Watchlist } from "../../models/watchlist.model";
import { Event } from "../../models/event.model";

export interface IEventMatchRepository {
  createEventMatch(data: CreateEventMatchDTO): Promise<EventMatch>;
  getEventMatchById(id: string): Promise<EventMatch | null>;
  getAllEventMatches(): Promise<EventMatch[]>;
  updateEventMatch(id: string, data: UpdateEventMatchDTO): Promise<EventMatch>;
  deleteEventMatch(id: string): Promise<void>;

  getWatchlistMatchesByEvent(eventId: string): Promise<Watchlist[]>;
  getEventMatchesByWatchlist(watchlistId: string): Promise<Event[]>;
}
