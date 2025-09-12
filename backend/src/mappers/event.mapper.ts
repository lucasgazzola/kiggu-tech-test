import { Event } from "../models/event.model";
import { EventStatus, Severity } from "../models/enums";

export class EventMapper {
  static toDomain(prismaEvent: any): Event {
    return {
      id: prismaEvent.id,
      title: prismaEvent.title,
      description: prismaEvent.description,
      status: EventMapper.mapStatus(prismaEvent.status),
      severity: prismaEvent.severity
        ? EventMapper.mapSeverity(prismaEvent.severity)
        : null,
      summary: prismaEvent.summary,
      suggestedAction: prismaEvent.suggestedAction,
      createdAt: prismaEvent.createdAt,
      updatedAt: prismaEvent.updatedAt,
      matches: prismaEvent.matches,
    };
  }

  static mapStatus(status: any): EventStatus {
    switch (status) {
      case "NEW":
        return EventStatus.NEW;
      case "CLOSED":
        return EventStatus.CLOSED;
      case "REVIEWED":
        return EventStatus.REVIEWED;
      default:
        return EventStatus.NEW;
    }
  }

  static mapSeverity(severity: any): Severity {
    switch (severity) {
      case "LOW":
        return Severity.LOW;
      case "MED":
        return Severity.MED;
      case "HIGH":
        return Severity.HIGH;
      case "CRITICAL":
        return Severity.CRITICAL;
      default:
        return Severity.LOW;
    }
  }
}
