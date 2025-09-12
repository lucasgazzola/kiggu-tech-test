import { CreateEventDTO, UpdateEventDTO } from "../../dtos/event.dtos";
import { Event } from "../../models/event.model";

export interface IEventRepository {
  getAllEvents(): Promise<Event[]>;
  getAllEventsByWatchlistId(watchlistId: string): Promise<Event[]>;
  createEvent(data: CreateEventDTO): Promise<Event>;
  updateEvent(id: string, data: UpdateEventDTO): Promise<Event>;
  deleteEvent(id: string): Promise<void>;
  getEventById(id: string): Promise<Event | null>;
}
