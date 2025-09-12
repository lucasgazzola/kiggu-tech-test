import request from "supertest";
import { createApp } from "../src/app";

const app = createApp();

describe("Events API", () => {
  let eventId: string;

  it("debe crear un evento válido", async () => {
    const res = await request(app).post("/api/events").send({
      title: "Incidente de seguridad",
      description: "Se detectó actividad sospechosa en el servidor.",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("title", "Incidente de seguridad");

    eventId = res.body.id;
  });

  it("no debe crear un evento inválido", async () => {
    const res = await request(app).post("/api/events").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("debe enriquecer un evento existente", async () => {
    const res = await request(app).post(`/api/events/${eventId}/enrich`).send();
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("summary");
    expect(res.body).toHaveProperty("severity");
    expect(res.body).toHaveProperty("suggestedAction");
  });

  it("debe responder 404 al enriquecer un evento inexistente", async () => {
    const res = await request(app).post(`/api/events/invalid-id/enrich`).send();
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  afterAll(async () => {
    if (eventId) {
      await request(app).delete(`/api/events/${eventId}`);
    }
  });
});
