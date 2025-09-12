import { z } from "zod";

export const createEventMatchSchema = z.object({
  eventId: z.uuid(),
  termId: z.uuid(),
});
export type CreateEventMatchDTO = z.infer<typeof createEventMatchSchema>;

export const updateEventMatchSchema = z.object({
  eventId: z.uuid().optional(),
  termId: z.uuid().optional(),
});
export type UpdateEventMatchDTO = z.infer<typeof updateEventMatchSchema>;
