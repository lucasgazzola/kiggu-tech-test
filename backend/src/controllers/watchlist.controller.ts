import { NextFunction, Request, Response } from "express";
import { createWatchlistSchema } from "../dtos/watchlist.dtos";
import { WatchlistService } from "../services/watchlist.service";

export class WatchlistController {
  constructor(private watchlistService: WatchlistService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = createWatchlistSchema.parse(req.body);
      const watchlist = await this.watchlistService.createWatchlist({
        ...validatedData,
      });
      res.status(201).json(watchlist);
    } catch (err: any) {
      next(err);
    }
  }

  async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const watchlists = await this.watchlistService.getAllWatchlists();
      res.status(200).json(watchlists);
    } catch (err: any) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const watchlist = await this.watchlistService.getWatchlistById(id);
      if (!watchlist) {
        return res.status(404).json({ error: "Watchlist not found" });
      }
      res.json(watchlist);
    } catch (err: any) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.watchlistService.removeWatchlist(id);
      res.status(204).send();
    } catch (err: any) {
      next(err);
    }
  }
}
