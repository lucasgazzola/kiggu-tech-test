import { Watchlist } from "./watchlist.model";
import { Event } from "./event.model";

export interface User {
  id: string;
  email: string;
  name?: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  watchlists?: Watchlist[];
  events?: Event[];
}
