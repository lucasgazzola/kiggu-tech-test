import { CreateEventDTO, UpdateEventDTO } from "../../dtos/event.dtos";
import { Event } from "../../models/event.model";

export interface IEventService {
  createEvent(data: CreateEventDTO): Promise<Event>;
  updateEvent(id: string, data: UpdateEventDTO): Promise<Event>;
  deleteEvent(id: string): Promise<void>;
  getAllEventsByWatchlistId(watchlistId: string): Promise<Event[]>;
  getEventById(id: string): Promise<Event | null>;
  getAllEvents(): Promise<Event[]>;
  enrichEvent(eventId: Event["id"]): Promise<Event>;
}
