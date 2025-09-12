import { createApp } from "./app";
import { logger } from "./config/logger";

const app = createApp();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  logger.info("🛑 SIGINT received, shutting down...");
  server.close(() => {
    logger.info("✅ Server closed");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  logger.info("🛑 SIGTERM received, shutting down...");
  server.close(() => {
    logger.info("✅ Server closed");
    process.exit(0);
  });
});
