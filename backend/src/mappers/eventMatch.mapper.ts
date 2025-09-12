import { EventMatch } from "../models/eventMatch.model";

export class EventMatchMapper {
  static toDomain(prismaMatch: any): EventMatch {
    return {
      id: prismaMatch.id,
      event: prismaMatch.event,
      eventId: prismaMatch.eventId,
      term: prismaMatch.term,
      termId: prismaMatch.termId,
      createdAt: prismaMatch.createdAt,
    };
  }
}
