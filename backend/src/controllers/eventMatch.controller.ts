import { NextFunction, Request, Response } from "express";
import { IEventMatchService } from "../services/interfaces/eventMatch.service.interface";

export class EventMatchController {
  constructor(private eventMatchService: IEventMatchService) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this.eventMatchService.getAllEventMatches();
      res.json(matches);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const match = await this.eventMatchService.getEventMatchById(id);
      if (!match) {
        return res.status(404).json({ error: "EventMatch not found" });
      }
      res.json(match);
    } catch (err) {
      next(err);
    }
  }

  async getWatchlistMatchesByEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { eventId } = req.params;
      const watchlists =
        await this.eventMatchService.getWatchlistMatchesByEvent(eventId);
      res.json(watchlists);
    } catch (err) {
      next(err);
    }
  }

  async getEventMatchesByWatchlist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { watchlistId } = req.params;
      const events = await this.eventMatchService.getEventMatchesByWatchlist(
        watchlistId
      );
      res.json(events);
    } catch (err) {
      next(err);
    }
  }

  async getByTerm(req: Request, res: Response, next: NextFunction) {
    try {
      const { termId } = req.params;
      const matches = await this.eventMatchService.getEventMatchesByTerm(
        termId
      );
      res.json(matches);
    } catch (err) {
      next(err);
    }
  }

  async getByWatchlist(req: Request, res: Response, next: NextFunction) {
    try {
      const { watchlistId } = req.params;
      const matches = await this.eventMatchService.getEventMatchesByWatchlist(
        watchlistId
      );
      res.json(matches);
    } catch (err) {
      next(err);
    }
  }

  async getByEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = req.params;
      const matches = await this.eventMatchService.getEventMatchesByEvent(
        eventId
      );
      res.json(matches);
    } catch (err) {
      next(err);
    }
  }
}
