import { EventMatch } from "./eventMatch.model";

export interface WatchlistTerm {
  id?: string;
  value: string;
  matches?: EventMatch[];
}
