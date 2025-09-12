import { EventStatus } from "./enums";
import type { EventMatch } from "./eventMatch.model";
import { Severity } from "./enums";

export interface Event {
  id: string;
  title: string;
  description?: string | null;
  status: EventStatus;
  severity?: Severity | null;
  summary?: string | null;
  suggestedAction?: string | null;
  createdAt: Date;
  updatedAt: Date;
  matches?: EventMatch[];
}
