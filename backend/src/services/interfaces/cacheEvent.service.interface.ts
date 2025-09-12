import { Event } from "../../models/event.model";

export interface ICacheEventService {
  getEventFromCache(eventId: string): Promise<Event | null>;
  setEventToCache(eventId: string, event: Event, ttl?: number): Promise<void>;
  invalidateEventCache(eventId: string): Promise<void>;

  // Métodos para enrichment
  getEventEnrichmentFromCache(eventId: string): Promise<string | null>;
  setEventEnrichmentToCache(
    eventId: string,
    enrichment: { summary: string; severity: string; suggestedAction: string },
    ttl?: number
  ): Promise<void>;
}
