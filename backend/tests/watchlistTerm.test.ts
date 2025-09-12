import request from "supertest";
import { createApp } from "../src/app";

const app = createApp();

describe("WatchListTerm API", () => {
  let watchlistTermId: string;

  it("debe crear un término de observación", async () => {
    const res = await request(app)
      .post("/api/watchlist-terms")
      .send({ value: "bitcoin" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    watchlistTermId = res.body.id;
  });

  it("debe listar los términos", async () => {
    const res = await request(app).get("/api/watchlist-terms");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("debe obtener un término por ID", async () => {
    const res = await request(app).get(
      `/api/watchlist-terms/${watchlistTermId}`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", watchlistTermId);
  });

  it("debe eliminar un término", async () => {
    const res = await request(app).delete(
      `/api/watchlist-terms/${watchlistTermId}`
    );
    expect(res.statusCode).toBe(204);
  });

  afterAll(async () => {
    if (watchlistTermId) {
      await request(app).delete(`/api/watchlist-terms/${watchlistTermId}`);
    }
  });
});
