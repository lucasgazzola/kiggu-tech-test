import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["NEW", "REVIEWED", "CLOSED"]).optional(),
});
export type CreateEventDTO = z.infer<typeof createEventSchema>;

export const updateEventSchema = z.object({
  title: z.string().min(1).optional(),
  watchlistId: z.uuid().optional(),
  date: z.coerce.date().optional(),
  location: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(["NEW", "REVIEWED", "CLOSED"]).optional(),
  severity: z.enum(["LOW", "MED", "HIGH", "CRITICAL"]).optional(),
  summary: z.string().optional(),
  suggestedAction: z.string().optional(),
});
export type UpdateEventDTO = z.infer<typeof updateEventSchema>;
