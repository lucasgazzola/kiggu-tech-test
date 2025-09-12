import { WatchlistTerm } from "../models/watchlistTerm.model";

export class WatchlistTermMapper {
  static toDomain(prismaTerm: any): WatchlistTerm {
    return {
      id: prismaTerm.id,
      value: prismaTerm.value,
      matches: prismaTerm.matches,
    };
  }
}
