import { z } from "zod";

export const observationListSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  userId: z.uuid(),
  terms: z.array(
    z.object({
      term: z.string().min(1),
      type: z.string().min(1),
    })
  ),
});

export const watchlistTermSchema = z.object({
  term: z.string().min(1),
  type: z.string().min(1),
  watchlistId: z.string().uuid(),
});

export const eventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  watchlistId: z.string().uuid(),
  triggeredByTerms: z.array(
    z.object({
      term: z.string().min(1),
      type: z.string().min(1),
    })
  ),
  eventLogs: z.array(
    z.object({
      eventId: z.string().uuid(),
      status: z.string().min(1),
      message: z.string().optional(),
    })
  ),
  aiResponses: z.array(
    z.object({
      eventId: z.string().uuid(),
      summary: z.string().min(1),
      severity: z.string().min(1),
      suggestedAction: z.string().optional(),
      model: z.string().min(1),
    })
  ),
});

export const eventLogSchema = z.object({
  eventId: z.uuid(),
  status: z.string().min(1),
  message: z.string().optional(),
});

export const aiResponseSchema = z.object({
  eventId: z.uuid(),
  summary: z.string().min(1),
  severity: z.string().min(1),
  suggestedAction: z.string().optional(),
  model: z.string().min(1),
});

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
});
