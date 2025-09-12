import { EventMatch } from "./eventMatch.model";
import { User } from "./user.model";
import type { WatchlistTerm } from "./watchlistTerm.model";

export interface Watchlist {
  id?: string;
  name: string;
  description?: string | null;
  owner?: User;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
  terms: WatchlistTerm[];
  eventMatch?: EventMatch[];
}
