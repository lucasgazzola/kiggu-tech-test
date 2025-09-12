import { Event } from "../../models/event.model";
import { Severity } from "../../models/enums";

export interface IAIAdapter {
  /**
   * Procesa un evento y devuelve resumen, severidad y sugerencia.
   * @param input Texto o datos del evento
   */
  enrichEvent(input: Event): Promise<{
    event: Event;
    summary: string;
    severity: Severity;
    suggestedAction: string;
  }>;
}
