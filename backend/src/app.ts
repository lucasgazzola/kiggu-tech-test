import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";
import dotenv from "dotenv";
import { ErrorHandler } from "./exceptions/ErrorHandler";

export function createApp(): Application {
  // Cargar el .env correspondiente según NODE_ENV
  dotenv.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
  });

  const app = express();

  // Middlewares globales
  app.use(express.json());
  app.use(
    cors({
      origin: (origin, callback) => {
        // Permite cualquier origin explícito, pero no '*'
        callback(null, origin || false);
      },
      credentials: true,
    })
  );

  app.use(express.urlencoded({ extended: true }));

  // Rutas
  app.use("/api", routes);

  // Manejo de errores y rutas no encontradas se pueden agregar aquí
  app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found" });
  });

  app.use(ErrorHandler.handle);

  return app;
}
