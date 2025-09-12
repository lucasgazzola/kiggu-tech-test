import { z } from "zod";

export const eventEnrichmentSchema = z.object({
  summary: z.string().min(1, "Summary is required"),
  severity: z.enum(["LOW", "MED", "HIGH", "CRITICAL"]),
  suggestedAction: z.string().min(1, "Suggested action is required"),
});

export type EventEnrichmentDTO = z.infer<typeof eventEnrichmentSchema>;
