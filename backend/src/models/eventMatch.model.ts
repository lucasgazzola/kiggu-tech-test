import { Event } from "./event.model";
import { WatchlistTerm } from "./watchlistTerm.model";

export interface EventMatch {
  id: string;
  event: Event;
  eventId: string;
  term: WatchlistTerm;
  termId: string;
  createdAt: Date;
}
