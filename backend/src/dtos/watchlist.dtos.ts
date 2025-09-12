import { z } from "zod";

export const watchlistTermSchema = z.object({
  value: z.string().min(1),
});
export type WatchlistTermDTO = z.infer<typeof watchlistTermSchema>;

export const createWatchlistSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  ownerId: z.uuid(),
  terms: z.array(watchlistTermSchema),
});
export type CreateWatchlistDTO = z.infer<typeof createWatchlistSchema>;

export const updateWatchlistSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
});
export type UpdateWatchlistDTO = z.infer<typeof updateWatchlistSchema>;
