import { IEventRepository } from "../repositories/interfaces/event.repository.interface";
import { Event } from "../models/event.model";
import { IEventService } from "./interfaces/event.service.interface";
import { CreateEventDTO, UpdateEventDTO } from "../dtos/event.dtos";
import { NotFoundError } from "../exceptions/db";
import { ICacheEventService } from "./interfaces/cacheEvent.service.interface";
import { IAIAdapter } from "../adapters/interfaces/ai.adapter.interface";
import { IWatchlistTermRepository } from "../repositories/interfaces/watchlistTerm.repository.interface";
import { IEventMatchRepository } from "../repositories/interfaces/eventMatch.repository.interface";
import { WatchlistTerm } from "../models/watchlistTerm.model";
import { CreateEventMatchDTO } from "../dtos/eventMatch.dtos";

export class EventService implements IEventService {
  constructor(
    private repository: IEventRepository,
    private termRepository: IWatchlistTermRepository,
    private matchRepository: IEventMatchRepository,
    private aiAdapter: IAIAdapter,
    private cacheService: ICacheEventService
  ) {}

  async updateEvent(id: string, data: UpdateEventDTO): Promise<Event> {
    const existingEvent = await this.repository.getEventById(id);
    if (!existingEvent) {
      throw new NotFoundError(`Event with id ${id} not found.`);
    }
    return this.repository.updateEvent(id, data);
  }

  async deleteEvent(id: string): Promise<void> {
    const existingEvent = await this.repository.getEventById(id);
    if (!existingEvent) {
      throw new NotFoundError(`Event with id ${id} not found.`);
    }
    await this.repository.deleteEvent(id);
  }

  async getEventById(id: string): Promise<Event | null> {
    const event = await this.repository.getEventById(id);
    if (!event) {
      throw new NotFoundError(`Event with id ${id} not found.`);
    }
    return event;
  }

  async getAllEvents(): Promise<Event[]> {
    return this.repository.getAllEvents();
  }

  async createEvent(data: CreateEventDTO) {
    // 1. Crear el evento
    const event = await this.repository.createEvent(data);

    // 2. Buscar todos los términos
    const allTerms = await this.termRepository.getAllWatchlistTerms();

    // 3. Filtrar términos que aparecen en el título o descripción
    const matchedTerms = allTerms.filter(
      (term: WatchlistTerm) =>
        (data.title && data.title.includes(term.value)) ||
        (data.description && data.description.includes(term.value))
    );

    // 4. Crear EventMatch por cada coincidencia
    for (const term of matchedTerms) {
      const match: CreateEventMatchDTO = {
        eventId: event.id,
        termId: term.id as string,
      };
      await this.matchRepository.createEventMatch(match);
    }

    // 5. Retornar el evento (opcional: incluir matches)
    return event;
  }

  async getAllEventsByWatchlistId(watchlistId: string) {
    return this.repository.getAllEventsByWatchlistId(watchlistId);
  }

  async enrichEvent(eventId: Event["id"]): Promise<Event> {
    const cachedEvent = await this.cacheService.getEventFromCache(eventId);

    if (cachedEvent) {
      const { severity, suggestedAction, summary } =
        await this.aiAdapter.enrichEvent(cachedEvent);
      const updated = await this.repository.updateEvent(eventId, {
        summary,
        severity,
        suggestedAction,
      });
      return updated;
    }

    const event = await this.repository.getEventById(eventId);

    if (!event) {
      throw new NotFoundError(`Event with id ${eventId} not found.`);
    }

    // Si no hay cache, enriquecer usando IA
    const enrichment = await this.aiAdapter.enrichEvent(event);
    // Guardar enrichment en cache (TTL recomendado: 1h)
    await this.cacheService.setEventEnrichmentToCache(
      eventId,
      enrichment,
      3600
    );
    // Actualizar el evento en la base de datos con los datos enriquecidos
    const updated = await this.repository.updateEvent(eventId, {
      summary: enrichment.summary,
      severity: enrichment.severity,
      suggestedAction: enrichment.suggestedAction,
    });
    return updated;
  }
}
