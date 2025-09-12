import { IAIAdapter } from "./interfaces/ai.adapter.interface";
import { Severity } from "../models/enums";
import { Event } from "../models/event.model";

export class MockAIAdapter implements IAIAdapter {
  async enrichEvent(input: Event) {
    // Opciones simuladas
    const summaries = [
      `Resumen mock del evento: ${input.title}`,
      `Análisis automático: ${input.title} requiere atención inmediata.`,
      `Evento detectado: ${input.title}. Evaluar impacto.`,
      `Evento: ${input.title}. No se detectan anomalías.`,
    ];
    const severities = [
      Severity.LOW,
      Severity.MED,
      Severity.HIGH,
      Severity.CRITICAL,
    ];
    const actions = [
      "Revisar manualmente",
      "Escalar a soporte técnico",
      "Ignorar por ahora",
      "Notificar al responsable",
    ];

    // Selección aleatoria
    const summary = summaries[Math.floor(Math.random() * summaries.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const suggestedAction = actions[Math.floor(Math.random() * actions.length)];

    return {
      event: input,
      summary,
      severity,
      suggestedAction,
    };
  }
}
