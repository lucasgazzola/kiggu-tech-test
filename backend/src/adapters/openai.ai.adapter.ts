import { IAIAdapter } from "./interfaces/ai.adapter.interface";
import { Event } from "../models/event.model";
import { Severity } from "../models/enums";
import { OpenAI } from "openai";

export class OpenAIAIAdapter implements IAIAdapter {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.AZURE_OPENAI_ENDPOINT,
      defaultHeaders: {
        "api-key": process.env.OPENAI_API_KEY,
      },
      defaultQuery: {
        "api-version": "2023-05-15",
      },
    });
  }

  async enrichEvent(event: Event) {
    const prompt = `
Evento: ${event.title}
Descripción: ${event.description}

Instrucciones:
1. Resume el evento en una frase corta.
2. Clasifica su severidad: LOW, MED, HIGH o CRITICAL.
3. Sugiere la acción siguiente para el analista.

Devuelve solo un JSON: {"summary":"...", "severity":"...", "suggestedAction":"..."}
`;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Eres un analista de ciberseguridad." },
          { role: "user", content: prompt },
        ],
        max_tokens: 150, // aumentamos un poco para evitar cortes
      });

      const content = response.choices[0]?.message?.content?.trim() || "";

      // Parseo seguro de JSON
      let data: {
        summary?: string;
        severity?: string;
        suggestedAction?: string;
      } = {};
      try {
        data = JSON.parse(content);
      } catch {
        console.warn("No se pudo parsear la respuesta de OpenAI:", content);
      }

      const validSeverities = Object.values(Severity);
      const finalSeverity = validSeverities.includes(data.severity as Severity)
        ? (data.severity as Severity)
        : Severity.MED;

      return {
        event,
        summary: data.summary || "Sin resumen",
        severity: finalSeverity,
        suggestedAction: data.suggestedAction || "Revisar manualmente",
      };
    } catch (error) {
      console.error("Error al llamar OpenAI:", error);
      return {
        event,
        summary: "Sin resumen",
        severity: Severity.MED,
        suggestedAction: "Revisar manualmente",
      };
    }
  }
}
