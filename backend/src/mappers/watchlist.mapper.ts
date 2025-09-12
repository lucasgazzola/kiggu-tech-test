import { Watchlist } from "../models/watchlist.model";
import { Prisma } from "@prisma/client";

export class WatchlistMapper {
  static toDomain(
    watchlist: Prisma.WatchlistGetPayload<{
      include: { owner: true; terms: { include: { term: true } } };
    }>
  ): Watchlist {
    return {
      ...watchlist,
      terms: watchlist.terms.map((relation) => relation.term),
    };
  }
}
