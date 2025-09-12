import { Request, Response, NextFunction } from "express";
import { createWatchlistTermSchema } from "../dtos/watchlistTerm.dtos";
import { IWatchlistTermService } from "../services/interfaces/watchlistTerm.service.interface";

export class WatchlistTermController {
  constructor(private watchlistTermService: IWatchlistTermService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createWatchlistTermSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.issues });
      }
      const { value } = parsed.data;

      const watchTerm = await this.watchlistTermService.createWatchlistTerm({
        value,
      });
      res.status(201).json(watchTerm);
    } catch (err) {
      next(err);
    }
  }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const terms = await this.watchlistTermService.getAllWatchlistTerms();
      res.status(200).json(terms);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const term = await this.watchlistTermService.getWatchlistTermById(id);
      if (!term) return res.status(404).json({ error: "WatchTerm not found" });
      res.json(term);
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.watchlistTermService.deleteWatchlistTerm(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
