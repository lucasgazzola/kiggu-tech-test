import request from "supertest";
import { createApp } from "../src/app";

const app = createApp();

describe("Watchlists API", () => {
  let watchlistId: string;
  const email = `test${Date.now()}@example.com`;
  const password = "password123";
  let token: string;
  let ownerId: string;

  it("debe listar las watchlists", async () => {
    const res = await request(app).get("/api/watchlists");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("debe crear una watchlist válida", async () => {
    // Primero registramos un usuario para obtener ownerId
    await request(app)
      .post("/api/auth/register")
      .send({
        email,
        password,
        name: "Test User",
      })
      .expect(201);

    const userRes = await request(app).post("/api/auth/login").send({
      email,
      password,
    });

    token = userRes.body.token;

    ownerId = userRes.body.user.id;
    const res = await request(app)
      .post("/api/watchlists")
      .send({ name: "Test List", terms: [{ value: "test" }], ownerId });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name", "Test List");
    expect(Array.isArray(res.body.terms)).toBe(true);
    watchlistId = res.body.id;
  });

  it("debe obtener una watchlist por ID", async () => {
    const res = await request(app).get(`/api/watchlists/${watchlistId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", watchlistId);
  });

  it("debe eliminar una watchlist", async () => {
    const res = await request(app).delete(`/api/watchlists/${watchlistId}`);
    expect(res.statusCode).toBe(204);
  });

  it("no debe crear una watchlist inválida", async () => {
    const res = await request(app).post("/api/watchlists").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  afterAll(async () => {
    if (token) {
      await request(app)
        .delete(`/api/auth/${ownerId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);
    }
  });
});
