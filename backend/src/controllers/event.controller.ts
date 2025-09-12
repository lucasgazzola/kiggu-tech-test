import { NextFunction, Request, Response } from "express";
import { createEventSchema, updateEventSchema } from "../dtos/event.dtos";
import { IEventService } from "../services/interfaces/event.service.interface";

export class EventController {
  constructor(private eventService: IEventService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createEventSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.issues });
      }
      const event = await this.eventService.createEvent(parsed.data);
      res.status(201).json(event);
    } catch (err: any) {
      next(err);
    }
  }

  async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const events = await this.eventService.getAllEvents();
      res.json(events);
    } catch (err: any) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const event = await this.eventService.getEventById(id);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (err: any) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const parsed = updateEventSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.issues });
      }
      const updatedEvent = await this.eventService.updateEvent(id, parsed.data);
      res.json(updatedEvent);
    } catch (err: any) {
      next(err);
    }
  }

  async enrich(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const enrichedEvent = await this.eventService.enrichEvent(id);
      res.status(200).json(enrichedEvent);
    } catch (err: any) {
      next(err);
    }
  }
}
