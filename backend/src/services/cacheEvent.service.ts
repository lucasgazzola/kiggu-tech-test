import { ICacheAdapter } from "./../adapters/interfaces/cache.adapter.interface";
import { Event } from "../models/event.model";
import { ICacheEventService } from "./interfaces/cacheEvent.service.interface";

export class CacheEventService implements ICacheEventService {
  constructor(private cache: ICacheAdapter) {}

  async getEventFromCache(eventId: string): Promise<Event | null> {
    const cached = await this.cache.get(eventId);
    if (!cached) return null;
    if (typeof cached === "string") {
      try {
        return JSON.parse(cached) as Event;
      } catch {
        return null;
      }
    }
    return cached as Event;
  }

  async setEventToCache(
    eventId: string,
    event: Event,
    ttlSeconds: number
  ): Promise<void> {
    const value = JSON.stringify(event);
    await this.cache.set(`event:${eventId}`, value, ttlSeconds);
  }
  async invalidateEventCache(eventId: string): Promise<void> {
    await this.cache.del(`event:${eventId}`);
  }

  async getEventEnrichmentFromCache(eventId: string): Promise<string | null> {
    return await this.cache.get(`event:${eventId}:enrichment`);
  }

  async setEventEnrichmentToCache(
    eventId: string,
    enrichment: { summary: string; severity: string; suggestedAction: string },
    ttl = 3600
  ): Promise<void> {
    await this.cache.set(
      `event:${eventId}:enrichment`,
      JSON.stringify(enrichment),
      ttl
    );
  }
}
