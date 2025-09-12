import { z } from "zod";

export const createWatchlistTermSchema = z.object({
  value: z.string().min(1),
});
export type CreateWatchlistTermDTO = z.infer<typeof createWatchlistTermSchema>;

export const updateWatchlistTermSchema = z.object({
  value: z.string().min(1).optional(),
  watchlistId: z.uuid().optional(),
});
export type UpdateWatchlistTermDTO = z.infer<typeof updateWatchlistTermSchema>;
